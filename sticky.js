

function createMemo(bgColor){
    const memodiv = document.getElementById("memoDiv");

    let wrapp = document.createElement("div");
    wrapp.className = "wrapp";

    let memo = document.createElement("textarea");
    memo.className = "ta"; memo.style.background= bgColor;

    //버튼이 들어갈 div 태그 
        let innerdiv = document.createElement("div");
        innerdiv.className = "innerdiv"; 
        wrapp.appendChild(innerdiv);
        
    //button 생성 함수 호출
    createBtn(innerdiv);

    wrapp.appendChild(memo);
    memodiv.appendChild(wrapp);
    
    
}

function createBtn(innerdiv){
    
    // save버튼 생성하기 
    let savebtn = document.createElement("button");
        savebtn.className = "innerbtn";
        savebtn.textContent="s";
        savebtn.style.margin="6px 5px 0 250px";
        innerdiv.appendChild(savebtn);
    // delete버튼 생성하기 
        let delbtn = document.createElement("button");
        delbtn.className = "innerbtn del";
        
        delbtn.textContent = "x";
        innerdiv.appendChild(delbtn);

        delbtn.addEventListener('click',function(){
        
            $(this).parents('.wrapp').remove();
            
        })
}


