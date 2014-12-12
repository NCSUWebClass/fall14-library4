// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://haxiomic.github.io/GPU-Fluid-Experiments/html5/
// @grant        none
// ==/UserScript==

function draw_digit(slot, num, cb, i) {
    var digitWidth = window.innerWidth / 9;
    var digitHeight = window.innerHeight / 3;
    if (i === undefined) {
        i = 0;
    }
    console.log(i);
    
    var offsetX = (digitWidth * slot * 2) + digitWidth; 
    
    var moves = [
        function(t) { make_event("mouse" + t, offsetX, digitHeight) },
        function(t) { make_event("mouse" + t, offsetX + digitWidth, digitHeight) },
        function(t) { make_event("mouse" + t, offsetX, digitHeight * 1.5) },
        function(t) { make_event("mouse" + t, offsetX + digitWidth, digitHeight * 1.5) },
        function(t) { make_event("mouse" + t, offsetX, digitHeight * 2) },
        function(t) { make_event("mouse" + t, offsetX + digitWidth, digitHeight * 2) },
    ];
    
    var nums = [
        [0, 1, 3, 5, 4, 2, 0],
        [1, 3, 5],
        [0, 1, 3, 2, 4, 5],
        [0, 1, 3, 2, 3, 5, 4],
        [0, 2, 3, 1, 3, 5],
        [1, 0, 2, 3, 5, 4],
        [1, 0, 2, 4, 5, 3, 2],
        [0, 1, 3, 5],
        [2, 0, 1, 3, 2, 4, 5, 3],
        [3, 1, 0, 2, 3, 5],
    ];
    
    if (i < nums[num].length) {

        moves[nums[num][i]]("move");
        if (i == 0) {
            moves[nums[num][i]]("down");
        }
        setTimeout(function() { draw_digit(slot, num, cb, i + 1) }, 500);  
    } else if (i >= nums[num].length) {
        console.log('ups');
        console.log(nums[num][nums[num].length - 1]);
        moves[nums[num][nums[num].length - 1]]("up");
        setTimeout(function() { cb() }, 1000);
    }


}


function make_event(type, x, y) {
	var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type, true, false, window, 1, null, null, x, y, false, false, false, false, 0, null);
    document.getElementsByTagName("canvas")[0].dispatchEvent(evt);
}

var slot = 0;
var d = 0;

function next_digit() {
    draw_digit(slot, d, next_digit);
    slot = (slot + 1) % 4;
    d = (d + 1) % 10;
}

setTimeout(next_digit, 2000);