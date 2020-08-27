import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://cristianoalazaro:clazaro@cluster0.f1162.azure.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(console.log('Conectado com sucesso ao mongoDB!'))
  .catch((err) => {
    console.log('Erro ao conectar com o mongoDB: ' + err);
  });

//Criação do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

//Definindo o modelo da coleção
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
  name: 'Carlos Colioni',
  subject: 'Matemática',
  type: 'Trabalho Prático',
  value: 22,
})
  .save()
  .then(console.log('Documento inserido'))
  .catch((err) => console.log('Falha ao inserir o documnto: ' + err));
