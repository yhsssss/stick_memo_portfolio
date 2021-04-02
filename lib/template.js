module.exports ={
    
    MAIN:function(data){  
        
          
        return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        body {
          font-family: "Lato", sans-serif;
        }
        
        .sidenav {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }
        
        .sidenav a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
          transition: 0.3s;
        }
        
        .sidenav a:hover {
          color: #f1f1f1;
        }
        
        .sidenav .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }
        
        #main {
          transition: margin-left .5s;
          padding: 16px;
          
        }
      
        
        @media screen and (max-height: 450px) {
          .sidenav {padding-top: 15px;}
          .sidenav a {font-size: 18px;}
        }

        /*스티커메모 스타일구간*/

        #btn{
          width: 50px;
          height: 50px;
          margin-left: 50px;
          border-style: none;
          outline-style: none;
          border-radius: 30px;
          background-color: #ffffff;
          box-shadow: 1px 1px 10px lightgrey;
          position: relative;
    
      }
    
      .color{
          margin-left:8px;
          margin-top:8px;
          display:none;
          width: 35px;
          height: 35px;
          border-radius: 20px;
          border-style: none;
          outline-style: none;
          background: black;
      }
    
      #c1{background-color:#5D732D;}
      #c2{background-color:#B2BF50;}
      #c3{background-color:#F2D7D0;}
      #c4{background-color:#D96C6C;}
    
     
    
      #container{
          margin: 20px;
      }
      .ta{
          width: 260px;
          height: 230px;
          font-size: 18px;
          border: none;
          overflow: auto;
          outline: none;
          padding: 20px;
          margin:10px;
          margin-top:0px;
          box-shadow: 5px 5px 10px rgb(211, 211, 211);
      }
    
      /* inner element*/
    
      .wrapp{
          display: inline-block;
          margin: 20px 20px;
      }
    
      .innerdiv{
              margin: 10px;
              margin-bottom:0px;
              width: 300px;
              height: 30px;
              background-color:#F2D8A7;
              
              
          }
          .innerbtn{
              background-color:#ffffff;
              color: #59403B;
              border-style: none;
              border-radius: 3px;
              display:inline;
              
              
          }
          .innerbtn:hover{
              background-color: black;
              color: #ffffff;
              
          }
    
    



        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        </head>
        <body>
    
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="/">Home</a>
          <a href="/?id=board">Post</a>
          <a href="#">Contact</a>
        </div>
        
        <div id="main">
          <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; </span>  
    
        </div>

        <div id="btn">
        <button class="color" id="c1" onclick="createMemo(this.value)" value="#5D732D"></button>
        <button class="color" id="c2" onclick="createMemo(this.value)" value="#B2BF50"></button>
        <button class="color" id="c3" onclick="createMemo(this.value)" value="#F2D7D0"></button>
        <button class="color" id="c4" onclick="createMemo(this.value)" value="#D96C6C"></button>
      </div>

      <div id="memoDiv">
        ${data}
      </div>

         
       
   
        <script>

        let flag = true;
        $(document).ready(function(){
          $("#btn").click(function(){
              if(flag == true){
                $("#btn").animate({width: "200px"});
                $(".color").fadeIn();
                flag = !flag;   
              }else{
                $("#btn").animate({width: "50px"});
                $(".color").fadeOut();
                flag = !flag;
            }
          });
        
          
        });
        
        function createMemo(bgColor){
            const memodiv = document.getElementById("memoDiv");
        
            let wrapp = document.createElement("div");
                wrapp.className = "wrapp";
        
            let memo = document.createElement("textarea");
                memo.name = "memo";
                memo.className = "ta"; 
                memo.style.background= bgColor;
          
            //버튼이 들어갈 div 태그 
            let innerdiv = document.createElement("div");
                innerdiv.className = "innerdiv"; 
            
            createBtn(innerdiv);
            wrapp.appendChild(innerdiv);
                
            //button 생성 함수 호출
            
            memodiv.appendChild(wrapp);
            wrapp.appendChild(innerdiv);
            wrapp.appendChild(memo);  
        }
        
        function createBtn(innerdiv){
            
            // save버튼 생성하기 
            let savebtn = document.createElement("button");
                savebtn.type = "submit";
                savebtn.className = "innerbtn";
                savebtn.textContent="s";
                savebtn.style.margin="6px 5px 0 250px";
                innerdiv.appendChild(savebtn);
        
                $(savebtn).removeAttr('onclick');
                $(savebtn).attr('onclick','save(this);return false;');
        
            // delete버튼 생성하기 
                let delbtn = document.createElement("button");
                delbtn.className = "innerbtn del";
                
                delbtn.textContent = "x";
                innerdiv.appendChild(delbtn);
        
                delbtn.addEventListener('click',function(){
        
                    let test = $(this).parents('.wrapp').remove();
                    console.log(test);
                    
                })
        
               
        
              
        }
      function save(obj){
        
        let ta = obj.parentNode.parentNode.childNodes[1];
        let memo = ta.value;
        let bgcolor = ta.style.background;

        $.ajax({
          url: '?id=memo_process',
          dataType: 'json',
          type:'post',
          data:{"memo":memo, "bgcolor":bgcolor},
          success : function(data){

          },
          error: function(xhr,status, error){
        
          }
        });
          console.log("Save!");
      }

      function update(obj){

        let idNode = obj.parentNode.parentNode;
        let taNode = obj.parentNode.parentNode.childNodes[1];
        let id = idNode.id;
        let memo = taNode.value;
        console.log(taNode);

        $.ajax({
          url: '?id=memo_update',
          dataType: 'json',
          type:'post',
          data:{"memo": memo,"id":id },
          success : function(data){

            console.log("UPDATE MEMO!");

          },
          error: function(xhr,status, error){
        
          }
        });

        

      }

      function deleteMemo(obj){

        let idNode = obj.parentNode.parentNode;
        let id = idNode.id;
        

        $.ajax({
          url: '?id=memo_delete',
          dataType: 'json',
          type:'post',
          data:{"id":id },
          success : function(data){

          },
          error: function(xhr,status, error){
        
          }
        });
        idNode.remove();
          console.log("Delete!");
      }
     


        function openNav() {
          document.getElementById("mySidenav").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
        }
        
        function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
          document.getElementById("main").style.marginLeft= "0";
        }
        </script>
           
        </body>
        </html> 
        `;

    },
    POST:function(data,id){
        return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        body {
          font-family: "Lato", sans-serif;
        }
        
       
        .sidenav {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }
        
        .sidenav a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
          transition: 0.3s;
        }
        
        .sidenav a:hover {
          color: #f1f1f1;
        }
        
        .sidenav .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }
        
        #main {
          transition: margin-left .5s;
          padding: 16px;
        }
        #field{
          width: 500px;
          height: 500px;
          border: 1px solid #ccc;
          margin:auto;
          padding: 20px;
        }
        #updateBtn{
         background-color: rgb(152,192,44);
         border :none;
         border-radius:13px;
         color:white;
          padding: 12px 16px;
          font-size: 15px;
          cursor: pointer;
          margin-left:5px;
          margin: auto;

        }
        
        @media screen and (max-height: 450px) {
          .sidenav {padding-top: 15px;}
          .sidenav a {font-size: 18px;}
        }
        </style>
        </head>
        <body>
      
        
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="/">Home</a>
          <a href="/?id=board">Post</a>
          <a href="#">Contact</a>
        </div>
        
        <div id="main">
          
          <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; </span>
          <div id="field">
          ${data}
          </div>
          <div style="text-align:center;margin-top: 10px;">
            <button id="updateBtn" onClick="location.href='update?id=${id}';">Update</button>
            <button id="updateBtn" onClick="deleteConfirm();">Delete</button>
          </div>
        </div>
      
        <script>
        function deleteConfirm(){
         let msg = confirm('삭제하시겠습니까?');
         if(msg == true){
                console.log("ok");
                location.href='delete?id=${id}';
                }else{
                console.log("no");
                }
        }

        function openNav() {
          document.getElementById("mySidenav").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
        }
        
        function closeNav() {
          document.getElementById("mySidenav").style.width = "0";
          document.getElementById("main").style.marginLeft= "0";
        }
        </script>
           
        </body>
        </html> 
        `;
      
      },
      POSTLIST:function(list){
          return `<!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://kit.fontawesome.com/bc220fa797.js" crossorigin="anonymous"> </script>
          <style>
          body {
            font-family: "Lato", sans-serif;
          }

           a{color: black; text-decoration: none;}
           a:link { color: darkgreen;}
           a:visited { color: orange; }

          
           #post-table{
                      width: 60%;
                      margin-top: 50px;
                      margin-left: 250px;
                      background-color:white;
                  }
                  
                  table, th, td {
                      border: solid lightgrey 1px;
                      
                      border-collapse: collapse;
                  }
                  th, td {
                      padding: 5px;
                      text-align: left;    
          }
          #edit{
              padding : 20px;
              margin-left: 90%;
          }
          #search{
            margin-top: 20px;
            margin-left:250px;

          }
          .btn{
              background-color: rgb(152,192,44);
              border :none;
              border-radius:13px;
              color:white;
              padding: 12px 16px;
              font-size: 15px;
              cursor: pointer;
          }
          .btn:hover{
              background-color: black;
          }
         .search-area {
             height: 25px;
             border: 2px solid rgb(152,192,44);
             width: 250px;
         }

          .sidenav {
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: #111;
            overflow-x: hidden;
            transition: 0.5s;
            padding-top: 60px;
          }
          
          .sidenav a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            display: block;
            transition: 0.3s;
          }
          
          .sidenav a:hover {
            color: #f1f1f1;
          }
          
          .sidenav .closebtn {
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 36px;
            margin-left: 50px;
          }

          .btn-search{
            padding: 10px 10px;

          }

          #main {
            transition: margin-left .5s;
            padding: 16px;
          }
          
          @media screen and (max-height: 450px) {
            .sidenav {padding-top: 15px;}
            .sidenav a {font-size: 18px;}
          }
          </style>
          </head>
          <body>
      
      
          
          <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="/">Home</a>
            <a href="/?id=board">Post</a>
            <a href="#">Contact</a>
          </div>
          
          <div id="main">
          
            <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; </span>
               <div id="post-table">
               <div id="edit">
               <button class="btn" onClick="location.href='/?id=writepost'"><i class="fas fa-pen"></i></button><br>
                  </div>
                  <table style="width:100%;">
                      <tr>
                          <th style="width:80%; text-align:center;font-size:23px;">SUBJECT</th>
                          <th colspan="2" style="text-align:center;font-size:23px;">DETAIL</th>
                      </tr>
                      ${list}
                     
                 </table>
              
              </div>
              <div id="search">
              <input id="search_text" class="search-area" type="text" size="30">
              <input type="button" value="search" class="btn" onClick="location.href='/search?q='+search()">
              
              </div>
              
          </div>
          
          <script>
          function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
          }
          
          function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
          }

          function search(){
            return document.getElementById("search_text").value;
          }
          </script>
             
          </body>
          </html> 
          `;
    },WRITEPOST:function(data){
      return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>글쓰기</title>
      </head>
      <style>
          form input[type=submit]{
              margin: auto;
          }
          header{
              width: 80%;
             
              margin-right: auto;
              margin-left: auto;
              text-align: center;
          }
          header h1{
              font-size: 3em;
              color: rgb(65, 65, 65);
          }
         
          #wrapp{
              margin: auto;
              width: 50%;
              height: 500px;
              padding-left:10px;
              padding-right: 10px;
              
      
          }
       
          #wrapp input[type=text]{
              margin: auto;
              width: 100%;
              height: 35px;
              margin-top: 10px;
              border:none;
              border-bottom: 1px solid rgb(36, 36, 36);
          }
         
          #wrapp input[type=text]::placeholder{color: rgb(201, 201, 201);
          font-size: 20px;}
          
          #wrapp textarea{
              margin: auto;
              width: 100%;
              margin-top: 15px;
              border-radius: 1px;
          }
          #wrapp input[type=password]{
              width:20%;
          }
          #wrapp input[type=submit]{
              width: 100%;
              height: 50px;
              margin-top: 15px;
              margin-right: 0;
              margin-left: auto;
              border-radius: none;
              font-size: 80%;
              background-color: rgb(152,192,44);
              border :none;
              border-radius:8px;
              color:white;
              padding: 12px 16px;
              font-size: 15px;
              cursor: pointer;
          }
          #wrapp input[type=submit]:hover{
            background: black;
          }

        
      </style>
      <body>
          <header>
              <h1>Post</h1>
          </header>
          ${data}
      </body>
      </html>`;
      
    }



}