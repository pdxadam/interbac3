import Offering from '@/obj/Offering.js';
export default class Classy{
    title = "asdf";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    teacher = null;
    offerings = [];
    department = null; 
    constructor(title){
        this.title = title;
    }
    static FromJson(jClass){
        let newClass = new Classy(jClass.title);
        newClass.term = jClass.term;
        newClass.period = jClass.period;
        newClass.year = jClass.year;
        newClass.sequence = jClass.sequence;
        newClass.department = jClass.department;
        for (let o of jClass.offerings){
            newClass.offerings.push(Offering.fromJSON(o, newClass));
        }
        return newClass;
    }
    static getDepartment(){
        return this.department;
    }
    createOffering(teacherID, term, period){
        let o = new Offering(term, teacherID, period, this.title);
        this.offerings.push(o);
        return o;
    }
}