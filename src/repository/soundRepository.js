import PouchDB from 'pouchdb'
import { normalizeForId } from '@/utils/stringUtils'
PouchDB.plugin(require('pouchdb-find'));

let soundRepository = new PouchDB('sounds');

let createId = function (sound) {
    return normalizeForId(sound.category + "_sound_" + sound.name) + new Date().getTime();
}

let createSound = function (sound) {
    sound._id = createId(sound);
    return soundRepository.put(sound);
}

let saveSound = function (sound) {
    return sound._id ? soundRepository.put(sound) : createSound(sound);
}

let saveSounds = function(sounds){
    return soundRepository.bulkDocs(sounds);
}

let soundTypes = [
    { id: "effect", color: "purple", icon: "fa fa-waveform-path" },
    { id: "ambience", color: "blue", icon: "fa fa-podcast" },
    { id: "music", color: "green", icon: "fa fa-music" },
];

export { createId, createSound, saveSound, saveSounds, soundRepository, soundTypes };

