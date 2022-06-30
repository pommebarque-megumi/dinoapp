'use strict';
window.onload=function(){ 

    class Dino{
        constructor(name,imgPath,imgPath2,imgPath3,friendPoint,idName){
            this.name=name;
            this.imgPath=imgPath;
            this.imgPath2=imgPath2;
            this.imgPath3=imgPath3;
            this.friendPoint=friendPoint;
            this.idName = idName;
        }
        setName(name){
            this.name = name;
        }
        setFriendPoint(friendPoint){
            this.friendPoint = friendPoint;
        }
        getImgPath(){
            return this.imgPath;
        }
        moveGood(){
            let tempImg = this.imgPath;
            img.src = this.imgPath2;
            setTimeout(function(){
                img.src = tempImg;
            },2500);
        }
        moveBad(){
            let tempImg = this.imgPath;
            img.src = this.imgPath3;
            img.classList.remove("fuwafuwa");
            img.classList.add("buruburu");
            setTimeout(function(){
                img.src = tempImg;
                img.classList.remove("buruburu");
                img.classList.add("fuwafuwa");
            },2500);
        }
    }
    class Item{
        constructor(imgPath,point,name,idName){
            this.imgPath=imgPath;
            this.point=point;
            this.name=name;
            this.idName = idName;
        }
        doEvent(){
            const img_element = document.createElement("img");
            img_element.src = this.imgPath;
            img_element.alt = this.name;
            img_element.setAttribute('id',this.idName);
            if(this.name == 'boal'){
                img_element.classList.add('boalfuwafuwa');
            }
            div_item.append(img_element);
            dino.friendPoint += this.point;
            tempTd.textContent = dino.friendPoint;
            setTimeout(function(){
                div_item.removeChild(div_item.firstElementChild);
            },2500);
            console.log(dino.friendPoint);
            isGrowthJudge();
        };
        doDeco(){
            const img_deco = document.createElement("img");
            img_deco.src = this.imgPath;
            img_deco.alt = this.name;
            img_deco.setAttribute('id',this.idName);
            div_deco.append(img_deco);
            dino.friendPoint += this.point;
            tempTd.textContent = dino.friendPoint;
            isGrowthJudge();
        }
    }

    const div_deco = document.querySelector("#decorations");
    const eggImgs = ["images/egg1.png","images/egg2.png","images/egg3.png","images/egg4.png","images/egg5.png"];
    const dinos = [
        new Dino("","images/baby1.png","images/baby2.png","images/baby3.png","","dino_baby"),
        new Dino("","images/child1.png","images/child2.png","images/child3.png","","dino_child"),
        new Dino("","images/middle1.png","images/middle2.png","images/middle3.png","","dino_middle")
    ];
    const pict = document.getElementById("pict");
    let userName;
    const div_item = document.querySelector('#item');
    const mealPoint = 4;
    const brushPoint = 2;
    const boalPoint = 3;
    const decorationPoint = 1;
    const buttons = document.querySelectorAll(".bt");
    const form = document.querySelector("#form");
    const name = document.querySelector("#userName");
    const startBt = document.querySelector("#startBt");
    const dino_pic = document.querySelector("#dino_pic");
    const table = document.querySelector("#info");
    const secondForm = document.querySelector("#secondForm");
    const p = document.querySelector("#msg")
    const decos = [
                    ['images/rafuresia.png','rafuresia'],
                    ['images/ananas.png','ananas'],
                    ['images/yatsude.png','yatsude'],
                    ['images/shida.png','shida']
                ];
    let isBorne;
    let isNaming;
    let friendPoint;
    let dino;
    let newItem;
    let newDeco;
    let tempTd;
    let isFirstGrowth;
    let isSecondGrowth;
    let deco_count = 0;
    //let isGrowth;
    const img = document.createElement("img");
    function init(){
        isBorne = false;
        isNaming =false;
        deco_count = 0;
        //isGrowth = false;
        pict.style.backgroundImage = 'url(images/back1.jpg)';
        startBt.addEventListener('click',()=>{
            userName = name.value;
            form.style.display = 'none';
            start();
        });
    }
    function start(){
        back_picChange();
        function back_picChange(){ setTimeout(function(){
            pict.style.backgroundImage = 'url(images/back2.jpg)';
            setTimeout(function(){
                pict.style.backgroundImage = 'url(images/back.jpg)';
                gameStart();
            },2500);
        },400);
        }
    }

    //console.log(buttons)
    const gameStart = () => {
        img.src = 'images/egg1.png';
        img.alt = "dinos Picture";
        img.setAttribute("id","dino");
        img.classList.add("buruburu")
        dino_pic.append(img);
        let path = 'images/';
        let imgCount = 1;
        let timerId = setTimeout(function(){
                let src = path+'egg'+(++imgCount)+'.png'; 
                img.src = src;
                setTimeout(function(){
                    let src = path+'egg'+(++imgCount)+'.png'; 
                    img.src = src;
                    setTimeout(function(){
                        let src = path+'egg'+(++imgCount)+'.png'; 
                        img.src = src;
                        setTimeout(function(){
                            let src = path+'egg'+(++imgCount)+'.png'; 
                            img.src = src;
                            setTimeout(function(){
                                Borne();
                                img.src = dino.getImgPath();
                                img.id = dino.idName;
                                console.log(friendPoint);
                                naming();
                            },1500)
                        },1000)
                    },1000)
                },1000)
        },1000);

    };
            //let decoItem;
        for(let i=0 ; i<buttons.length ; i++){
            console.log("first");
        buttons[i].addEventListener('click',(eve)=>{
            console.log(eve.target)
            let name = eve.target.id;
            let imgPath;
            let point;
            let idName;
            switch(name){
                case 'meal':
                    point = mealPoint;
                    imgPath ='images/pict_meat.png';
                    idName = 'meat';
                    dino.moveGood();
                    makeNewItem(imgPath,point,name,idName);
                break;
                case 'brush':
                    point = brushPoint;
                    imgPath = 'images/pict_brush.png';
                    idName = 'pict_brush';
                    dino.moveBad();
                    makeNewItem(imgPath,point,name,idName);
                break;
                case 'boal':
                    point = boalPoint;
                    imgPath = 'images/pict_boal.png';
                    idName = 'pict_boal';
                    makeNewItem(imgPath,point,name,idName);
                    dino.moveGood();
                break;
                case 'deco':
                    console.log(name);
                    console.log(deco_count);
                    point = decorationPoint;
                    imgPath = getImgPath();
                    idName = getIdName();
                    newDeco = new Item(imgPath,point,name,idName);
                    newDeco.doDeco();
                    deco_count++;
                }
            });
        }
        function makeNewItem(imgPath,point,name,idName){
            newItem = new Item(imgPath,point,name,idName);
            newItem.doEvent();
        }
    function getImgPath() {
        let imgPath;
        if(deco_count < decos.length){
            return imgPath = decos[deco_count][0];
        }else{
            deco_count = 0;
        }
    }
    function getIdName(){
        let idName;
        return idName = decos[deco_count][1];
    }
    function Borne(){
        dino = dinos[0];
        dino.setFriendPoint(1);
        //friendPoint = dino.friendPoint;
        isBorne = true;
        img.classList.remove("buruburu");
        img.classList.add("fuwafuwa");
        console.log(dino.name);
    }
    function naming(){
        if(isBorne){
            //let p = document.createElement("p");
            p.textContent = '恐竜の赤ちゃんに名前をつけよう！';
            let input = document.createElement("input");
            input.classList.add("dinoName");
            input.textContent = 'name :';
            let button = document.createElement("button");
            let btMsg = document.createTextNode("OK!");
            button.addEventListener('click',dinoNameSend);
            button.classList.add("secondBt");
            secondForm.append(p);
            secondForm.append(input);
            button.append(btMsg);
            secondForm.append(button);
            console.log(isNaming);
        }
    }
    function dinoNameSend(){
        let dinoName = document.querySelector(".dinoName").value;
        dino.setName(dinoName);
        secondForm.style.display = 'none';
        isNaming = true;
            console.log(dinoName);
            console.log(isNaming);
        createInfo();
        for(let i=0 ; i<buttons.length ; i++){
        buttons[i].classList.remove("hide");
        }
    }
    function isGrowthJudge(){
        if(dino.friendPoint > 15 && isFirstGrowth != true){
            forwardDino(1);
            isFirstGrowth = true;
        }
        if(dino.friendPoint > 30 && isSecondGrowth != true){
            forwardDino(2);
            isSecondGrowth = true;
        }
    }
    /*function growth(){
        if(friendPoint > 15){
            forwardDino(1);
        }else if(friendPoint > 30){
            forwardDino(2);
        }
    }*/
        /*}else if(friendPoint > 45){
            forwardDino(3);*/
        //大人になった時用  

    function forwardDino(nextIndex){
        dino = dinos[nextIndex];
        dino.setName(dinos[nextIndex-1].name);
        dino.setFriendPoint(dinos[nextIndex-1].friendPoint);
        setTimeout(function(){
            img.src = dino.getImgPath();
            img.id = dinos[nextIndex].idName;
        },4000)
    }
    function createInfo(){
        if(isNaming){
            for(let i=0 ; i<3 ; i++){
                let tr = document.createElement("tr");
                for(let j=0 ; j<2 ; j++){
                    let td = document.createElement("td");
                    if(i==0 && j==0){
                        td.textContent = 'User Name :'; 
                    }else if(i==0 && j==1){
                        td.textContent = userName.length>0 ? userName : "GEST";
                    }else if(i==1 && j==0){
                        td.textContent = 'Dinos Name :';
                    }else if(i==1 && j==1){
                        td.textContent = dino.name.length>0 ? dino.name : "Jhon";
                    }else if(i==2 && j==0){
                        td.textContent = 'friendPoint :';
                    }else if(i==2 && j==1){
                        td.textContent = 1;//dino.friendPoint;
                        tempTd = td;
                    }
                    tr.append(td);
                }
                table.append(tr);
            }
        }
    }  
    
    init();
}