const fs = require("fs");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/students.json", "utf8", (err, rawStudentData) => {
      if (err || !rawStudentData) {
        reject("Unable to read students.json");
        return;
      }

      fs.readFile("./data/courses.json", "utf8", (err, rawCourseData) => {
        debugger;
        if (err || !rawCourseData) {
          reject("Unable to read courses.json");
          return;
        }

        const studentData = JSON.parse(rawStudentData);
        const courseData = JSON.parse(rawCourseData);

        dataCollection = new Data(studentData, courseData);
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      resolve(dataCollection.students);
    } else {
      reject("No students returned");
    }
  });
}
function addStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students) {
      dataCollection.students = [
        ...dataCollection.students,
        {
          ...studentData,
          studentNum: dataCollection.students.length + 1,
          TA: studentData.TA ? true : false,
          course: Number(studentData.course),
        },
      ];
      resolve();
    }
    reject();
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      const TAs = dataCollection.students.filter(
        (student) => student.TA === true
      );
      resolve(TAs);
    } else {
      reject("No TAs returned");
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.courses &&
      dataCollection.courses.length > 0
    ) {
      resolve(dataCollection.courses);
    } else {
      reject("No courses returned");
    }
  });
}
function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      resolve(
        dataCollection.students.filter((student) => student.course === course)
      );
    } else {
      reject("No students returned");
    }
  });
}
function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (
      dataCollection &&
      dataCollection.students &&
      dataCollection.students.length > 0
    ) {
      let student = dataCollection.students.find(
        (student) => student.studentNum === num
      );
      if (student) {
        resolve(student);
      } else {
        reject("student not found");
      }
    } else {
      reject("No students returned");
    }
  });
}
module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentByNum,
  addStudent,
  getStudentsByCourse,
};
