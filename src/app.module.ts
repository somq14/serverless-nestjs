import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./configs/${process.env['ENV_NAME']}.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
