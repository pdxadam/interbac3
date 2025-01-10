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
        return newClass;
    }
    static getDepartment(){
        return this.department;
    }
}