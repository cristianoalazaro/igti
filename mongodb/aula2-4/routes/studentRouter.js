import express from 'express';
import { studentModel } from '../models/studentModel.js';

const app = new express();

//CREATE
app.post('/student', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//RETRIEVE
app.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE - PUT OU PATCH
app.patch('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE
app.delete('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!student) {
      res.status(404).send('Documento não encontrado na coleção!');
    } else {
      res.send(200).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as studentRouter };
