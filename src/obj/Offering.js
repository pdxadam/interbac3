export default class Offering{
    term = -1;
    teacherID = -1;
    classy = null; //points to the class the offering is for
    constructor(term, teacherID){
        this.term = term;
        this.teacherID = teacherID;
    }
    offeringTitle(){
        if (this.classy == null){
            return "---";
        }
        else{
            return this.classy.title;
        }
    }
}