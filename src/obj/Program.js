import Classy from '@/obj/Classy.js';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';

export default class Program{

    name="IB Program";
    classes = [];
    groups = [];
    teachers = []; //teachers taken from the school when the program is created.
    terms = 3;
    periods = 5;
    topTeacherID = 0;
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
    createTeacher(name){

        this.topTeacherID++;
        let newTeacher = new Teacher(name, 3, 5, this.topTeacherID);
        this.teachers.push(newTeacher);
        console.log(newTeacher);
        return newTeacher;

    }

}