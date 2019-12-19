var socket = io({
    autoConnect: false
});

function logMsg(message) {
    display.innerHTML += `${message} <br />`;
}

function clearlog() {
    display.innerHTML = '';
}

$(function () {
    $('#chkToggle').bootstrapToggle({
        on: 'Connected',
        off: 'Disconnected'
    })
    $('#chkToggle').bootstrapToggle('off');
});

function toggleWS() {
    if (socket.disconnected) {
        socket.open();
        $('#chkToggle').bootstrapToggle('on');
    } else {
        socket.close();
        $('#chkToggle').bootstrapToggle('off');
    }
}

socket.on('connect', function () {
    console.log('connected status: ', socket.connected);
    logMsg('connected status: ' + socket.connected);
});

socket.on('disconnect', function (reason) {
    logMsg('disconnected. reason: ' + reason);
});

function goUp() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('up');
        logMsg("<strong>Command:</strong> Up");
    }
}
function goDown() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('down');
        logMsg("<strong>Command:</strong> Down");
    }
}
function goLeft() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('left');
        logMsg("<strong>Command:</strong> Left");
    }
}
function goRight() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('right');
        logMsg("<strong>Command:</strong> Right");
    }
}

function goUpRight() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('upright');
        logMsg("<strong>Command:</strong> Up Right");
    }
}
function goDownRight() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('downright');
        logMsg("<strong>Command:</strong> Down Right");
    }
}
function goUpLeft() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('upleft');
        logMsg("<strong>Command:</strong> Up Left");
    }
}
function goDownLeft() {
    if (!socket.connected) {
        logMsg("No WebSocket connection.");
    } else {
        socket.emit('downleft');
        logMsg("<strong>Command:</strong> Down Left");
    }
}



// Virtual Joystick


console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

var joystick = new VirtualJoystick({
    container: document.getElementById('container'),
    mouseSupport: true,
    stationaryBase: false,
    baseX: 200,
    baseY: 200
});
joystick.addEventListener('touchStart', function () {
    console.log('down')
})
joystick.addEventListener('touchEnd', function () {
    console.log('up')
})

setInterval(function () {
    var outputEl = document.getElementById('result');
    outputEl.innerHTML = '<b>Result:</b> '
        + ' dx:' + joystick.deltaX()
        + ' dy:' + joystick.deltaY()
        + (joystick.right() ? ' right' : '')
        + (joystick.up() ? ' up' : '')
        + (joystick.left() ? ' left' : '')
        + (joystick.down() ? ' down' : '');

    let direction = '';

    direction += (joystick.up()) ? 'up' : ''
    direction += (joystick.down()) ? 'down' : ''
    direction += (joystick.left()) ? 'left' : ''
    direction += (joystick.right()) ? 'right' : ''
    
    switch (direction) {
        case 'up':
            goUp();
            break;
        case 'down':
            goDown();
            break;
        case 'left':
            goLeft();
            break;
        case 'right':
            goRight();
            break;
        case ('upright' || 'rightup'):
            goUpRight();
            break;
        case ('downright' || 'rightdown'):
            goDownRight();
            break;
        case ('upleft' || 'leftup'):
            goUpLeft();
            break;
        case ('downleft' || 'leftdown'):
            goDownLeft();
            break;
    }
}, 1 / 10 * 1000);
