import { faker } from '@faker-js/faker';
import db from '../config/connection.js';
import Models from '../models/index.js';
import Post from '../models/Post.js';
import bcrypt from 'bcryptjs';

const { User } = Models;

// Wait for DB connection then seed
db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});

    const userData = Array.from({ length: 5 }, () => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
      profileImgUrl: faker.image.avatar(),
      password: bcrypt.hashSync('test123', 10),
    }));

    console.log(faker.image.avatar());
    const createdUsers = await User.insertMany(userData);

    const postsData = createdUsers.flatMap(user =>
      Array.from({ length: 3 }, () => ({
        body: faker.lorem.sentence(),
        //username: user.username,
        user: user._id,

        createdAt: new Date().toISOString()
      }))
    );

    await Post.insertMany(postsData);

    console.log('Seeded users:', createdUsers.length);
    console.log('Seeded posts:', postsData.length);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    process.exit(0);
  }
});