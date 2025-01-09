export default class Class{
    title = "a class";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    Class(title){
        this.title = title;
    }
    static FromJson(jClass){
        let newClass = new Class(jClass.title);
        newClass.term = jClass.term;
        newClass.period = jClass.period;
        newClass.year = jClass.year;
        newClass.sequence = jClass.sequence;
        return newClass;
    }
}