let oBox = document.querySelector("box");  // 获取战场盒子
//初始化界面

function init{
    //设置背景图片   注意:路径要以 htnl 路径作为参照
    oBox.style.cssText="background:url('img/bg_2.jpg') no-repeat center/cover;"
    // 创建标题
    let h1 = document.createElement("h1");
    h1.className = "tittle" ;
    h1.innerHTML = "打飞机" ;
    oBox.appendChild(h1) ;
    //创建游戏入口
    let optionArr = ['',]
}