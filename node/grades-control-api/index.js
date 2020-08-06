import express from 'express';

import router from './routes/students.js';

global.fileName = 'grades.json';

const app = express();
app.use(express.json());
app.use('/student', router);

app.listen(3000, () => {
  console.log('API started!');
});
