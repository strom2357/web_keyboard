window.inputToKeyHash = {
    65: 'c',
    83: 'd',
    68: 'e',
    70: 'f',
    71: 'g',
    72: 'a',
    74: 'b',
    87: 'c-sharp',
    69: 'd-sharp',
    84: 'f-sharp',
    89: 'g-sharp',
    85: 'a-sharp'
}

window.keyToFrequencyHash = {
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
    'a-sharp': 466.16
}

var oscillatorHash = {}
var runningOscillators = []

document.onkeydown = function(e) {
    if (e.keyCode == 38) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = oscillator.frequency.value * 1.0595
        })
    }

    if (e.keyCode == 40) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = oscillator.frequency.value * -1.0595
        })
    }

    if (e.keyCode == 37) {
        runningOscillators.forEach( function(oscillator) {
            console.log(oscillator.frequency.value)
            oscillator.frequency.value = oscillator.frequency.value * 0.5
            console.log(oscillator.frequency.value)
        })
    }

    if (e.keyCode == 39) {
        runningOscillators.forEach( function(oscillator) {
            console.log(oscillator.frequency.value)
            oscillator.frequency.value = oscillator.frequency.value * 2
            console.log(oscillator.frequency.value)
        })
    }
    console.log(e.keyCode)
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
    if (e.keyCode == 38 || e.keyCode == 40) {
        runningOscillators.forEach( function(oscillator) {
            oscillator.detune.value = 0
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
        oscillator.frequency.value = keyToFrequencyHash[noteValue]
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
        oscillator.stop(context.currentTime)
        oscillatorHash[noteValue] = null
        index = runningOscillators.indexOf(oscillator)
        runningOscillators.splice(index)
    }
}



var context
window.addEventListener('load', init, false)
function init() {
    try {
        window.AudioContext = window.AudioContext||window.webkitAudioContext
        context = new AudioContext()
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser')
    }
}