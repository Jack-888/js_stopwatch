'use strict';

import './index.css'

import TimeStopwatch from './stopwatch';

const stopwatch = new TimeStopwatch;

const startPauseId = document.getElementById("startPause");
startPauseId.addEventListener('click', () => {
    stopwatch.startPauseStopwatch()
});

const resetId = document.getElementById("reset");
resetId.addEventListener('click', () => {
    stopwatch.reset()
});

const fixationId = document.getElementById("fixation");
fixationId.addEventListener('click', () => {
    stopwatch.fixation()
});

const clearId = document.getElementById("clear");
clearId.addEventListener('click', () => {
    stopwatch.clearFixation()
});