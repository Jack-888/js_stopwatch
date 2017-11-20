function start() {
    if (timeStart === null) {
        timeStart = new Date();
    }

    started = setInterval(clockRunning, 100);
}

function fixation() {
    if (timeStart === null) {
        return null;
    }

    console.log( 'Fixed time: ' + clockRunning() );
}

function stop() {

    clearInterval(started);
    timeStart = null;
}

function clockRunning() {
    var currentTime = new Date(),
        timePassed = new Date(currentTime - timeStart),

        hour = timePassed.getUTCHours(),
        min = timePassed.getUTCMinutes(),
        sec = timePassed.getUTCSeconds(),
        ms = timePassed.getUTCMilliseconds();

    console.log (hour + ':' + min + ':' + sec + ':' + ms);

    return (hour + ':' + min + ':' + sec + ':' + ms);
}

var timeStart = null,
    started = null;

