import PouchDB from 'pouchdb'
import {normalizeForId} from '@/utils/stringUtils'

let characterRepository = new PouchDB('characters');
let characterSoundRepository = new PouchDB('characterSoundRepository');

let createId = function(character){
    return normalizeForId(character.adventure + "_character_" + character.name) + new Date().getTime();
}

let createCharacter = function (character){
    character._id = createId(character);
    return characterRepository.put(character);
}

let saveCharacter = function (character){
    return character._id ? characterRepository.put(character) : createCharacter(character);
}

let saveCharacterSound = function (charSound) {
    charSound._id = charSound.character + "_" + charSound.sound;
    return characterSoundRepository.put(charSound);
}

let removeCharacterSound = function (charSound) {
    return characterSoundRepository.remove(charSound);
}

export {createId, createCharacter, saveCharacter, characterRepository, saveCharacterSound, removeCharacterSound};

