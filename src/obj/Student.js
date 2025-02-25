export default class Student{
    studentID = -1;
    name = "student";
    grade = -1;
    requirements = [];  //list of course IDs this student needs to get scheduled for
    schedule = [];
    tempSchedule = [];
    schedulingLog = []; //list of objects including requiremntsList, schedule, and note at point of failure
    hasSchedule = false;

    constructor(name, grade, terms = 3, periods = 5){
        this.name = name;
        this.grade = grade;
        for (let t = 0; t < terms; t++){
            this.schedule.push([]);
            this.tempSchedule.push([]);
            for (let p = 0; p < periods; p++){
                this.schedule[t].push(null);
                this.tempSchedule[t].push(null);
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
        if ('schedulingLog' in pStudent){
            s.schedulingLog = pStudent.schedulingLog;
        }
        if ('hasSchedule' in pStudent){
            s.hasSchedule = pStudent.hasSchedule;
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
        return this.tempSchedule[offering.term - 1][offering.period -1] == null;
    }
    assignOffering(offering){
        this.tempSchedule[offering.term - 1][offering.period - 1] = offering.courseID;
        //TODO: Test assigning schedules
        //maybe have the scheduling action be a function of the student
    }
    adoptTempSchedule(program){
        this.hasSchedule = true;
        //it looks like we have a complete schedule. Let's make it our schedule and assign these students to those things
        this.schedule = JSON.parse(JSON.stringify(this.tempSchedule));
        //now loop through all the offerings we've taken and assign this student to them
        for (let t = 0; t < this.schedule.length; t++){
            for (let p = 0; p < this.schedule[t].length; p++){
                let c = this.schedule[t][p];
                if (c != null){
                    let course = program.getCourseByID(c);
                    course.assignStudent(t + 1, p + 1, this.studentID);
                }
            }

        }

    }
    clearSchedule(terms, periods, tempOnly = true){
        if (!tempOnly){
            console.log("clearing actual schedule");
            this.schedule = [];
            this.hasSchedule = false;
        }
        this.tempSchedule = [];
        for (let t = 0; t < terms; t++){
            if (!tempOnly){
                this.schedule.push([]);
            }
            this.tempSchedule.push([]);
            for (let p = 0; p < periods; p++){
                if (!tempOnly){
                    this.schedule[t].push(null);
                }
                this.tempSchedule[t].push(null);
            }
        }
    }
    randomizeRequirements(){
        let index = this.requirements.length,
        randomIndex;
    
      // While there remain elements to shuffle.
      while (index != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;
        let swap = this.requirements[index];
        this.requirements[index] = this.requirements[randomIndex];
        this.requirements[randomIndex] = swap;
     }   
    }

}