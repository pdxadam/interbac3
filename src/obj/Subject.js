import Classy from '@/obj/Classy.js';

export default class Subject{
    name = "_Subject Name_";
    classSequence = []; // now it should hold courseIDs
    //TODO: handle the sequence of courses. 
    constructor(name){
        this.name = name;
    }
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        for(let c of jSubject.classSequence){
            newSubject.classSequence.push(c);
        }
        return newSubject;
    }
    
}