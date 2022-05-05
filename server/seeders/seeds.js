const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});

  const userData = [];

  //Create Users
  for (let i = 0; i < 5; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();

      userData.push({username, email});
  }
  await User.insertMany(userData);

  

  console.log('all done!');
  process.exit(0);
});