import Class from '@/obj/Class.js';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';

export default class Program{
    name="IB Program";
    classes = [];
    groups = [];
    teachers = []; //teachers taken from the school when the program is created.
    constructor(name, teachers = []){
        this.name = name;
        this.teachers = teachers;
    }
    static FromJson(jProgram){
        let newProgram = new Program(jProgram.name);
        
        for (let c of jProgram.classes){
            newProgram.classes.push(Class.FromJson(c));
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

}