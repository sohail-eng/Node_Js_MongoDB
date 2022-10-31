const express = require('express');

require('./database/DatabaseConfig')

const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require('./utilities/producer');
const { connectConsumer } = require('./utilities/consumer');
const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
// const databaseConfig = require('./database/DatabaseConfig');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/controller'))


app.use((req, res, next) => {

  next();
});

process.on('unhandledRejection', function (reason, promise) {
  console.log(promise);
});



app.listen(process.env.PORT || 4000, async () => {

  console.log('App started at port', process.env.PORT || 4000);
  await initProducer();

});