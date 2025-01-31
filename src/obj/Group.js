import Subject from '@/obj/Subject.js';

export default class Group{
    name = "Subject Group";
    subjects = []; //this should now hold ids of the subjects.
    constructor(name){
        this.name = name;
    }
    static FromJson(jGroup){
        let newGroup = new Group(jGroup.name);
        for (let s of jGroup.subjects){

            newGroup.subjects.push(s);
        } //now we are expecting just an id
        // for(let s of jGroup.subjects){
        //     newGroup.subjects.push(Subject.FromJson(s));
        // }
        return newGroup;
    }
    removeSubject(subjectID){
        for (let i = 0; i < this.subjects.length; i++){
            if (this.subjects[i] == subjectID){
                this.subjects.splice(i, 1);
            }
        }
    }
    generateOptions(startList = [], program){
        console.log(this.name + " options are " + JSON.stringify(this.subjects));
        var newOptions = [];
        //first we build the array of our elements
 
        // for (var i = 0; i < newOptions.length; i++){
        //     for (let start of startList){
        //         newOptions[i] = newOptions[i].concat(start);
        //     }
        // }
        if (this.subjects.length == 0){
            return startList;
        }
        if (startList.length == 0){
            for (let s of this.subjects){
                let thisSubject = program.getSubjectById(s);
                if (thisSubject.offersSL){
                    startList.push([{"subjID":s, "HL":false}]);
                }
                if (thisSubject.offersHL){
                    startList.push([{"subjID":s, "HL":true}]);
                }
                
            }
            return startList;
        }
        for (var i = 0; i < startList.length; i++){
            for (var i2 = 0; i2 < this.subjects.length; i2++){
                let s = program.getSubjectById(this.subjects[i2]);
                if (s.offersSL){
                    newOptions.push(startList[i].concat({"subjID":this.subjects[i2], "HL":false}));
                }
                if (s.offersHL){
                    newOptions.push(startList[i].concat({"subjID":this.subjects[i2], "HL":true}));
                }
                
            }
        }
        return newOptions;
    }
}