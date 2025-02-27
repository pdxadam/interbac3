import Course from '@/obj/Course';
import Group from '@/obj/Group.js';
import Teacher from '@/obj/Teacher.js';
import Subject from '@/obj/Subject.js';
import Student from '@/obj/Student.js';

export default class Program{
    name="IB Program";
    courses = []; //actual class objects
    groups = []; // actual group objects
    teachers = []; //teachers taken from the school when the program is created.
    subjects = [];
    students = []; //array of student objects
    schedulingNotes = [];
    terms = 3;
    periods = 5;
    topTeacherID = 0;
    topCourseID = 0;
    topSubjectID = 0;
    topStudentID = 0;
    constructor(name, teachers = [], terms = 3, periods = 5){
        this.name = name;
        this.terms = terms;
        this.periods = periods;
        for (let t of teachers){
            console.log(t.name);
            this.createTeacher(t.name);
        }
    }
    static FromJson(jProgram){
        let newProgram = new Program(jProgram.name);
        newProgram.topTeacherID = jProgram.topTeacherID;
        newProgram.topCourseID = jProgram.topCourseID;
        newProgram.topSubjectID = jProgram.topSubjectID;
        if ('courses' in jProgram){
            for (let c of jProgram.courses){
                let newCourse = Course.FromJson(c);
                if (newCourse.courseID > newProgram.topCourseID){
                    newProgram.topCourseID = newCourse.courseID;
                
                }
                newProgram.courses.push(newCourse);
                console.log("The new top course ID is: ", newProgram.topCourseID);
            }
        }
        if ('groups' in jProgram){
            for (let group of jProgram.groups){
                newProgram.groups.push(Group.FromJson(group));
            }
        }
        if ('subjects' in jProgram){
            console.log("---handling subjects---" + jProgram.name);
            console.log("starting topsubjectID = " + newProgram.topSubjectID);
            for (let subject of jProgram.subjects){
                let newSubject = Subject.FromJson(subject);
                console.log(newSubject.subjectID);
                if (newSubject.subjectID > newProgram.topSubjectID){
                    newProgram.topSubjectID = newSubject.subjectID;
                }
                
                newProgram.subjects.push(newSubject);

            }
        }
        if ('students' in jProgram){
            console.log("--- handling students ---");
            for (let student of jProgram.students){
                let newStudent = Student.FromJson(student);
                if (newStudent.studentID > newProgram.topStudentID){
                    newProgram.topStudentID = newStudent.studentID;
                }
                newProgram.students.push(newStudent);
            }
        }
        if ('schedulingNotes' in jProgram){
            newProgram.schedulingNotes = jProgram.schedulingNotes;
        }
        console.log("done with subjects");
        if ('teachers' in jProgram){
            console.log("in teachers");
            for (let teacher of jProgram.teachers){
                let newTeacher = Teacher.FromJson(teacher);
                if (newTeacher.teacherID > newProgram.topTeacherID){
                    this.topTeacherID = newTeacher.teacherID;
                }
                newProgram.teachers.push(newTeacher);
            }
        }
        return newProgram;
    }
    createTeacher(name, department = "---"){

        this.topTeacherID++;
        let newTeacher = new Teacher(name, this.topTeacherID, department);
        newTeacher.teacherID = this.topTeacherID;
        this.teachers.push(newTeacher);
        return newTeacher;

    }

    createCourse(title, department = "---"){
        console.log("Creating Course ", this.topCourseID);
        this.topCourseID++;
        let newCourse = new Course(title, this.topCourseID, department);
        newCourse.courseID = this.topCourseID;
        this.courses.unshift(newCourse);
        return newCourse;
    }
    createSubject(name){
        this.topSubjectID++;
        let newSubject = new Subject(name);
        newSubject.subjectID = this.topSubjectID;
        this.subjects.unshift(newSubject);
        return newSubject;
    }
    getSubjectById(subjectID){
        console.log("Getting " + subjectID);
        
        for (let s of this.subjects){
            if (s.subjectID == subjectID){
                return s;
            }
        }
        return null;
    }
    getCourseByID(courseID){
        for (let c of this.courses){
            if (c.courseID == courseID){
                return c;
            }
        }
        return null;
    }
    getTeacherById(teacherID){
        for (let t of this.teachers){
            if (t.teacherID == teacherID){
                return t;
            }
        }
        return null;
    }
        deleteSubject(subjectID){
        for (var i = 0; i < this.subjects.length; i++){
            //delete from each group

            for (let group of this.groups){
                console.log(group.subjects);
                group.removeSubject(subjectID);
                console.log(group.subjects);
            } 
            //then from the program
            if (this.subjects[i].subjectID == subjectID){
                this.subjects.splice(i, 1);
            }
                  
         }
    }
    deleteTeacher(teacherID){
        //delete the course offerings based on this teacher
        for (let c of this.courses){
            c.removeOfferingByTeacher(teacherID);         
        }
        //delete the actual teacher
        for (let i = 0; i < this.teachers.length; i++){
            if (this.teachers[i].teacherID == teacherID){
                this.teachers.splice(i,1);
            }
        }
    }
    deleteCourse(courseID){
        //remove the class from subjects
        for (let s of this.subjects){
            s.removeCourse(courseID, true);
            s.removeCourse(courseID, false);
        }
        for (let i = 0; i < this.courses.length; i++){
            if (this.courses[i].courseID == courseID){
                this.courses.splice(i, 1);
            }
        }
    }
    createStudent(name, grade){
        //TODO: put barriers on grade
        let newStudent = new Student(name, grade, this.terms, this.periods);
        this.topStudentID++;
        newStudent.studentID = this.topStudentID;
        this.students.push(newStudent);
        return newStudent;
    }
    deleteStudent(student){
        //loop through students and remove this one.
        for (let i = 0; i < this.students.length; i++){
            if (this.students[i].studentID == student.studentID){
                this.students.splice(i, 1);
            }
        }
    }
    getStudentByID(id){
        for (let student in this.students){
            if (id == student.studentID){
                return student;
            }
        }
    }
    addSchedulingNote(newNote){
        if (!this.schedulingNotes.includes(newNote)){        
            this.schedulingNotes.push(newNote);
        }
    }

} //end class
