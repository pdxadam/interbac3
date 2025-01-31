import Course from '@/obj/Course.js';

export default class Teacher{
    name = "mud";
    id = -1;
    department = "---";
    constructor(name, id=-2, department = "---"){
        this.name = name;
        this.id = id;
        this.department = department;
    }
    static FromJson(jTeacher){             
        let newTeacher = new Teacher(jTeacher.name, jTeacher.id, jTeacher.department);        
        return newTeacher;
    }
}