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
    static FromJson(pSchool){
        pSchool = School.CheckVersion(pSchool);
        let newSchool = new School(pSchool.name, pSchool.terms, pSchool.periods, pSchool.version);
        
        for (let program of pSchool.programs){
            newSchool.programs.push(Program.FromJson(program));
        }
        for (let teacher of pSchool.teachers){
            newSchool.teachers.push(Teacher.FromJson(teacher));
        }
        return newSchool;
    }
    static CheckVersion(pSchool){
        //takes a parsed json object, checks the data version, and transforms it if necessary.
        
       
        //step 1: does the data have a version?
        if (!('version' in pSchool) || pSchool.version < 1.0){
            console.log("Updating missing version to 1.0");
            
            pSchool.version = 1.0;
            console.log(pSchool);
        }
        //as data versions change, I'll write transformations below.
        if (pSchool.version == 1.0){
            console.log("Updated 1.0 to 1.1");
            pSchool.version = 1.1;
            //TODO: convert to 1.1: change all 'class' elements to course
            for (let p = 0; p < pSchool.programs.length; p++){
                //loop through the programs
                let program = pSchool.programs[p];
                //loop through the courses
                program.courses = program.classes;
                delete program.classes; // does this work? or are we killing both?
                program.topCourseID = program.topClassID;
                delete program.topClassID;
                for (let c= 0; c < program.courses.length; c++){
                    let course = program.courses[c];
                    course.courseID = course.classID;
                    delete course.classID;
                    for (let o = 0; o < course.offerings.length; o++){
                        //go through the offerings
                        let offering = course.offerings[o];
                        offering.courseTitle = offering.classTitle;
                        delete offering.classTitle;
                        offering.courseID = offering.classID;
                        delete offering.classID;
                    }
                }
                
                for (let s = 0; s < program.subjects.length; s++){
                    let subject = program.subjects[s];
                    subject.courseSequence = subject.classSequence;
                    delete subject.classSequence;
                    subject.HL_CourseSequence = subject.HL_ClassSequence;
                    delete subject.HL_ClassSequence;
                }
            }//end loop through programs
            
        }//end check for version 1.0;
        //TODO: Version 1.1 will convert data from subject courses just being ids to them being ojbects

        return pSchool;
    }//end checkVersion function
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