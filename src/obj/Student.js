export default class Student{
    studentID = -1;
    name = "student";
    grade = -1;
    constructor(name, grade){
        this.name = name;
        this.grade = grade;

    }
    static FromJson(pStudent){
        let s = new Student(pStudent.name, pStudent.grade);
        s.studentID = pStudent.studentID;
        return s;
    }
}