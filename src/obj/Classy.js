import Offering from '@/obj/Offering.js';
export default class Classy{
    classID = -1;
    title = "asdf";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    teacher = null;
    offerings = [];
    department = null; 
    constructor(title, classID = -1, department = "---"){
        this.title = title;
        this.department = department;
        this.classID = classID;
    }
    static FromJson(jClass){
        let newClass = new Classy(jClass.title);
        newClass.term = jClass.term;
        newClass.period = jClass.period;
        newClass.year = jClass.year;
        newClass.sequence = jClass.sequence;
        newClass.department = jClass.department;
        newClass.classID = jClass.classID;
        for (let o of jClass.offerings){
            newClass.offerings.push(Offering.fromJSON(o, newClass));
        }
        return newClass;
    }
    static getDepartment(){
        return this.department;
    }
    createOffering(teacherID, term, period){
        let o = new Offering(term, teacherID, period, this.title, this.classID);
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