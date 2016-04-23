var inputToKeyHash = {
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

document.onkeydown = function(e) {
    console.log(e.keyCode)
    var idToUse = inputToKeyHash[e.keyCode]
    if (!idToUse)
        return
    else
        turnKeyOn(idToUse)
}

document.onkeyup = function(e) {
    var idToUse = inputToKeyHash[e.keyCode]
    turnKeyOff(idToUse)
}

function turnKeyOn(key) {
    var key = document.getElementById(key)
    key.classList.add("active")
}

function turnKeyOff(key) {
    var key = document.getElementById(key)
    key.classList.remove("active")
}