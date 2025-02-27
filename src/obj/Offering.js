
export default class Offering{
    term = -1;
    teacherID = -1;
    period = -1
    courseTitle; //points to the class the offering is for
    courseID;
    students = [];//a list of student IDs assigned to this offering.
    maxStudentCount = 24;
    constructor(term, teacherID, period, courseTitle, courseID){
        this.term = term;
        this.teacherID = teacherID;
        this.period = period;
        this.courseTitle = courseTitle;
        this.courseID = courseID;
    }

    static fromJSON(jOffering, course){
        let o = new Offering(jOffering.term, jOffering.teacherID, jOffering.period, course.title, jOffering.courseID);
        if (jOffering.students == null){
            o.students = [];
        }
        else{
            o.students = jOffering.students;
        }
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
    assignStudent(studentID){
        if (this.students.includes(studentID)){
            //don't want duplicate students in the offering.
            return true;
        }

        this.students.push(studentID);
        
    }
    get studentCount(){
        return this.students.length;
    }
    
}