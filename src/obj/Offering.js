
export default class Offering{
    term = -1;
    teacherID = -1;
    period = -1
    courseTitle; //points to the class the offering is for
    courseID;
    constructor(term, teacherID, period, courseTitle, courseID){
        this.term = term;
        this.teacherID = teacherID;
        this.period = period;
        this.courseTitle = courseTitle;
        this.courseID = courseID;
    }

    static fromJSON(jOffering, course){
        let o = new Offering(jOffering.term, jOffering.teacherID, jOffering.period, course.title, jOffering.courseID);
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