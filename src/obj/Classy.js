export default class Classy{
    title = "asdf";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    teacher = null;
    offerings = [];
    subject = null; //points to the subject it belongs to.
    constructor(title){
        this.title = title;
    }
    static FromJson(jClass){
        let newClass = new Classy(jClass.title);
        newClass.term = jClass.term;
        newClass.period = jClass.period;
        newClass.year = jClass.year;
        newClass.sequence = jClass.sequence;
        return newClass;
    }
    static getSubject(){
        return this.subject;
    }
}