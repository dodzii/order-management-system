import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BigIntInterceptor } from 'BigIntInterceptor';

@Module({
  imports: [PrismaModule, CartModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
  ],
})
export class AppModule {}
