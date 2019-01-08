var robotPos = []
var sprite = new Image()

var map = {}
var x = 0
var y = 0
var activeSprite = 0
var firstPress = 1

function init() {
    for(i = 0; i < 12; i++) {
        robotPos[i] = new Image()
    }
    robotPos[0].src = 'Up/u1.png'; robotPos[1].src = 'Up/u2.png'; robotPos[2].src = 'Up/u3.png'
    robotPos[3].src = 'Left/l1.png'; robotPos[4].src = 'Left/l2.png'; robotPos[5].src = 'Left/l3.png'
    robotPos[6].src = 'Right/r1.png'; robotPos[7].src = 'Right/r2.png'; robotPos[8].src = 'Right/r3.png'
    robotPos[9].src = 'Down/d3.png'; robotPos[10].src = 'Down/d2.png'; robotPos[11].src = 'Down/d1.png'
    sprite.src = robotPos[0].src

    window.addEventListener('keydown', e => {
        kdTime = new Date()
        map[e.key] = true
    })
    window.addEventListener('keyup', e => {
        firstPress = 1
        map[e.key] = false
    })

    window.requestAnimationFrame(draw)
}

function checkMove() {
    if(map["ArrowUp"]) {
        sprite.src = changeSprite(0)
        y -= 3
    }
    else if(map["ArrowLeft"]) {
        sprite.src = changeSprite(3)
        x -= 3
    }
    else if(map["ArrowRight"]) {
        sprite.src = changeSprite(6)
        x += 3
    }
    else if(map["ArrowDown"]) {
        sprite.src = changeSprite(9)
        y += 3
    }
}

function changeSprite(startPos) {
    // The first time a key triggers a sprite change
    if(firstPress) {
        firstPress = 0
        activeSprite = startPos
    } 
    else if(((activeSprite + 1) % 3) == 0)
        activeSprite = activeSprite - 2
    else
        activeSprite++
    return robotPos[activeSprite].src
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d')
    ctx.globalCompositeOperation = 'destination-over'
    ctx.clearRect(0, 0, 600, 600)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);

    checkMove()
    ctx.drawImage(sprite, x, y)
    ctx.restore()
    window.requestAnimationFrame(draw)
}
init()