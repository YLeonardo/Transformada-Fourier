//Colores!!
CoLoUrS=new Array('00ff00','ff00ff','fff000','228B22');

var step=0.3,a_StEp=0.05,RunTime=0,currStep=0,Xpos=0,Ypos=0,cntr=70,count_a=0;
var count=0,move=1,Ay=0,Ax=0,dots=16;var x;brwsr=(document.layers)?1:0;
if (brwsr){
for (i=0; i < dots; i++){
document.write('<LAYER NAME="a'+i+'" LEFT=0 TOP=0 BGCOLOR=#018ABE CLIP="0,0,3,3"></LAYER>');
}
window.captureEvents(Event.MOUSEMOVE);
function nsMouse(evnt){
 Xpos = evnt.pageX;
 Ypos = evnt.pageY;
 }
window.onMouseMove = nsMouse
}
else{
document.write('<div id="ys" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
for (i=0; i < dots; i++){
document.write('<div id="ieDivs" style="position:absolute;top:0px;left:0px;width:3px;height:3px;background:#018ABE;font-size:3px"></div>');
}
document.write('</div></div>');
function ieMouse(){
 Ypos=event.y;
 Xpos=event.x;
 }
window.document.onmousemove = ieMouse
}

function MouseFollow(){
ay = Math.round(Ay+=(Ypos- Ay)* 4/40);
ax = Math.round(Ax+=(Xpos- Ax)* 4/40);
setTimeout('MouseFollow()',10);
}

function TwistnSpin(){
if (!brwsr) ys.style.top=document.body.scrollTop;
for (i=0; i < dots; i++) 
 {
 var allLayers=(document.layers)?document.layers["a"+i]:ieDivs[i].style;
 allLayers.top=ay+cntr*Math.cos((currStep+i*4)/10.2)*Math.sin(currStep/20);
 allLayers.left=ax+cntr*Math.sin((currStep+i*4)/10.2)*Math.cos(1+currStep/20);
 }
currStep-=step;
setTimeout("TwistnSpin()",10);
}
function CombineNstart(){
MouseFollow();TwistnSpin();colourStep();
}
window.onload=CombineNstart;