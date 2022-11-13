import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri = 'mongodb://localhost:27027/tweets_test?authSource=admin'; //* tellls name of database

    // conn = await mongoose.createConnection(
    //   'mongodb://localhost:27027/tweets_test?authSource=admin', //* tellls name of database
    // );
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a tweets', async () => {
    const tweet = await service.create({
      content: 'Service test',
      screen_name: 'Name test',
    });

    expect(tweet.content).toBe('Service test');
    expect(tweet.screen_name).toBe('Name test');
  });
});
