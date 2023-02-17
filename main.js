var audio = ""
var pulsoDX = 0
var pulsoEX = 0
var pulsoDY = 0
var pulsoEY = 0
var video =""

function preload() {
    audio = loadSound("music.mp3")
}

function setup() {
    var canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video,modelLoaded)
    posenet.on("pose", gotPoses)
}

function draw() {
    image(video, 0,0,600,500)
    fill("white")
    stroke("white")
}

function reproduzir() {
    audio.play()
    audio.setVolume(0.5)
    audio.rate(1)
}

function modelLoaded() {
    console.log("Modelo carregado")
}

function gotPoses(results,error) {
    if (results.length>0) {
        // console.log(results)
        pulsoEX = results[0].pose.leftWrist.x
        pulsoDX = results[0].pose.rightWrist.x
        pulsoEY = results[0].pose.leftWrist.y
        pulsoDY = results[0].pose.rightWrist.y
        console.log("pulso direito X " + pulsoDX)
        console.log("pulso direito Y " +pulsoDY)
        console.log("pulso esquerdo X " +pulsoEX)
        console.log("pulso esquerdo X " +pulsoEY)
    }
}