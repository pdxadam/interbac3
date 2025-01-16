import Classy from '@/obj/Classy.js';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';
import Subject from '@/obj/Subject.js';

export default class Program{
    name="IB Program";
    classes = []; //actual class objects
    groups = []; // actual group objects
    teachers = []; //teachers taken from the school when the program is created.
    subjects = [];
    terms = 3;
    periods = 5;
    topTeacherID = 0;
    topCourseID = 0;
    topSubjectID = 0;
    constructor(name, teachers = [], terms = 3, periods = 5){
        this.name = name;
        this.terms = terms;
        this.periods = periods;
        for (let t of teachers){
            console.log(t.name);
            this.createTeacher(t.name);
        }
    }
    static FromJson(jProgram){
        let newProgram = new Program(jProgram.name);
        newProgram.topTeacherID = jProgram.topTeacherID;
        newProgram.topCourseID = jProgram.topCourseID;
        newProgram.topSubjectID = jProgram.topSubjectID;
        if ('classes' in jProgram){
            for (let c of jProgram.classes){
                let newClass = Classy.FromJson(c);
                if (newClass.courseID > this.topCourseID){
                    this.topCourseID = newClass.courseID;
                }
                newProgram.classes.push(newClass);
            }
        }
        if ('groups' in jProgram){
            for (let group of jProgram.groups){
                newProgram.groups.push(Group.FromJson(group));
            }
        }
        if ('subjects' in jProgram){
            console.log("---handling subjects---" + jProgram.name);
            console.log("starting topsubjectID = " + newProgram.topSubjectID);
            for (let subject of jProgram.subjects){
                let newSubject = Subject.FromJson(subject);
                console.log(newSubject.subjectID);
                if (newSubject.subjectID > newProgram.topSubjectID){
                    this.topSubjectID = newSubject.subjectID;
                }
                
                newProgram.subjects.push(newSubject);

            }
        }
        if ('teachers' in jProgram){
            for (let teacher of jProgram.teachers){
                let newTeacher = Teacher.FromJson(teacher);
                if (newTeacher.teacherID > newProgram.topTeacherID){
                    this.topTeacherID = newTeacher.teacherID;
                }
                newProgram.teachers.push(newTeacher);
            }
        }
        return newProgram;
    }
    createTeacher(name, department = "---"){

        this.topTeacherID++;
        let newTeacher = new Teacher(name, this.topTeacherID, department);
        newTeacher.teacherID = this.topTeacherID;
        this.teachers.push(newTeacher);
        return newTeacher;

    }
    createClass(title, department = "---"){
        this.topCourseID++;
        let newClass = new Classy(title, this.topCourseID, department);
        newClass.courseID = this.topCourseID;
        this.classes.unshift(newClass);
        return newClass;
    }
    createSubject(name){
        this.topSubjectID++;
        let newSubject = new Subject(name);
        newSubject.subjectID = this.topSubjectID;
        this.subjects.unshift(newSubject);
        return newSubject;
    }
    getSubjectById(subjectID){
        for (let s of this.subjects){
            if (s.subjectID == subjectID){
                return s;
            }
        }
        return null;
    }
    getClassById(classID){
        for (let c of this.classes){
            if (c.classID == classID){
                return c;
            }
        }
        return null;
    }
    getTeacherById(teacherID){
        for (let t of this.teachers){
            if (t.teacherID == teacherID){
                return t;
            }
        }
        return null;
    }
    deleteSubject(subjectID){
        for (var i = 0; i < this.subjects.length; i++){
            //delete from each group

            for (let group of this.groups){
                console.log(group.subjects);
                group.removeSubject(subjectID);
                console.log(group.subjects);
            } 
            //then from the program
            if (this.subjects[i].subjectID = subjectID){
                this.subjects.splice(i, 1);
            }
                  
         }
    }
    deleteTeacher(teacherID){
        //delete the course offerings based on this teacher
        for (let c of this.classes){
            c.removeOfferingByTeacher(teacherID);         
        }
        //delete the actual teacher
        for (let i = 0; i < this.teachers.length; i++){
            if (this.teachers[i].teacherID == teacherID){
                this.teachers.splice(i,1);
            }
        }
    }
    deleteClass(courseID){
        //remove the class from subjects
        for (let s of this.subjects){
            s.removeClass(courseID);
        }
        for (let i = 0; i < this.classes.length; i++){
            if (this.classes[i].courseID == courseID){
                this.classes.splice(i, 1);
            }
        }
    }

} //end class
