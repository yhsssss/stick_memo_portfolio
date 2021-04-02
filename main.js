const http = require('http');
const fs = require('fs');
'use strict';
const parse = require('url-parse');
const qs = require('querystring');
const { title } = require('process');
const db = require('./lib/db.js');
const { EBADF } = require('constants');
const mainTemplate = require('./lib/template.js');


var app = http.createServer(function (request, response) {
    var _url = request.url;
    var pathname = parse(_url, true).pathname;
    var queryUrl = parse(_url, true).query;

    if (pathname === '/') {
        if (queryUrl.id === undefined) {

            db.query(`select * from memo`,(error,post)=>{
              if(error){
                throw error;
              };

              
              let data = ``;
              let i =0;

              while(i<post.length){

                console.log(post[i]);
                data += `<div class="wrapp" id="${post[i].id}"><div class="innerdiv"><button class="innerbtn" onclick="update(this);return false;" style="margin: 6px 5px 0px 250px;">s</button><button class="innerbtn del" onclick="deleteMemo(this);return false;">x</button></div><textarea name="memo" class="ta" style="background: ${post[i].bgcolor};">${post[i].memo}</textarea></div>`;

                i += 1

              }

              response.writeHead(200);
              response.write(mainTemplate.MAIN(data));
              response.end();

            });

            


        }else if (queryUrl.id == 'memo_process'){
          let body ='';
          if(request.method === "POST"){
            request.on('data',function(data){
              body += data;
                });
            request.on('end', function(data){
              let writeMemo = qs.parse(body);

            db.query(`insert into memo(memo,bgcolor) values(?,?)`,[writeMemo.memo,writeMemo.bgcolor],(error,post)=>{
              if(error){
                throw error;
                }
                });
            });         
          }

          response.writeHead(200);
          response.end('Not Found');


        }else if(queryUrl.id==='memo_update'){

          

            let body= '';
            if(request.method === 'POST'){
              request.on('data',function(data){
                body += data;
              });
              request.on('end',function(data){
                let updateMemo = qs.parse(body);

                db.query(`update memo set memo=? where id=?`,[updateMemo.memo,updateMemo.id],(error,post)=>{
                  if(error){
                    throw error;
                  }
                  console.log("update memo!")
                });

              });
            }

          

        }else if(queryUrl.id === 'memo_delete'){

          let body ='';
          if(request.method === "POST"){
            request.on('data',function(data){
              body += data;
                });
            request.on('end', function(data){
              let writeMemo = qs.parse(body);
    
              db.query(`delete from memo where id=?`,[writeMemo.id],(error,post)=>{
                if(error){
                  throw error;
                  }
                  });
               }); 

          }

          response.writeHead(200);
          response.end('Not Found');

        }else if (queryUrl.id === 'board') {
          
          db.query(`select id,title,views,date_format(date,'%y-%m-%d') as date from post`, (error,post)=>{
            if(error){
              throw error;
            }
            
            let list = ``;
            let i = 0;
            while(i < post.length){
              list += `<tr>
                          <td><a href="/?id=${post[i].id}"> ${post[i].title}</a></td>
                            <td style="text-align:center;">${post[i].views}</td>
                            <td style="text-align:center;">${post[i].date}</td>
                       </tr>`;
                       i += 1;
            }

            response.writeHead(200);
            response.write(mainTemplate.POSTLIST(list));
            return response.end();

          });
          


        }else if(queryUrl.id === 'writepost'){

                let data = ` <form action="?id=create_post" method="post">
                <div id="wrapp">
                
                    <div id="wrapp-title">
                     <input type="text" name="title" placeholder="제목">
                    </div>
                    <div id="wapper-description">
                     <textarea name="description" cols="50" rows="25"
                     ></textarea>
                    </div>    
                     <input type="password" name="pw" maxlength=4 placeholder="····">
                    <input type="submit" value="저장">
                </div>
             </form>`;

                response.writeHead(200);
                response.write(mainTemplate.WRITEPOST(data));
                return response.end();

        }else if(queryUrl.id ==='create_post'){

          if(request.method === "POST"){
            let body ='';
            request.on('data',function(data){
                body += data;
            });
            request.on('end', function(data){
                let writePost = qs.parse(body);

                
                db.query('insert into post(title,description,password,date,author_id) values(?,?,?,now(),1)',
                  [writePost.title,writePost.description,writePost.pw],(error,post)=>{
                  if(error){
                    throw error;
                  }

                  response.writeHead(302, {Location: `/?id=${post.insertId}`});
                  
                  response.end();

                });
        
            });
         }
        }else if(queryUrl.id ==='update_post'){
          
          if(request.method === "POST"){
            let body ='';
            request.on('data',function(data){
                body += data;
            });
            request.on('end', function(data){
                let writePost = qs.parse(body);
                let id = writePost.postid;
                
                db.query('update post set title=?, description=?, date=now() where id=?',
                  [writePost.title,writePost.description,id],(error,post)=>{
                  if(error){
                    throw error;
                  }

                  response.writeHead(302, {Location: `/?id=${id}`});
                  
                  response.end();

                });
        
            });
         }



        }else{ // 특정 경로가 아니면 무조건 실행 
          
            db.query(`select * from post where id=?`,[queryUrl.id],(error,post)=>{
              if(error){
                throw error;
              }
              db.query(`update post set views=ifnull(views,0)+1 where id=?`,[queryUrl.id],(error2,post2)=>{
                if(error2){
                  throw error2;
                }

                  let data = `<h2>${post[0].title}</h2> ${post[0].description}`;
                  let id = queryUrl.id;

                  response.writeHead(200);
                  response.write(mainTemplate.POST(data,id));
                  return response.end();
              });
            });


        }

    }else if(pathname == '/update'){
     
      db.query(`select * from post where id=?`,[queryUrl.id],(error,post)=>{

        if(error){
          throw error;
        }
       
        let data = ` <form action="/?id=update_post" method="post">
        <div id="wrapp">
        
            <div id="wrapp-title">
            <input type="hidden" name="postid" value="${post[0].id}">
             <input type="text" name="title" placeholder="제목" value="${post[0].title}">
            </div>
            <div id="wapper-description">
             <textarea name="description" cols="50" rows="25">${post[0].description}</textarea>
            </div>    
             <input type="password" name="pw" maxlength=4 placeholder="····">
            <input type="submit" class="btn" value="저장">
        </div>
     </form>`;
    
     console.log("post:" + post);


      response.writeHead(200);
      response.write(mainTemplate.WRITEPOST(data));
      return response.end();

      })

    }else if(pathname == '/delete'){

        db.query(`delete from post where id=?`,[queryUrl.id],(error,post)=>{
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/?id=board`});
            return response.end();
        })
    }else if(pathname === '/search'){

        let search = queryUrl.q;
        db.query(`select id,title,views,date_format(date,'%y-%m-%d') as date from post where title like ?`,[`%${search}%`],(error,post)=>{
          if(error){
            throw error;
          }

          let list = ``;
            let i = 0;
            while(i < post.length){
              list += `<tr>
                          <td><a href="/?id=${post[i].id}"> ${post[i].title}</a></td>
                            <td>${post[i].views}</td> 
                            <td>${post[i].date}</td>
                       </tr>`;
                       i += 1;
            }

            response.writeHead(200);
            response.write(mainTemplate.POSTLIST(list));
            return response.end();


        })


    } else {
        response.writeHead(404);
        response.end('Not Found');

    }

});
app.listen(8660); 