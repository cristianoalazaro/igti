import express from 'express';
import { promises as fs } from 'fs';

const { writeFile, readFile } = fs;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find((a) => a.id === parseInt(req.params.id));
    res.send(grade);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    let grade = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    res.send(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const grade = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((a) => a.id === grade.id);
    console.log(index);

    if (index === -1) {
      throw new Error('Registro não encontrado!');
    }
    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter((a) => a.id !== parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    console.log(err);
  }
});

export default router;
