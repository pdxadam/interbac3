import Program from '@/obj/Program.js';
import Teacher from '@/obj/Teacher.js';

export default class School{
    name = "Riverdale High School";
    version = 1.0;
    programs = [];
    teachers = [];
    terms = 3;
    periods = 5;
    constructor(name, terms = 3, periods = 5, version){
        this.name = name;
        this.setTerms(terms);
        this.periods = periods;
        this.version = version;
    }
    static FromJson(jSchool){
        School.CheckVersion(jSchool);
        let newSchool = new School(jSchool.name, jSchool.terms, jSchool.periods, jSchool.version);
        
        for (let program of jSchool.programs){
            newSchool.programs.push(Program.FromJson(program));
        }
        for (let teacher of jSchool.teachers){
            newSchool.teachers.push(Teacher.FromJson(teacher));
        }
        return newSchool;
    }
    static CheckVersion(jSchool){
        //takes a parsed json object, checks the data version, and transforms it if necessary.
        
        //step 1: does the data have a version?
        if (!('version' in jSchool)){
            alert("updating data version");
            jSchool.version = 1.0;
        }
        //as data versions change, I'll write transformations below.
        if (jSchool.version == 1.0){
            //TODO: convert to 1.1: change all 'class' elements to course

        }

    }
    getBackup(){
        let jSchool = JSON.stringify(this, null, 2);
        return jSchool;
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