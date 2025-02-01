import Course from '@/obj/Course.js';
//TODO: keep the sequences sorted by sequence
export default class Subject{
    subjectID = -1;
    name = "_Subject Name_";
    courseSequence = []; // now it should hold {{ id: , year: , sequence: }}
    HL_CourseSequence = []; // now it should hold {{ id: , year: , sequence: 
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
    removeCourse(courseID, isHL = false){
        let targetSequence = this.courseSequence;
        if (isHL){
            targetSequence = this.HL_CourseSequence;
        }
        for (let i = 0; i < this.targetSequence.length; i++){
            if (this.targetSequence[i] == courseID){
                this.targgetSequence.splice(i, 1);
            }
        }
    }
    addCourse(courseID, year, sequence, isHL){
        //returns true if success, false if failure
        if (this.containsCourse(courseID, isHL)){
            return false;
        }
        //first check if the course is in it already
        let newCourse = {
            courseID: courseID,
            year: year, 
            sequence: sequence
        };
        if (isHL){
            this.HL_CourseSequence.push(newCourse);
        }
        else{
            this.courseSequence.push(newCourse);
        }
        return true;
    }
    containsCourse(courseID, isHL = false){
        let targetSeq = isHL?this.HL_CourseSequence:this.courseSequence;
        for (let requirement of targetSeq){
            if (requirement.courseID == courseID){
                return true;
            }
        }
        return false;
    }
    getFullTitle(){
        return this
    }
    
}