const MongoClient = require('mongodb').MongoClient;

const uri =
  'mongodb+srv://cristianoalazaro:clazaro@cluster0.f1162.azure.mongodb.net/<dbname>?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db('grades').collection('student');

  const documents = await collection.find({ subject: 'História' }).toArray();
  console.log(documents);

  const databaseList = await client.db().admin().listDatabases();
  console.log('Databases:');

  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });

  client.close();
});
