import Classy from '@/obj/Classy.js';

export default class Subject{
    subjectID = -1;
    name = "_Subject Name_";
    classSequence = []; // now it should hold courseIDs
    HL_ClassSequence = [];
    offersHL = true;
    offersSL = true;
    constructor(name){
        this.name = name;
    }
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        newSubject.subjectID = jSubject.subjectID;
        newSubject.offersHL = jSubject.offersHL;
        newSubject.offersSL = jSubject.offersSL;

        for(let c of jSubject.classSequence){
            newSubject.classSequence.push(c);
        }
        if ("HL_ClassSequence" in jSubject){
            for (let c of jSubject.HL_ClassSequence){
                newSubject.HL_ClassSequence.push(c);
            }
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