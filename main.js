var audio = ""
var pulsoDX = 0
var pulsoEX = 0
var pulsoDY = 0
var pulsoEY = 0
var video = ""
var numPulsoE = 0
var removeDecimals = 0
var pontuacaoPulsoE = 0
var pontuacaoPulsoD = 0

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
    circle(pulsoEX, pulsoEY, 20)
    if (pontuacaoPulsoE>0.2) {
        circle(pulsoEX, pulsoEY, 20)
        numPulsoE = Number(pulsoEY)
        removeDecimals = floor(numPulsoE)
        volume= removeDecimals/500
        document.getElementById("volume").innerHTML = "Volume: " + volume
        audio.setVolume(volume)
    }
    if (pontuacaoPulsoD>0.2) {
        circle(pulsoEX, pulsoEY, 20)
        if (pulsoDY>0 && pulsoDY<=100) {
            document.getElementById("speed").innerHTML = "Velocidade: 0.5x"
            audio.rate(0.5)
        } else if (pulsoDY >= 100 && pulsoDY <= 200) {
            document.getElementById("speed").innerHTML = "Velocidade: 1.0x"
            audio.rate(1.0)
        } else if (pulsoDY >= 200 && pulsoDY <= 300) {
            document.getElementById("speed").innerHTML = "Velocidade: 1.5x"
            audio.rate(1.5)
        } else if (pulsoDY >= 300 && pulsoDY <= 400) {
            document.getElementById("speed").innerHTML = "Velocidade: 2.0x"
            audio.rate(2.0)
        } else if (pulsoDY >= 400) {
            document.getElementById("speed").innerHTML = "Velocidade: 2.5x"
            audio.rate(2.5)
        }
    }
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
        console.log(results)
        pulsoEX = results[0].pose.leftWrist.x
        pulsoDX = results[0].pose.rightWrist.x
        pulsoEY = results[0].pose.leftWrist.y
        pulsoDY = results[0].pose.rightWrist.y
        pontuacaoPulsoE =  results[0].pose.keypoints[9].score
        pontuacaoPulsoD =  results[0].pose.keypoints[10].score
        // console.log("pulso direito X " + pulsoDX)
        // console.log("pulso direito Y " +pulsoDY)
        // console.log("pulso esquerdo X " +pulsoEX)
        // console.log("pulso esquerdo X " +pulsoEY)
    }
}