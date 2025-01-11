import Classy from '@/obj/Classy.js';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';

export default class Program{
//TODO: Add course IDs and a 'createCourse' here on Program-- just like Teacher
    name="IB Program";
    classes = [];
    groups = [];
    teachers = []; //teachers taken from the school when the program is created.
    terms = 3;
    periods = 5;
    topTeacherID = 0;
    topCourseID = 0;
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

        for (let c of jProgram.classes){
            newProgram.classes.push(Classy.FromJson(c));
        }
        for (let group of jProgram.groups){
            newProgram.groups.push(Group.FromJson(group));
        }
        if ('teachers' in jProgram){
            for (let teacher of jProgram.teachers){
                newProgram.teachers.push(Teacher.FromJson(teacher));
            }
        }
        return newProgram;
    }
    createTeacher(name, department = "---"){

        this.topTeacherID++;
        let newTeacher = new Teacher(name, this.topTeacherID, department);
        this.teachers.push(newTeacher);
        return newTeacher;

    }
    createClass(title, department = "---"){
        this.topCourseID++;
        let newClass = new Classy(title, this.topCourseID, department);
        this.classes.unshift(newClass);
        return newClass;
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

}