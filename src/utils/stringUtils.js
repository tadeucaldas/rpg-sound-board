let normalizeForId = function (value){
    return  value.replace(/[^A-Z0-9]/ig, "_");
}

export {normalizeForId};