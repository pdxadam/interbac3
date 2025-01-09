import Class from '@/obj/Class.js';

export default class Subject{
    name = "_Subject Name_";
    classSequence = [];
    //TODO: handle the sequence of courses. 
    constructor(name){
        this.name = name;
    }
    static FromJson(jSubject){
        let newSubject = new Subject(jSubject.name);
        for(let c of jSubject.classSequence){
            newSubject.classSequence.push(Class.FromJson(c));

        }
        return newSubject;
    }
    
}