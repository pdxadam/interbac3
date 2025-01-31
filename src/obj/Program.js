import Course from '@/obj/Course.js';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';

export default class Program{
//TODO: Add course IDs and a 'createCourse' here on Program-- just like Teacher
    name="IB Program";
    courses = [];
    groups = [];
    teachers = []; //teachers taken from the school when the program is created.
    //TODO: should I move offerings here? 
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

        for (let c of jProgram.courses){
            newProgram.courses.push(Course.FromJson(c));
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
    createCourse(title, department = "---"){
        this.topCourseID++;
        let newCourse = new Course(title, this.topCourseID, department);
        this.courses.unshift(newCourse);
        return newCourse;
    }
    getCourseById(courseID){
        for (let c of this.courses){
            if (c.courseID == courseID){
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