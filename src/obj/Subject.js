import Classy from '@/obj/Classy.js';

export default class Subject{
    subjectID = -1;
    name = "_Subject Name_";
    isHighLevel = false;
    classSequence = []; // now it should hold courseIDs
    //TODO: handle the sequence of courses. 
    constructor(name){
        this.name = name;
    }
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        newSubject.subjectID = jSubject.subjectID;
        newSubject.isHighLevel = jSubject.isHighLevel;
        for(let c of jSubject.classSequence){
            newSubject.classSequence.push(c);
        }
        return newSubject;
    }
    removeClass(courseID){
        for (let i = 0; i < this.classSequence.length; i++){
            if (this.classSequence[i] == courseID){
                this.classSequence.splice(i, 1);
            }
        }
    }
    
}