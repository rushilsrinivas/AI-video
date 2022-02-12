objects = [];
video="";
status="";
function preload(){
video=createVideo("video.mp4");
video.hide();
}
function setup(){
canvas=createCanvas(480,280);
canvas.center();
}
function draw(){
    image(video,0,0,480,280);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for (i=0;i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+ objects.length;
            
            fill("#FF0000");
            percent=floor(objects[i].confidence* 100);
            text(objects[i].label+""+ percent+"%",objects[i].x+15,objects[1].y+15);
            noFill();
            stroke("#FF0000");
             rect(objects[i].x, objects[1].y, objects[i].width,objects[i].height);
        }
        
            
        
    }
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
    function gotResult(error,results){
        if(error){
            console.log(error);
            console.log(results);
            objects=results;
        }
    }