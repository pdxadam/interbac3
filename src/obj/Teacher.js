import Class from '@/obj/Class.js';

export default class Teacher{
    name = "mud";
    slots = [];
    constructor(name, terms, periods){
        this.name = name;
        for(let t = 0; t < terms; t++){
            this.slots.push([]);
            for(let p = 0; p < periods; p++){
                this.slots[t].push("---");
            }
        }
        console.log(this.slots);
    }
    static FromJson(jTeacher){
        let terms = 3;
        let periods = 5;
        try{

        
            terms = jTeacher.slots.length;
            if (terms > 0){
                periods = jTeacher.slots[0].length;
            }
        }
        catch{
            console.log("error with jTeacher");
            console.log(jTeacher);
            console.log("---");
            return new Teacher("Error getting teacher", 3, 5);

        }
       
        let newTeacher = new Teacher(jTeacher.name, terms, periods);
        for (var i1 = 0; i1 < terms; i1++){
            for (var i2 = 0; i2 < periods; i2++){
                if (typeof jTeacher.slots[i1][i2] == "object"){
                    newTeacher.slots[i1][i2] = Class.FromJson(jTeacher.slots[i1][i2]);
                }
                
            }

        }
        return newTeacher;
    }
}