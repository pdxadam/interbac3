export default class Teacher{
    name = "mud";
    slots = [];
    constructor(name, terms, periods){
        this.name = name;
        for(let t = 0; t < terms; t++){
            this.slots.push([]);
            for(let p = 0; p < periods; p++){
                this.slots[t].push("empty");
            }
        }
        console.log(this.slots);
    }
}