import axios from 'axios';

const API_URL = 'http://localhost:3001/grade';

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
];

async function getAllGrades() {
  const res = await axios.get(API_URL);
  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    };
  });

  let allStudents = new Set();
  grades.forEach((grade) => allStudents.add(grade.student));
  allStudents = Array.from(allStudents);

  let allSubjects = new Set();
  grades.forEach((grade) => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  let allGradeTypes = new Set();
  grades.forEach((gradeType) => {
    allGradeTypes.add(gradeType.type);
  });
  allGradeTypes = Array.from(allGradeTypes);

  const allCombinations = [];

  allStudents.forEach((student) => {
    allSubjects.forEach((subject) => {
      allGradeTypes.forEach((gradeType) => {
        allCombinations.push({
          student,
          subject,
          type: gradeType,
        });
      });
    });
  });

  allCombinations.forEach(({ student, subject, type }) => {
    const hasItem = grades.find((grade) => {
      grade.subject =
        subject && grade.student === student && grade.type === type;
    });
    if (!hasItem) {
      grades.push({
        id: grades.length + 1,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }
  });

  return allCombinations;
}

export { getAllGrades };
