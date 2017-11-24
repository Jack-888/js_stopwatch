'use strict';

let timeStart = null,
    started = null,
    idFixationList = 1,
    timeStop = null,
    duration = 0,
    fixationTime = null;

const fixationListHtmlId = document.getElementById("fixation-list");
const displayHtmlId = document.getElementById("display");
const startPauseHtmlId = document.getElementById("startPause");

class TimeStopwatch {

    ////////////// Public methods //////////////

    startPauseStopwatch() {

        if (started === null) {
            startPauseHtmlId.value = "Pause";
            this._start();

        } else {
            startPauseHtmlId.value = "Start";
            this._pause();
        }
    }

    fixation() {
        if (timeStart === null) {
            return null;
        }

        if (idFixationList <= 5) {
            let li = document.createElement("li");
            li.setAttribute('id', idFixationList);
            li.appendChild(document.createTextNode(fixationTime));
            fixationListHtmlId.appendChild(li);
            ++idFixationList;
        } else {
            document.getElementById("5").innerHTML = fixationTime;
        }
    }

    reset() {
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
    }

    clearFixation() {
        if (fixationListHtmlId.children.length >= 1) {
            fixationListHtmlId.removeChild(fixationListHtmlId.lastChild);
            --idFixationList;
        }
    }

////////////// Private methods //////////////

    _start() {
        if (timeStart === null) {
            timeStart = new Date();
        }

        if (timeStop !== null) {
            duration += (new Date() - timeStop);
        }

        started = setInterval(this._clockRunning.bind(this), 10);
    }

    _pause() {
        timeStop = new Date();
        clearInterval(started);
        started = null;
    }

    _clockRunning() {
        let currentTime = new Date(),
            timePassed = new Date(currentTime - timeStart -  duration),

            hour = timePassed.getUTCHours(),
            min = timePassed.getUTCMinutes(),
            sec = timePassed.getUTCSeconds(),
            ms = timePassed.getUTCMilliseconds();

        fixationTime = this._htmlSendFormatting(hour, min, sec, ms);

        return fixationTime;
    }

    _htmlSendFormatting(hour, min, sec, ms) {
        return displayHtmlId.innerHTML =
            (hour > 9 ? hour : "0" + hour) + ":" +
            (min > 9 ? min : "0" + min) + ":" +
            (sec > 9 ? sec : "0" + sec) + "." +
            (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
    }

}

export default TimeStopwatch;
