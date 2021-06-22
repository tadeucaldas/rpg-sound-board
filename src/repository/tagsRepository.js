import PouchDB from 'pouchdb'
import {normalizeForId} from '@/utils/stringUtils'

let tagRepository = new PouchDB('tags');

let createId = function(tag){
    return normalizeForId("tag_" + tag.name) + new Date().getTime();
}

let createTag = function (tag){
    tag._id = createId(tag);
    return tagRepository.put(tag);
}

export {createId, createTag, tagRepository};

