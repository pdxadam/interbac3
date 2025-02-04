import Offering from '@/obj/Offering.js';
export default class Course{
    courseID = -1;
    title = "asdf";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    offerings = [];
    department = null; 
    constructor(title, courseID = -1, department = "---"){
        this.title = title;
        this.department = department;
        this.courseID = courseID;
    }
    static FromJson(jCourse){
        let newCourse = new Course(jCourse.title);
        newCourse.term = jCourse.term;
        newCourse.period = jCourse.period;
        newCourse.year = jCourse.year;
        newCourse.sequence = jCourse.sequence;
        newCourse.department = jCourse.department;
        newCourse.courseID = jCourse.courseID;
        for (let o of jCourse.offerings){
            newCourse.offerings.push(Offering.fromJSON(o, newCourse));
        }
        return newCourse;
    }
    static getDepartment(){
        return this.department;
    }
    createOffering(teacherID, term, period){
        let o = new Offering(term, teacherID, period, this.title, this.courseID);
        this.offerings.push(o);
        return o;
    }
    removeOfferingByTeacher(teacherID){
        for (let i = 0; i < this.offerings.length; i++){
            if (this.offerings[i].teacherID = teacherID){
                this.offerings.splice(i,1);
            }
        }
    }
}