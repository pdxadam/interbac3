export default class Student{
    studentID = -1;
    name = "student";
    grade = -1;
    requirements = [];  //list of course IDs this student needs to get scheduled for
    schedule = [];
    constructor(name, grade, terms = 3, periods = 5){
        this.name = name;
        this.grade = grade;
        for (let t = 0; t < terms; t++){
            this.schedule.push([]);
            for (let p = 0; p < periods; p++){
                this.schedule[t].push(null);
            }
        }
    }

    static FromJson(pStudent){
        let s = new Student(pStudent.name, pStudent.grade);
        s.studentID = pStudent.studentID;
        if (!('requirements' in pStudent) || pStudent.requirements == null){
            s.requirements = [];
        }
        else{
            s.requirements = pStudent.requirements;
        }
        if ('schedule' in pStudent){
            s.schedule = pStudent.schedule;
        }
        return s;
    }
    assignCourse(courseID){
        //adding a course requirement
        if (this.requirements.includes(courseID)){
            return false;

        }
        this.requirements.push(courseID);
        return true;
    }
    isOfferingVacant(offering){    
        return schedule[offering.term][offering.period] == null;
    }
    assignOffering(offering){
        schedule[offering.term][offering.period] = offering.courseID;
        //TODO: Test assigning schedules
        //maybe have the scheduling action be a function of the student
    }
}