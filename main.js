var drawingBoard = document.getElementById("canvas");
var context  = drawingBoard.getContext("2d");
var eraserColor = window.getComputedStyle(drawingBoard, null).backgroundColor;

//获取用户提供的RGB与width
var colorR = document.getElementById("red");
var colorG = document.getElementById("green");
var colorB = document.getElementById("blue");
var lineWidth = document.getElementById("LineWidth")
var RGB = [0,0,0];
var myColor = "rgba("+ RGB[0] + "," + RGB[1] + "," + RGB[2] + ",1)";
colorR.oninput = function(){
    RGB[0] = colorR.value; 
    myColor = "rgba("+ RGB[0] + "," + RGB[1] + "," + RGB[2] + ",1)"
    console.log(RGB[0]); 
}
colorG.oninput = function(){
    RGB[1] = colorG.value;
    myColor = "rgba("+ RGB[0] + "," + RGB[1] + "," + RGB[2] + ",1)"
    //console.log(RGB[0],RGB[1],RGB[2]); 
}
colorB.oninput = function(){
    RGB[2] = colorB.value;
    myColor = "rgba("+ RGB[0] + "," + RGB[1] + "," + RGB[2] + ",1)"
    //console.log(RGB[0],RGB[1],RGB[2]); 
}
var myLineWidth = 10;
lineWidth.oninput = function(){
    myLineWidth = lineWidth.value;
}

//画板跟随窗口大小改变
function resize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    drawingBoard.width = pageWidth - 100;
    drawingBoard.height = pageHeight;
    context.fillStyle = "#fff";
    context.fillRect(100,0,drawingBoard.width,drawingBoard.height);
}
resize();
window.onresize = function(){
    resize();
}

//封装函数
function drawCircle(x,y,radius,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x - 100, y, radius, 0,Math.PI*2);
    context.fill();
}
function drawLine(x1,y1,x2,y2,color){
    context.lineWidth = myLineWidth;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1 - 100,y1);
    context.lineTo(x2 - 100,y2);
    context.stroke();
    context.closePath();
}

//监听用户鼠标事件
    //切换与使用工具
var eraserEnabled = false;
eraser.onclick = function(){
    eraserEnabled = true;
    eraser.classList.add("active");
    pen.classList.remove("active");
}
pen.onclick = function(){
    eraserEnabled = false;
    pen.classList.add("active");
    eraser.classList.remove("active");
}
download.onclick = function(){
    var url = drawingBoard.toDataURL("image/png");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "mycanvas";
    a.target = "_blank";
    a.click();
}
clear.onclick = function(){
    context.fillStyle = "#fff";
    context.fillRect(0,0,drawingBoard.width,drawingBoard.height);
}
//监听用户鼠标事件 
    //画画/擦
var pressed = false;
var lastPoint = {
    x:0,
    y:0
}
if(document.body.ontouchstart !== undefined){
    drawingBoard.ontouchstart = function(aaa){
        pressed = true;
        var x = aaa.touches[0].clientX;
        var y = aaa.touches[0].clientY; 
        lastPoint.x = x;
        lastPoint.y = y;
        if(eraserEnabled)
            drawCircle(x,y,myLineWidth/2,eraserColor);
        else{
            drawCircle(x,y,myLineWidth/2,myColor);
        } 
    }
    drawingBoard.ontouchmove = function(aaa){
        if(pressed){
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY; 
            if(eraserEnabled){
                drawCircle(x,y,myLineWidth/2,eraserColor);
                drawLine(lastPoint.x,lastPoint.y,x,y,eraserColor);
            }
            else{
                drawCircle(x,y,myLineWidth/2,myColor);
                drawLine(lastPoint.x,lastPoint.y,x,y,myColor);
            }
            lastPoint.x = x;
            lastPoint.y = y;
        }
    }
    drawingBoard.ontouchend = function(){
        pressed = false;
    }
}else{
    drawingBoard.onmousedown = function(aaa){
        pressed = true;
        var x = aaa.clientX;
        var y = aaa.clientY; 
        lastPoint.x = x;
        lastPoint.y = y;
        if(eraserEnabled)
            drawCircle(x,y,myLineWidth/2,eraserColor);
        else{
            drawCircle(x,y,myLineWidth/2,myColor);
        }       
    }
    drawingBoard.onmousemove = function(aaa){
        if(pressed){
            var x = aaa.clientX;
            var y = aaa.clientY; 
            if(eraserEnabled){
                drawCircle(x,y,myLineWidth/2,eraserColor);
                drawLine(lastPoint.x,lastPoint.y,x,y,eraserColor);
            }
            else{
                drawCircle(x,y,myLineWidth/2,myColor);
                drawLine(lastPoint.x,lastPoint.y,x,y,myColor);
            }
            lastPoint.x = x;
            lastPoint.y = y;
        }    
    }
    drawingBoard.onmouseup = function(){
        pressed = false;
    }
    
}


