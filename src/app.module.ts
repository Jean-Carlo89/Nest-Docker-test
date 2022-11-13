import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
//const uri = 'mongodb://localhost:27027/tweets_test?authSource=admin'; //* tellls name of database
const uri = 'mongodb://db/tweets_test?authSource=admin'; //* tellls name of database
@Module({
  imports: [MongooseModule.forRoot(uri), TweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
