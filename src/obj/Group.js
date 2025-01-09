import Subject from '@/obj/Subject.js';

export default class Group{
    name = "Subject Group";
    subjects = [];
    constructor(name){
        this.name = name;
    }
    static FromJson(jGroup){
        let newGroup = new Group(jGroup.name);
        for(let s of jGroup.subjects){
            newGroup.subjects.push(Subject.FromJson(s));
        }
        return newGroup;
    }
}