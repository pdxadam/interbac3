import Offering from '@/obj/Offering.js';
export default class Course{
    
    courseID = -1;
    title = "asdf";
    term = 0;
    period = -1;
    year = 11;
    sequence = -1;
    offerings = [];
    department = null; 
    lastAssignedOffering = -1;
    maxStudentCount = 24;
    constructor(title, courseID = -1, department = "---"){
        this.title = title;
        this.department = department;
        this.courseID = courseID;
    }
    static FromJson(jCourse){
        let newCourse = new Course(jCourse.title);
        newCourse.term = jCourse.term;
        newCourse.period = jCourse.period;
        newCourse.year = jCourse.year;
        newCourse.sequence = jCourse.sequence;
        newCourse.department = jCourse.department;
        newCourse.courseID = jCourse.courseID;
        for (let o of jCourse.offerings){
            newCourse.offerings.push(Offering.fromJSON(o, newCourse));
        }
        return newCourse;
    }
    static getDepartment(){
        return this.department;
    }
    createOffering(teacherID, term, period){
        let o = new Offering(term, teacherID, period, this.title, this.courseID);
        this.offerings.push(o);
        return o;
    }
    removeOfferingByTeacher(teacherID){
        for (let i = 0; i < this.offerings.length; i++){
            if (this.offerings[i].teacherID = teacherID){
                this.offerings.splice(i,1);
            }
        }
    }
    findAvailableOffering(student, program){
        //TODO: create a scheduling suggestions list on the program. 
        
        if (this.offerings.length == 0){
            console.log("No course offerings");
            program.addSchedulingNote("No offerings for " + this.title + "(cID: " + this.courseID + ")");
            return false; //there are no offerings to elicit
        }
        this.offerings.sort((a,b) => a.studentCount - b.studentCount);
        //wait, I don't want to do it by the last assigned offering. I want to sort it by the number of students
        //check if there is room in that offering
        let foundOffering = false;
        let tryCount = 0;
        let offerSlot = 0;
        let currNote = [];
        while (!foundOffering && offerSlot < this.offerings.length){
            //that is, while I haven't foujnd an offering, and I haven't tried them all
            
            if (this.offerings[offerSlot].studentCount < this.maxStudentCount){
                //this one works. Check it out from the student side
                let studentSlot = student.isOfferingVacant(this.offerings[offerSlot]);
                if(studentSlot == null){
                    foundOffering = true;
                    //so assign them bothways--no--we'll assign the student when we adopt the schedule
                    
                    student.assignOffering(this.offerings[offerSlot]);
                    return true;
                }
                else{
                    //there's been a collision.
                    let collision = program.getCourseByID(studentSlot);
                    currNote.push(this.title + "(CID:" + this.courseID + ") conflicts with " + collision.title + "(CID: " + collision.courseID + ")");

                }

                // if that works, assign the student to the offering and the offering to the student
                //todo: figure out what to do if there is a conflict. 
            }
            else{
                currNote.push(this.title + " is full. (CID: " + this.courseID + ")");
            }
            tryCount++;
            offerSlot++;


        }
       if (!foundOffering){
        //we should add our fialure notes
        for (let note of currNote){
            program.addSchedulingNote(note);
        }
       }
        return foundOffering;
        

    }
    assignStudent(term, period, studentID){
        for (let offering of this.offerings){
            if (offering.term == term && offering.period == period){
                offering.assignStudent(studentID);
                return true;
            }
        }
        console.log("Major issue: that offering doesn't exist for this course: ", this);
        return false;
    }
    clearStudents(studentList = null){
        for (let offering of this.offerings){
            if (studentList == null){
                //we want to clear the entre list
                offering.students = [];
            }
            else{
                for (let id of studentList){
                    //remove each of these students from that offering's list
                    const i = offering.students.indexOf(id);
                    if (i > -1){
                        offering.students.splice(i,1);
                    }
                }
            }
        }
    }
}