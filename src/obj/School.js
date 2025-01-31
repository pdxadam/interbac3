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
        jSchool = School.CheckVersion(jSchool);
        let newSchool = new School(jSchool.name, jSchool.terms, jSchool.periods);
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
            jSchool.version = 1.0;
        }
        //as data versions change, I'll write transformations below.
        //1.1 will look at courses in subjects as objects with the course id, the year, and the sequence built in.
        if (jSchool.version == 1.0){
            let parsedSchool = JSON.parse(jSchool);
            //loop through the programs
            for (let program of parsedSchool.programs){

                // for (let subject of parsedSchool.subjec){
                for (let sI = 0; sI < parsedSchool.subjects.length; sI++){
                    let subject = parsedSchool.subjects[sI]; //just to name it better.
                    let newSequence = [];
                    for (let i = 0; i < subject.courseSequence.length; i++){
                        let c = subject.courseSequence[i]; //just to name it something better
                        if (typeof(s) != 'object'){
                            for (let course of program.courses){
                                if (course.courseID == c){
                                    //we found the right class. 
                                    newSequence.push({courseID: c, year: course.year, sequence: course.sequence});
                                }
                            }
                        }

                    }
                    subject.courseSequence = newSequence;
                    console.log("testing results: ", subject.courseSequence);
                    
                }

            }
            jSchool = JSON.stringify()
            //loop through the subjects and the classes.
            //convert the courseIDs to courses with the default years and sequences (from the program classes)
            jSchool.version = 1.1;
        }
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