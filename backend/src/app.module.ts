import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: envValidationSchema,
      validationOptions: {
        libraryOptions: {
          abortEarly: true,
        },
      },
    }),

    PrismaModule,
  ],
})
export class AppModule {}