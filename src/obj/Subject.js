import Course from '@/obj/Course.js';

export default class Subject{
    subjectID = -1;
    name = "_Subject Name_";
    courseSequence = []; // now it should hold courseIDs
    HL_CourseSequence = [];
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

        for(let c of jSubject.courseSequence){
            newSubject.courseSequence.push(c);
        }
        if ("HL_CourseSequence" in jSubject){
            for (let c of jSubject.HL_CourseSequence){
                newSubject.HL_CourseSequence.push(c);
            }
        }
        return newSubject;
        
    }
    removeCourse(courseID){
        for (let i = 0; i < this.courseSequence.length; i++){
            if (this.courseSequence[i] == courseID){
                this.courseSequence.splice(i, 1);
            }
        }
    }
    getFullTitle(){
        return this
    }
    
}