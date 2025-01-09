import Program from '@/obj/Program.js';
import Teacher from '@/obj/Teacher.js';

export default class School{
    name = "Riverdale High School"
    programs = [];
    teachers = [];
    
     terms = 3;
     periods = 5;
    constructor(name, terms = 3, periods = 5){
        this.name = name;
        this.setTerms(terms);
        this.periods = periods;
    }
    static FromJson(jSchool){
        let newSchool = new School(jSchool.name, jSchool.terms, jSchool.periods);
        for (let program of jSchool.programs){
            newSchool.programs.push(Program.FromJson(program));
        }
        for (let teacher of jSchool.teachers){
            newSchool.teachers.push(Teacher.FromJson(teacher));
        }
        return newSchool;
    }
    setTerms(terms){
        if (terms > 0){
            this.terms = terms;
        }
    }
    getTerms(){
        return this.terms;
    }
    setPeriods(periods){
        if (periods > 0){
            this.periods = periods
        }
    }
    getPeriods(){
        return this.periods;
    }
}