// 封装一个代替 getElementById（）的方法
function byId(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id
}

//轮播图定时器设置
// 全局变量
var index = 0;
timer = null;
pics = byId("banner").getElementsByTagName("div"); // Elements
dots = byId("dots").getElementsByTagName("span");
prev = byId("prev");
next = byId("next");
len = pics.length;
menu = byId("menu-content");
menuItems = menu.getElementsByTagName("menu-item");
console.log(menuItems);


function slideImg() {
    var main = byId("main");
    // 滑过清除定时器，离开继续
    main.onmouseover = function () {
        // 滑过清除定时器
        if (timer) clearInterval(timer)
    }
    main.onmouseout = function () { //调用 onmouseout 事件
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0
            }
            // 切换图片
            changeImage()  // index 全局变量不用传参
        }, 3000);
    }

    main.onmouseout();  //调用 onmouseout 方法    自动在 main 上触发鼠标离开事件


    // 点击圆点切换图片
    // 遍历所有圆点，且绑定点击事件，
    for (var d = 0; d < len; d++) {
        // 给所有 span 添加一个 id 的属性，值为 d ，作为当前 span 的索引
        dots[d].id = d
        dots[d].onclick = function () {   // 没有前面代码，function 改变作用域，d 每次弹出的都是循环最终值 3
            // 改变 index 为当前 span 的 id 值
            index = this.id
            changeImage()
        }
    }

    // 下一张
    next.onclick = function () {
        index++;
        if (index >= len) index = 0
        changeImage()
    }
    // 上一张
    prev.onclick = function () {
        index--;
        if (index < 0) index = 2  // len -1
        changeImage()
    }


}


function changeImage() {
    // 遍历 banner 下所有 div 及 dots 下所有 span，，将 div 隐藏，将 span 清除类
    for (var i = 0; i < len; i++) {
        pics[i].style.display = "none";
        dots[i].className = ""
    }
    // 根据 index 索引找到当前 div 和当前 span ,将其显示和设为当前
    pics[index].style.display = 'block';
    dots[index].className = "active"
}

slideImg()