import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BigIntInterceptor } from 'BigIntInterceptor';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, CartModule, OrderModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
  ],
})
export class AppModule {}
