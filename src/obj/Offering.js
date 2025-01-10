
export default class Offering{
    term = -1;
    teacherID = -1;
    period = -1
    courseTitle; //points to the class the offering is for
    constructor(term, teacherID, period, courseTitle){
        this.term = term;
        this.teacherID = teacherID;
        this.period = period;
        this.courseTitle = courseTitle;
    }
    static fromJSON(jOffering, classy){
        let o = new Offering(jOffering.term, jOffering.teacherID, jOffering.period, classy.title)
        return o;
    }
    getTitle(){
        if (this.courseTitle == null){
            return "---";
        }
        else{
            return this.courseTitle;
        }
    }
    
}