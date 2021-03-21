let normalizeForId = function (value) {
    return value.replace(/[^A-Z0-9]/ig, "_");
}

let formatTime = function (secs) {
    secs = Math.round(secs);
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export { normalizeForId, formatTime };