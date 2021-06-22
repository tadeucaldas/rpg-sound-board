import PouchDB from 'pouchdb'
import {normalizeForId} from '@/utils/stringUtils'

let adventureRepository = new PouchDB('adventures');

let createId = function(adventure){
    return normalizeForId("adventure_" + adventure.name) + new Date().getTime();
}

let createAdventure = function (adventure){
    adventure._id = createId(adventure);
    return adventureRepository.put(adventure);
}

let saveAdventure = function (adventure){
    return adventure._id ? adventureRepository.put(adventure) : createAdventure(adventure);
}


export {createId, createAdventure, saveAdventure, adventureRepository};

