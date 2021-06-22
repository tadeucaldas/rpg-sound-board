import PouchDB from 'pouchdb'
import {normalizeForId} from '@/utils/stringUtils'

let categoryRepository = new PouchDB('categories');

let createId = function(scenary){
    return normalizeForId(scenary.adventure + "_scenary_" + scenary.name) + new Date().getTime();
}

let createCategory = function (scenary){
    scenary._id = createId(scenary);
    return categoryRepository.put(scenary);
}

let saveCategory = function (scenary){
    return scenary._id ? categoryRepository.put(scenary) : createCategory(scenary);
}


export {createId, createCategory, saveCategory, categoryRepository};

