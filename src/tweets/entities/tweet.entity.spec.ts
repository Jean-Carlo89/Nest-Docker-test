import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';
describe('Tweet tests', () => {
  let conn: mongoose.Connection;

  beforeEach(async () => {
    conn = await mongoose.createConnection(
      'mongodb://localhost:27027/tweets_test?authSource=admin', //* tellls name of database
    );

    await conn.dropDatabase();

    //console.log(conn.collection('tweets'));
  });

  afterEach(async () => {
    // if (conn.dropDatabase) {
    //   console.log(conn.);
    //   await conn.collection('tweets').drop();
    // }

    await conn.close();
  });

  it('Should create a tweet', () => {
    const tweet = new Tweet({
      content: 'Hello World',
      screen_name: 'Jean Carlo',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Jean Carlo');
  });
  it('Should create a tweet document', async () => {
    // const conn = await mongoose.connect(
    //   'mongodb://localhost:27027/tweets_test?authSource=admin',
    // );

    //'mongodb://root:root@localhost:27017/tweets_test',
    //'mongodb://localhost:27017/tweets_tes?authSource=admin',
    const Tweet_model = conn.model('Tweet', TweetSchema);

    const tweet = new Tweet_model({
      content: 'Testing save new tweet 2',
      screen_name: 'Sint',
    });

    await tweet.save();

    const tweetCreated = await Tweet_model.findById(tweet._id);
    console.log(tweetCreated);
    expect(tweetCreated.content).toBe('Testing save new tweet 2');
    expect(tweetCreated.screen_name).toBe('Sint');
  });
});
