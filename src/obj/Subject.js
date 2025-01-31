import Course from '@/obj/Course.js';

export default class Subject{
    name = "_Subject Name_";
    courseSequence = []; // now it should hold {courseID: __, year: __, seq: __}
    //TODO: handle the sequence of courses. 
    constructor(name){
        this.name = name;
    }
    
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        for(let c of jSubject.courseSequence){
            newSubject.courseSequence.push(c); // we want to change this to handle the idea that it should be an object with a potential override year and sequence
        }
        return newSubject;
    }
    hasCourse(courseID){
        for(let c of courseSequence){
            if (c.courseID == courseID){
                return true;
            }
        }
        return false;
    }
    //TODO: refactor all terms 'class' to 'course'.  courseID, courseSequence....class Course...
}