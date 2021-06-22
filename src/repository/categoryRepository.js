import PouchDB from 'pouchdb'
import {normalizeForId} from '@/utils/stringUtils'

let categoryRepository = new PouchDB('categories');

let createId = function(category){
    return normalizeForId("category_" + category.name) + new Date().getTime();
}

let createCategory = function (category){
    category._id = createId(category);
    return categoryRepository.put(category);
}

let saveCategory = function (category){
    return category._id ? categoryRepository.put(category) : createCategory(category);
}


export {createId, createCategory, saveCategory, categoryRepository};

