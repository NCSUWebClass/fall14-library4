$(document).ready(function() {

    var userid = Math.floor((Math.random() * 10000000) + 1);
    console.log('userid: ' + userid);
    
    websocket = 'ws://' + document.location.host + '/ws';
    if (window.WebSocket) {
        ws = new WebSocket(websocket);
    }
    else if (window.MozWebSocket) {
        ws = MozWebSocket(websocket);
    }
    else {
        console.log('WebSocket Not Supported');
        return;
    }
    
    window.onbeforeunload = function(e) {
        ws.close(1000);
        if(!e) e = window.event;
        e.stopPropagation();
        e.preventDefault();
    };

    ws.onmessage = function (evt) {
        var msg = JSON.parse(evt.data);
        if (msg.userid != userid) {
            make_event(msg.type, msg.cx, msg.cy);
        }
    };
    
    function make_event(type, x, y) {
        
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(type, true, true, window, 1, null, null, x * window.innerWidth, y * window.innerHeight, false, false, false, false, 0, null);
        evt.data = "fake";
        document.getElementsByTagName("canvas")[0].dispatchEvent(evt);
    }

    window.sendws = function (type, x, y) {
        if (ws.readyState == 1) {
            ws.send(JSON.stringify({'userid': userid, 'type': type, 'cx': x, 'cy': y}));
        }
    }
    
    function mouse_handler(e) {
        if (e.originalEvent.data !== "fake") {
            var cx, cy;
            
            if (e.originalEvent.touches !== undefined && e.originalEvent.touches.length) {
                cx = e.originalEvent.touches[0].clientX;
                cy = e.originalEvent.touches[0].clientY;
            } else {
                cx = e.clientX;
                cy = e.clientY;
            }
            
            
            
            var remap = {
                'touchstart': 'mousedown',
                'touchmove': 'mousemove',
                'touchend': 'mouseup',
            }
            
            var type = e.type;
            if (remap[type] !== undefined) {
                type = remap[type];
            }
            
            sendws(type, cx / window.innerWidth, cy / window.innerHeight);
        }
    }
    
    $(window).bind({
        'mousemove': mouse_handler,
        'touchmove': mouse_handler,
        'mouseup': mouse_handler,
        'mousedown': mouse_handler,
        'touchstart': mouse_handler,
        'touchend': mouse_handler,
    });
});