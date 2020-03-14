// 封装一个代替 getElementById（）的方法
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id
}

//轮播图定时器设置
// 全局变量
var index = 0;
    timer = null;
    pics = byId("banner").getElementsByTagName("div"); // Elements
    dots = byId("dots").getElementsByTagName("div"); 
    len = pics.length;

function slideImg(){
    var main = byId("main");
    // 滑过清除定时器，离开继续
    main.onmouseover = function(){
        // 滑过清除定时器
        if(timer) clearInterval(timer)
    }
    main.onmouseout = function(){ //调用 onmouseout 事件
        timer = setInterval(function(){
            index++;
            if(index>=len){
                index = 0
            }
            // 切换图片
            changeImage()  // index 全局变量不用传参
        },3000);
    } 

    main.onmouseout();  //调用 onmouseout 方法    自动在 main 上触发鼠标离开事件


    // 点击圆点切换图片
    // 遍历所有圆点，且绑定点击事件，
    for(var i=0;i<len;i++){
        dots[i].onclick = function(){
            alert("hello")
        }
    }
}


function changeImage(){
    // 遍历 banner 下所有 div，将其隐藏
    for(var i =0;i<len;i++){
        pics[i].style.display = "none";
    }
    // 根据 index 索引找到当前 div,将其显示
    pics[index].style.display = 'block';
}

slideImg()