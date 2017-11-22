function TimeStopwatch() {
    var timeStart = null,
        started = null,
        idFixationList = 1,
        timeStop = null,
        duration = 0,
        fixationTime = null,

        fixationListHtmlId = document.getElementById("fixation-list"),
        displayHtmlId = document.getElementById("display"),
        startPauseHtmlId = document.getElementById("startPause");

////////////// Public methods //////////////

    this.startPauseStopwatch = function () {
        if (started === null) {
            startPauseHtmlId.value = "Pause";
            start();

        } else {
            startPauseHtmlId.value = "Start";
            pause();
        }
    };

    this.fixation = function () {
        if (timeStart === null) {
            return null;
        }

        if (idFixationList <= 5) {
            var li = document.createElement("li");
            li.setAttribute('id', idFixationList);
            li.appendChild(document.createTextNode(fixationTime));
            fixationListHtmlId.appendChild(li);
            ++idFixationList;
        } else {
            document.getElementById("5").innerHTML = fixationTime;
        }
    };

    this.reset = function () {
        clearInterval(started);
        timeStart = null;
        started = null;
        idFixationList = 1;
        timeStop = null;
        duration = 0;
        fixationTime = null;

        while (fixationListHtmlId.firstChild) {
            fixationListHtmlId.removeChild(fixationListHtmlId.firstChild);
        }

        startPauseHtmlId.value = "Start";
        displayHtmlId.innerHTML = "00:00:00.000";
    };

    this.clearFixation = function (){
        if (fixationListHtmlId.children.length >= 1) {
            fixationListHtmlId.removeChild(fixationListHtmlId.lastChild);
            --idFixationList;
        }
    };

////////////// Private methods //////////////

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
        return displayHtmlId.innerHTML =
            (hour > 9 ? hour : "0" + hour) + ":" +
            (min > 9 ? min : "0" + min) + ":" +
            (sec > 9 ? sec : "0" + sec) + "." +
            (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
    }
}

var stopwatch = new TimeStopwatch();

var startPauseId = document.getElementById("startPause");
startPauseId.addEventListener('click', stopwatch.startPauseStopwatch);

var resetId = document.getElementById("reset");
resetId.addEventListener('click', stopwatch.reset);

var fixationId = document.getElementById("fixation");
fixationId.addEventListener('click', stopwatch.fixation);

var clearId = document.getElementById("clear");
clearId.addEventListener('click', stopwatch.clearFixation);