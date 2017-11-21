function start() {
    if (timeStart === null) {
        timeStart = new Date();
    }

    if (timeStop !== null) {
        duration += (new Date() - timeStop);
    }

    started = setInterval(clockRunning, 10);
}

function pause() {
    timeStop = new Date();
    clearInterval(started);
    started = null;
}

function fixation() {
    if (timeStart === null) {
        return null;
    }

    var fixationList = document.getElementById("fixation-list");

    if (idFixationList <= 5) {
        var li = document.createElement("li");
        li.setAttribute('id', idFixationList);
        li.appendChild(document.createTextNode(fixationTime));
        fixationList.appendChild(li);
        ++idFixationList;
    } else {
        document.getElementById("5").innerHTML = fixationTime;
    }
}

function clearFixation(){
    var fixationList = document.getElementById("fixation-list");
    if (fixationList.children.length >= 1) {
        fixationList.removeChild(fixationList.lastChild);
        --idFixationList;
    }
}

function reset() {
    clearInterval(started);
    timeStart = null;
    started = null;
    idFixationList = 1;
    timeStop = null;
    duration = 0;
    fixationTime = null;

    var idClearFixation = document.getElementById("fixation-list");

    while (idClearFixation.firstChild) {
        idClearFixation.removeChild(idClearFixation.firstChild);
    }

    document.getElementById("display").innerHTML = "00:00:00.000";
}

function clockRunning() {
    var currentTime = new Date(),
        timePassed = new Date(currentTime - timeStart -  duration),

        hour = timePassed.getUTCHours(),
        min = timePassed.getUTCMinutes(),
        sec = timePassed.getUTCSeconds(),
        ms = timePassed.getUTCMilliseconds();

    fixationTime = htmlSendFormatting(hour, min, sec, ms);

    return fixationTime;
}

function htmlSendFormatting(hour, min, sec, ms) {
    return document.getElementById("display").innerHTML =
        (hour > 9 ? hour : "0" + hour) + ":" +
        (min > 9 ? min : "0" + min) + ":" +
        (sec > 9 ? sec : "0" + sec) + "." +
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}

function startPauseStopwatch() {
    if (started === null) {
        document.getElementById("startPause").value = "Pause";
        // startPause.value = "Pause";
        start();

    } else {
        document.getElementById("startPause").value = "Start";
        //startPause.value = "Start";
        pause();
    }
}

var startPauseId = document.getElementById("startPause");
startPauseId.addEventListener('click', startPauseStopwatch);

var resetId = document.getElementById("reset");
resetId.addEventListener('click', reset);

var fixationId = document.getElementById("fixation");
fixationId.addEventListener('click', fixation);

var clearId = document.getElementById("clear");
clearId.addEventListener('click', clearFixation);

var timeStart = null,
    started = null,
    idFixationList = 1,
    timeStop = null,
    duration = 0,
    fixationTime = null;

