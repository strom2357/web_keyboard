var inputToKeyHash = {
    65: 'c',
    83: 'd',
    90: 'd',
    68: 'e',
    88: 'e',
    70: 'f',
    67: 'f',
    32: 'g',
    71: 'g',
    86: 'g',
    72: 'a',
    66: 'a',
    74: 'b',
    78: 'b',
    75: 'high-c',
    77: 'high-c',
    76: 'high-d',
    188: 'high-d',
    186: 'high-e',
    190: 'high-e',
    222: 'high-f',
    191: 'high-f',
    18: 'high-f',
    13: 'high-g',
    16: 'high-g',
    87: 'c-sharp',
    69: 'd-sharp',
    84: 'f-sharp',
    89: 'g-sharp',
    85: 'a-sharp',
    79: 'high-c-sharp',
    80: 'high-d-sharp',
    219: 'high-f-sharp',
    221: 'high-f-sharp',
    220: 'high-g-sharp'
}

var keyToFrequencyHash = {
    'c': 261.63,
    'd': 293.66,
    'e': 329.63,
    'f': 349.23,
    'g': 392,
    'a': 440,
    'b': 493.88,
    'c-sharp': 277.18,
    'd-sharp': 311.13,
    'f-sharp': 369.99,
    'g-sharp': 415.30,
    'a-sharp': 466.16,
    'high-c': 523.26,
    'high-d': 587.32,
    'high-e': 659.26,
    'high-f': 698.46,
    'high-g': 784,
    'high-c-sharp': 554.36,
    'high-d-sharp': 622.26,
    'high-f-sharp': 739.98,
    'high-g-sharp': 830.60
}

var octaveAdjuster = 1.0
var oscillatorHash = {}
var runningOscillators = []

document.onkeydown = function(e) {
    e.stopPropagation()
    if (e.keyCode == 38) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = oscillator.frequency.value * 1.0595
            var arrow = document.getElementById("bend-up");
            arrow.classList.add("arrow-active")
        })
    }

    if (e.keyCode == 40) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = oscillator.frequency.value * -1.0595
            var arrow = document.getElementById("bend-down");
            arrow.classList.add("arrow-active")
        })
    }

    if (e.keyCode == 37) {
        octaveAdjuster = Math.max((octaveAdjuster * 0.5), 0.25)
        if (octaveAdjuster < 1) {
            var downArrow = document.getElementById("octave-down");
            downArrow.classList.add("arrow-active")
            var upArrow = document.getElementById("octave-up");
            upArrow.classList.remove("arrow-active")
        }
        if (octaveAdjuster > 0.25) {
            runningOscillators.forEach(function (oscillator) {
                oscillator.frequency.value = oscillator.frequency.value * 0.5
            })
        }
    }

    if (e.keyCode == 39) {
        octaveAdjuster = Math.min((octaveAdjuster * 2), 32)
        if (octaveAdjuster > 1) {
            var upArrow = document.getElementById("octave-up");
            upArrow.classList.add("arrow-active")
            var downArrow = document.getElementById("octave-down");
            downArrow.classList.remove("arrow-active")
        }
        if (octaveAdjuster < 32) {
            runningOscillators.forEach(function (oscillator) {
                oscillator.frequency.value = oscillator.frequency.value * 2
            })
        }
    }
    var idToUse = inputToKeyHash[e.keyCode]
    if (!idToUse)
        return
    else
        var key = document.getElementById(idToUse)
        key.classList.add("active")
        turnKeyOn(idToUse)
    return
}

document.onkeyup = function(e) {
    if (octaveAdjuster == 1) {
        var downArrow = document.getElementById("octave-down");
        downArrow.classList.remove("arrow-active")
        var upArrow = document.getElementById("octave-up");
        upArrow.classList.remove("arrow-active")
    }

    if (e.keyCode == 38 || e.keyCode == 40) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = 0
            var downArrow = document.getElementById("bend-down");
            var upArrow = document.getElementById("bend-up");
            upArrow.classList.remove("arrow-active")
            downArrow.classList.remove("arrow-active")
        })
    }

    var idToUse = inputToKeyHash[e.keyCode];
    if (!idToUse)
        return
    var key = document.getElementById(idToUse);
    key.classList.remove("active")
    turnKeyOff(idToUse)
}

function turnKeyOn(noteValue) {
    if (!oscillatorHash[noteValue]) {
        var oscillator = context.createOscillator();
        oscillator.frequency.value = keyToFrequencyHash[noteValue] * octaveAdjuster
        oscillator.connect(context.destination)
        oscillator.start(context.currentTime)
        oscillatorHash[noteValue] = oscillator
        runningOscillators.push(oscillatorHash[noteValue])
    }
}

function turnKeyOff(noteValue) {
    if (!!oscillatorHash[noteValue]) {
        var oscillator = oscillatorHash[noteValue]
        oscillator.stop(context.currentTime)
        oscillatorHash[noteValue] = null
        index = runningOscillators.indexOf(oscillator)
        runningOscillators.splice(index)
    }
}



var context
window.addEventListener('load', init, false)
function init() {
    console.log("github.com/strom2357/web_keyboard")
    console.log("WELCOME TO WEBKEYBOARD")
    try {
        window.AudioContext = window.AudioContext||window.webkitAudioContext
        context = new AudioContext()
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser')
    }
}