import Classy from '@/obj/Classy.js';

export default class Subject{
    name = "_Subject Name_";
    classSequence = []; // now it should hold {courseID: __, year: __, seq: __}
    //TODO: handle the sequence of courses. 
    constructor(name){
        this.name = name;
    }
    
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        for(let c of jSubject.classSequence){
            newSubject.classSequence.push(c); // we want to change this to handle the idea that it should be an object with a potential override year and sequence
        }
        return newSubject;
    }
    hasClass(courseID){
        for(let c of classSequence){
            if (c.classID == courseID){
                return true;
            }
        }
        return false;
    }
    //TODO: adjust the class sequence to handle the year the class should be taken and the sequence it's taken in.
}