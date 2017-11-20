function startPause() {
    if (runing === false) {
        if (timeStart === null) {
            timeStart = new Date();
        }

        if (timeStop !== null) {
            duration += (new Date() - timeStop);
        }

        started = setInterval(clockRunning, 10);
        runing = true;

    } else {
        timeStop = new Date();
        clearInterval(started);
        runing = false;
    }
}

function fixation() {
    if (timeStart === null) {
        return null;
    }

    var ul = document.getElementById("dynamic-list");

    if (id_fixation <= 5) {
        var li = document.createElement("li");
        li.setAttribute('id', id_fixation);
        li.appendChild(document.createTextNode(fixationTime));
        ul.appendChild(li);
        ++id_fixation;
    } else {
        console.log( id_fixation );
        document.getElementById("5").innerHTML = fixationTime;
    }
}

function clearFixation(){
    var ul = document.getElementById("dynamic-list");
    if (ul.children.length >= 1) {
        ul.removeChild(ul.lastChild);
        console.log( id_fixation );
        --id_fixation;
    }
}

function reset() {
    clearInterval(started);
    timeStart = null;
    started = null,
    id_fixation = 1,
    timeStop = null,
    duration = 0,
    fixationTime = null,
    runing = false;

    var clearIdFixation = document.getElementById("dynamic-list");
    while (clearIdFixation .firstChild) {
        clearIdFixation .removeChild(clearIdFixation .firstChild);
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

    document.getElementById("display").innerHTML =
        (hour > 9 ? hour : "0" + hour) + ":" +
        (min > 9 ? min : "0" + min) + ":" +
        (sec > 9 ? sec : "0" + sec) + "." +
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
    console.log( currentTime - timeStart  );

    fixationTime = (hour + ':' + min + ':' + sec + ':' + ms);
    return fixationTime;
}

var timeStart = null,
    started = null,
    id_fixation = 1,
    timeStop = null,
    duration = 0,
    fixationTime = null,
    runing = false;

