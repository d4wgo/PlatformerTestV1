
//image refrences
var background = new Image();
background.src = "images/platformworld2PNG.png";
var playerIdle = new Image();
playerIdle.src = "images/player_idle.png";
var playerJumpRight = new Image();
playerJumpRight.src = "images/player_jumpRight.png";
var playerJumpLeft = new Image();
playerJumpLeft.src = "images/player_jumpLeft.png";
var playerRun1Right = new Image();
playerRun1Right.src = "images/player_walk1Right.png";
var playerRun2Right = new Image();
playerRun2Right.src = "images/player_walk2Right.png";
var playerRun1Left = new Image();
playerRun1Left.src = "images/player_walk1Left.png";
var playerRun2Left = new Image();
playerRun2Left.src = "images/player_walk2Left.png";
var fireBall = new Image();
fireBall.src = "images/fireball.png";
//--------
var gameObjects = []; //gameobjects are seen by rayscans
var nullObjects = []; //null objects are not seen by rayscans
var ui = [];
var buttons = []; //clickable buttons
//gameObject
//syntax:
//new var newGO = GameObject(id,x,y,posX,posY,sizeX,sizeY);
//font:
var font = "Verdana";
//gameObjects.push(newGO);
class GameObject{
    constructor(a,b,c,d,e){
        this.id = a;
        this.x = b;
        this.y = c;
        this.sizeX = d;
        this.sizeY = e;
        this.image = null;
        this.color = null;
        this.gravity = null;
        this.rotation = null;
        this.clicked = null;
        this.hovered = null;
        this.gravityTimer = 0;
        this.yForce = 0;
        this.text = null;
        this.textColor = "black";
        this.textSize = 20;
        this.textOffsetY = 0;
        this.textOffsetX = 0;
        this.parent = null;
        this.changeX = 0;
        this.changeY = 0;
        this.rotateBox = null;
    }
}
function findObject(id){
    for(var i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].id == id){
            return gameObjects[i];
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        if(nullObjects[i].id == id){
            return nullObjects[i];
        }
    }
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].id == id){
            return buttons[i];
        }
    }
    for(var i = 0; i < ui.length; i++){
        if(ui[i].id == id){
            return ui[i];
        }
    }
    return null;
}
function deleteObject(id){
    var found = false;
    for(var i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].id == id){
            gameObjects.splice(i,1);
            found = true;
            break;
        }
    }
    if(!found){
        for(var i = 0; i < nullObjects.length; i++){
            if(nullObjects[i].id == id){
                nullObjects.splice(i,1);
                found = true;
                break;
            }
        }
        if(!found){
            for(var i = 0; i < buttons.length; i++){
                if(buttons[i].id == id){
                    buttons.splice(i,1);
                    found = true;
                    break;
                }
            }
            if(!found){
                for(var i = 0; i < ui.length; i++){
                    if(ui[i].id == id){
                        ui.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
}
//rayscan
//syntax:
//rayscan(starting x, starting y, angle, distance)
function rayscan(a,b,c,d){
    var checkX = a;
    var checkY = b;
    var ang = c;
    for(var i = 0; i < d; i++){
        for(var j = 0; j < gameObjects.length; j++){
            var objCheck = gameObjects[j];
            if(checkX >= (objCheck.x - objCheck.sizeX/2) && checkX <= (objCheck.x + objCheck.sizeX/2) && checkY <= (objCheck.y + objCheck.sizeY/2) && checkY >= (objCheck.y - objCheck.sizeY/2)){
                return objCheck;
            }       
        }
        checkX += Math.cos(ang);
        checkY -= Math.sin(ang);
    }
    return null;
}
//input
var input = {
    w:false,
    a:false,
    s:false,
    d:false,
    up:false,
    left:false,
    down:false,
    right:false,
    space:false,
    f:false,
    shift:false,
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    mouse1:false
}
var clickInput = {
    w:false,
    a:false,
    s:false,
    d:false,
    up:false,
    left:false,
    down:false,
    right:false,
    space:false,
    f:false,
    shift:false,
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    mouse1:false
};
var nClick;
document.addEventListener('keydown', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = true;
            clickInput.w = true;
            break;
        case "KeyA":
            input.a = true;
            clickInput.a = true;
            break;
        case "KeyS":
            input.s = true;
            clickInput.s = true;
            break;
        case "KeyD":
            input.d = true;
            clickInput.d = true;
            break;
        case "ArrowUp":
            input.up = true;
            clickInput.up = true;
            break;
        case "ArrowLeft":
            input.left = true;
            clickInput.left = true;
            break;
        case "ArrowDown":
            input.down = true;
            clickInput.down = true;
            break;
        case "ArrowRight":
            input.right = true;
            clickInput.right = true;
            break;
        case "Space":
            input.space = true;
            clickInput.space = true;
            break;
        case "KeyF":
            input.f = true;
            clickInput.f = true;
            break;
        case "ShiftLeft":
            input.shift = true;
            clickInput.shift = true;
            break;
        case "Digit1":
            input.one = true;
            clickInput.one = true;
            break;
        case "Digit2":
            input.two = true;
            clickInput.two = true;
            break;
        case "Digit3":
            input.three = true;
            clickInput.three = true;
            break;
        case "Digit4":
            input.four = true;
            clickInput.four = true;
            break;
        case "Digit5":
            input.five = true;
            clickInput.five = true;
            break;
        case "Digit6":
            input.six = true;
            clickInput.six = true;
            break;
        case "Digit7":
            input.seven = true;
            clickInput.seven = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = false;
            break;
        case "KeyA":
            input.a = false;
            break;
        case "KeyS":
            input.s = false;
            break;
        case "KeyD":
            input.d = false;
            break;
        case "ArrowUp":
            input.up = false;
            break;
        case "ArrowLeft":
            input.left = false;
            break;
        case "ArrowDown":
            input.down = false;
            break;
        case "ArrowRight":
            input.right = false;
            break;
        case "Space":
            input.space = false;
            break;
        case "KeyF":
            input.f = false;
            break;
        case "ShiftLeft":
            input.shift = false;
            break;
        case "Digit1":
            input.one = false;
            break;
        case "Digit2":
            input.two = false;
            break;
        case "Digit3":
            input.three = false;
            break;
        case "Digit4":
            input.four = false;
            break;
        case "Digit5":
            input.five = false;
            break;
        case "Digit6":
            input.six = false;
            break;
        case "Digit7":
            input.seven = false;
            break;
    }
});
document.addEventListener('mousedown', function(event) {
    input.mouse1 = true;
    clickInput.mouse1 = true;
});
document.addEventListener('mouseup', function(event) {
    input.mouse1 = false;
});
document.addEventListener('mousemove', function(event) {
    getCursorPosition(canvas,event);
});
var mousePos = {
    x:0,
    y:0
}
//canvas creation
var canvasName = "myCanvas"; //replace with id of canvas within the html
var canvas = document.getElementById(canvasName);
var ctx = canvas.getContext("2d");
var virtualHeight = 900; //the width of the canvas things are being drawn on before scaling
var virtualWidth = 1600; //the height of the canvas things are being drawn on before scaling
fullScreen = false; //should the canvas fill the whole screen - make sure body and the canvas have a margin and padding of 0
fitAspectRatioFullscreen = true; //should the aspect ratio of the virtual canvas be forced - this removes distortion of stretching
fitDiv = false; //if you want the canvas to be in a part of the page instead of the whole page
/*recomended css settings for canvas
    padding:0;
    margin: 0 auto;
    display:block;
*/
var scaleX;
var scaleY;
setInterval(function(){
    if(fullScreen){
        fullScreenCanvas();
    }
    else if(fitAspectRatioFullscreen){
        aspectRatioFullScreenCanvas();
    }
    else if(fitDiv){
        fitDivCanvas();
    }
    scaleX = canvas.width / virtualWidth;
    scaleY = canvas.height / virtualHeight;
},1000/10); //refreshes canvas size a set times per second - the "10" is changeable to whatever tickrate works the best
//canvas fit functions
function fullScreenCanvas(){
    canvas.width = window.innerWidth;
    canvas.height =  window.innerHeight;
}
function aspectRatioFullScreenCanvas(){
    var heightW = window.innerHeight;
    var widthW = window.innerWidth;
    var aspectR = virtualWidth / virtualHeight;
    if(aspectR > widthW/heightW){
        canvas.width = widthW;
        canvas.height = widthW / aspectR;
    }
    else{
        canvas.height = heightW;
        canvas.width = heightW * aspectR;
    }
}
function fitDivCanvas(){
    var divIn = document.getElementById("myDIV"); //replace myDiv with the div the canvas is within
    canvas.height = divIn.offsetHeight;
    canvas.height = divIn.offsetWidth;
}
//cursor pos
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    mousePos.x = x/scaleX;
    mousePos.y = y/scaleY;
}
function pythagTheorem(a,b){
    return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
}
var deleteFixes = [];
function fixRotatingObjects(){
    var resolution = 8;
    for(var i = 0; i < deleteFixes.length; i++){
        deleteObject(deleteFixes[i]);
    }
    deleteFixes = [];
    for(var i = 0; i < gameObjects.length; i++){
        var n1 = gameObjects[i];
        if(n1.rotation != null){
            var manyX = n1.sizeX / resolution;
            var manyY = n1.sizeY / resolution;
            for(var j = 0; j < manyY; j++){
                for(var o = 0; o < manyX; o++){
                    var rndA = Math.random().toString().substring(2,7);
                    var farX = (o * resolution) - (n1.sizeX/2) + (resolution/2);
                    var farY = (j * resolution) - (n1.sizeY/2) + (resolution/2);
                    var radius = pythagTheorem(farX,farY);
                    var initRot = Math.atan(farY / farX);
                    deleteFixes.push(rndA);
                    if(o > manyX/2){
                        gameObjects.push(new GameObject(rndA,(Math.cos(n1.rotation + initRot) * radius) + n1.x,(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                        findObject(rndA).color = "red";
                    }
                    else if(o < manyX/2){
                        gameObjects.push(new GameObject(rndA,-(Math.cos(n1.rotation + initRot) * radius) + n1.x,-(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                        findObject(rndA).color = "red";
                    }
                }
            }
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var n1 = nullObjects[i];
        if(n1.rotateBox == true){
            if(n1.rotation != null){
                var manyX = n1.sizeX / resolution;
                var manyY = n1.sizeY / resolution;
                for(var j = 0; j < manyY; j++){
                    for(var o = 0; o < manyX; o++){
                        var rndA = Math.random().toString().substring(2,7);
                        var farX = (o * resolution) - (n1.sizeX/2) + (resolution/2);
                        var farY = (j * resolution) - (n1.sizeY/2) + (resolution/2);
                        var radius = pythagTheorem(farX,farY);
                        var initRot = Math.atan(farY / farX);
                        deleteFixes.push(rndA);
                        if(o > manyX/2){
                            gameObjects.push(new GameObject(rndA,(Math.cos(n1.rotation + initRot) * radius) + n1.x,(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                            findObject(rndA).color = "red";
                        }
                        else if(o < manyX/2){
                            gameObjects.push(new GameObject(rndA,-(Math.cos(n1.rotation + initRot) * radius) + n1.x,-(Math.sin(n1.rotation + initRot) * radius) + n1.y,resolution,resolution));
                            findObject(rndA).color = "red";
                        }
                    }
                }
            }
        }
    }
}
//game type:
//overview - the player is in the middle of the screen, and moves around the world
//non-follow overview, the player is in a world where the camera doesnt follow them, the whole game world is just the window
//no player - used for games where the player is not a focal point, turned based stuff or anything like that
var overview = false;
var nFOverview = true;
var nPO = false;
var fov = { //fov is only used for overview follow games
    x: 400,
    y: 200
}
var scene = 1;
function start(){
    scene = 1;
    switchScene(scene);
}
start();
var prevTime = Date.now();
var delta;
function runGame(){
    delta = Date.now() - prevTime;
    if(input.two){
        delta/=10;
    }
    prevTime = Date.now();
    var parents = [];
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            if(!parents.includes(a.parent)){
                parents.push(a.parent);
            }
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            if(!parents.includes(a.parent)){
                parents.push(a.parent);
            }
        }
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.ogy = a.y;
        a.ogx = a.x;
    }
    for(var i = 0; i < buttons.length; i++){
        var button = buttons[i];
        if(mousePos.x <= (button.x + button.sizeX/2) && mousePos.x >= (button.x - button.sizeX/2) && mousePos.y >= (button.y - button.sizeY/2) && mousePos.y <= (button.y + button.sizeY/2)){
            button.hovered = true;
        }
        else{
            button.hovered = false;
        }
        if(button.hovered && clickInput.mouse1){
            button.clicked = true;
        }
        else{
            button.clicked = false;
        }
    }
    Object.keys(clickInput).forEach(function(key) {
        if(input[key] != clickInput[key]){
            nClick = clickInput[key];
        }   
    });
    nClick = false;
    switch(scene){
        case 1:
            scene1(null);
            break;
        case 2:
            scene2(null);
            break;
        case 3:
            scene3(null);
            break;
        case 4:
            scene4(null);
            break;
        case 5:
            scene5(null);
            break;
        case 6:
            scene6(null);
            break;
        case 7:
            scene7(null);
            break;
        case 8:
            scene8(null);
            break;
        case 9:
            scene9(null);
            break;
    }
    fixRotatingObjects();
    Object.keys(clickInput).forEach(function(key) {
        clickInput[key] = false;     
    });
    draw();
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.changeX = a.x - a.ogx;
        a.changeY = a.y - a.ogy;
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.ogy = a.y;
        a.ogx = a.x;
    }
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < parents.length; i++){
        var a = parents[i];
        a.changeX = a.x - a.ogx;
        a.changeY = a.y - a.ogy;
    }
    for(var i = 0; i < gameObjects.length; i++){
        var a = gameObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var a = nullObjects[i];
        if(a.parent != null){
            a.x += a.parent.changeX;
            a.y += a.parent.changeY;
        }
    }
    window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);
var totalTranslateX = 0;
var totalTranslateY = 0;
function draw(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //totalTranslateX = 0;
    //ctx.translate(totalTranslateX + 704,0);
    for(var i = 0; i < nullObjects.length; i++){
        var tempObject = nullObjects[i];
        if(tempObject.gravity != null){
            applyGravity(tempObject);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(-tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
    }
    for(var i = 0; i < gameObjects.length; i++){
        var tempObject = gameObjects[i];
        if(tempObject.gravity != null){
            applyGravity(tempObject);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(-tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
    for(var i = 0; i < buttons.length; i++){
        var tempObject = buttons[i];
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
    for(var i = 0; i < ui.length; i++){
        var tempObject = ui[i];
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.text != null){
            ctx.textAlign = "center";
            ctx.fillStyle = tempObject.textColor;
            ctx.font = (tempObject.textSize * ((scaleX + scaleY)/2)) + "px " + font;
            ctx.fillText(tempObject.text,(tempObject.x + tempObject.textOffsetX) * scaleX,(tempObject.y + tempObject.textOffsetY) * scaleY);
        }
    }
}
function applyGravity(a){
    if(rayscan(a.x - (a.sizeX / 2),a.y + (a.sizeY / 2) + 1, 4.71, 2) == null && rayscan(a.x + (a.sizeX / 2),a.y + (a.sizeY / 2) + 1, 4.71, 2) == null){
        a.gravityTimer += delta/1000;
        a.y += a.gravity * a.gravityTimer * delta/10;
        if(a.id == "pBody"){
            a.jump = true;
        }
    }
    else{
        a.gravityTimer = 0;
        if(a.id == "pBody"){
            a.jump = false;
        }
    }
    if(a.yForce != 0){
        a.y -= a.yForce * delta/8;
        a.yForce -= delta/20;
        if(a.yForce < 0){
            a.yForce = 0;
        }
    }
}
function switchScene(a){
    gameObjects = [];
    nullObjects = [];
    ui = [];
    buttons = [];
    scene = a;
    switch(a){
        case 1:
            scene1("start");
            break;
        case 2:
            scene2("start");
            break;
        case 3:
            scene3("start");
            break;
        case 4:
            scene4("start");
            break;
        case 5:
            scene5("start");
            break;
        case 6:
            scene6("start");
            break;
        case 7:
            scene7("start");
            break;
        case 8:
            scene8("start");
            break;
        case 9:
            scene9("start");
            break;
    }
}
var totalTime = 0;
var totalTime1 = 0;
var oldY = 0;
var dontStop;
function scene1(a){
    if(a == "start"){
        //start function for scene1
        nullObjects.push(new GameObject("bg",800,450,1600,900));
        findObject("bg").image = background;
        gameObjects.push(new GameObject("obja",719,228,431,30));
        gameObjects.push(new GameObject("objb",105,700,211,28));
        gameObjects.push(new GameObject("objc",550,576,423,33));
        gameObjects.push(new GameObject("objd",1042,516,105,20));
        gameObjects.push(new GameObject("obje",1493,406,212,18));
        nullObjects.push(new GameObject("spawn",704,85,100,100));
        //nullObjects.push(new GameObject("playerBG",704,85,100,130));
        nullObjects.push(new GameObject("player",704,85,100,130));
        gameObjects.push(new GameObject("pHead",702,75,55,44));
        gameObjects.push(new GameObject("pBody",704,122,74,55));
        //gameObjects.push(new GameObject("exd",500,85,100,130));
        nullObjects.push(new GameObject("platform",300,400,200,30));
        nullObjects.push(new GameObject("name",0,0,0,0));
        findObject("name").text = "";
        findObject("name").textOffsetY = -60;
        findObject("platform").color = "black";
        findObject("platform").rotateBox = true;
        //findObject("playerBG").color = "red";
        findObject("player").image = playerIdle;
        findObject("pBody").gravity = 9.8;
        findObject("player").parent = findObject("pBody");
        //findObject("pHead").color = "red";
        //findObject("pBody").color = "red";
        findObject("pHead").parent = findObject("pBody");
        //findObject("exd").color = "red";
        //findObject("exd").parent = findObject("player");
        //findObject("playerBG").gravity = 9.8;
        findObject("player").run = 0;
        findObject("player").jumpUp = false;
        findObject("player").jump = false;
    }
    else{
        //logic for scene 1
        totalTime += delta;
        totalTime1 += delta;
        var me = findObject("pBody");
        var meImg = findObject("player");
        findObject("platform").rotation += 0.0000 * delta;
        if(totalTime1 < 2000){
            findObject("platform").x += delta/10;
        }
        else{
            findObject("platform").x -= delta/10;
        }
        if(totalTime1 > 4000){
            totalTime1 = 0;
        }
        if(!me.jump){
            dontStop = "";
        }
        var jumpUp = me.y < oldY;
        if(me.y > 950){
            me.x = 704;
            me.y = 85;
        }
        if(input.a){
            me.run = -1;
        }
        else if(input.d){
            me.run = 1;
        }
        else{
            if(me.jump){
                if(me.run != 0){
                    if(me.run > 0){
                        me.run -= delta/1000;
                    }
                    else if(me.run < 0){
                        me.run += delta/1000;
                    }
                }
            }
            else{
                me.run = 0;
            }
        }
        var rightSideCheck = rayscan(me.x + (me.sizeX/2) + 1,me.y + (me.sizeY/2) - 15,1.57,me.sizeY - 15);
        var leftSideCheck = rayscan(me.x - (me.sizeX/2) - 1,me.y + (me.sizeY/2) - 15,1.57, me.sizeY - 15);
        var rightSideCheckB = rightSideCheck != null;
        var leftSideCheckB = leftSideCheck != null;
        if(rightSideCheckB || leftSideCheckB){
            if(jumpUp){
                if(rightSideCheckB){
                    dontStop = rightSideCheck.id;
                }
                else{
                    dontStop = leftSideCheck.id;
                }
            }
            else{
                if(rightSideCheckB){
                    if(dontStop != rightSideCheck.id){
                        me.run = 0;
                    }
                }
                else{
                    if(dontStop != leftSideCheck.id){
                        me.run = 0;//w
                    }
                }
            }
        }
        if(rightSideCheckB && leftSideCheckB && !me.jump){
            me.y =  (rightSideCheck.y - (rightSideCheck.sizeY/2)) - (me.sizeY/2);
        }
        if(clickInput.space && ((rayscan(me.x - (me.sizeX/2),me.y + (me.sizeY/2) + 3,4.71,2) != null) || (rayscan(me.x + (me.sizeX/2),me.y + (me.sizeY/2) + 3,4.71,2) != null))){
            me.yForce = 16;
        }
        if(me.jump){
            if(me.run < 0){
                meImg.image = playerJumpLeft;
            }
            else{
                meImg.image = playerJumpRight;
            }
        }
        else if(me.run != 0){
            if(me.run < 0){
                if(totalTime < 200){
                    meImg.image = playerRun1Left;
                }
                else{
                    meImg.image = playerRun2Left;
                }
            }
            else{
                if(totalTime < 200){
                    meImg.image = playerRun1Right;
                }
                else{
                    meImg.image = playerRun2Right;
                }
            }
        }
        else{
            meImg.image = playerIdle;
        }
        me.x += me.run * delta / 2;
        if(totalTime > 400){
            totalTime = 0;
        }
        oldY = me.y;
        findObject("name").x = me.x;
        findObject("name").y = me.y;
        if(!me.jump){
            var right = rayscan(me.x + (me.sizeX / 2),me.y + (me.sizeY/2) + 1,4.71,2);
            var left = rayscan(me.x - (me.sizeX / 2),me.y + (me.sizeY/2) + 1,4.71,2);
            var objN;
            if(right){
                objN = right;
            }
            else{
                objN = left;
            }
            if(objN != null){
                me.y = objN.y - (objN.sizeY/2) - (me.sizeY/2);
                me.parent = objN;
            }
            else{
                me.parent = null;
            }
        }
        if(clickInput.mouse1){
            clickX = mousePos.x;
            clickY = mousePos.y;
            var from = me.x + (me.sizeX/2) + 11;
            if((clickX - me.x) < 0){
                from = me.x - (me.sizeX/2) - 11;
            }
            var ang = Math.atan((clickY - me.y)/(clickX - from));
            var rnd = Math.random().toString();
            gameObjects.push(new GameObject("fireB" + rnd,from,me.y,20,20));
            if((clickX - from) > 0){
                findObject("fireB" + rnd).velX = Math.cos(ang);
            }
            else{
                findObject("fireB" + rnd).velX = -Math.cos(ang);
            }
            if((clickX - from) > 0){
                findObject("fireB" + rnd).velY = Math.sin(ang);
            }
            else{
                findObject("fireB" + rnd).velY = -Math.sin(ang);
            }
            findObject("fireB" + rnd).image = fireBall;
            findObject("fireB" + rnd).rotation = 0;
        }
        for(var i = 0; i < gameObjects.length; i++){
            var isFb = gameObjects[i];
            if(isFb.id.substring(0,2) == "fi"){
                isFb.x += isFb.velX * delta/3;
                isFb.y += isFb.velY * delta/3;
                isFb.rotation += delta/60;
                if(isFb.x < 0 || isFb.x > 1600){
                    gameObjects.splice(i,1);
                }
                else if(isFb.y < 0 || isFb.y > 900){
                    gameObjects.splice(i,1);
                }
            }
        }
    }
}
function scene2(a){
    if(a == "start"){
    }
    else{
    }
}
function scene3(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene4(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene5(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene6(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene7(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene8(a){
    if(a == "start"){

    }
    else{
        
    }
}
function scene9(a){
    if(a == "start"){

    }
    else{
        
    }
}
//game functions go down here




