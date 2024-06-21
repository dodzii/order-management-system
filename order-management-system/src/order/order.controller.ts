import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto';

@Controller('api/orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('')
    createOrder(@Body() orderDto: OrderDto){
        return this.orderService.createOrder(orderDto);
    }

    @Get(':orderId')
    getOrder(@Param('orderId') orderId: number){
        return this.orderService.getOrder(orderId);
    }

    @Put(':orderId/status')
    updateOrderStatus(@Param('orderId') orderId: number, @Body('status') status: string){
        return this.orderService.updateOrderStatus(orderId, status);
    }

    @Post('apply-coupon')
    applyCoupon(@Body('orderId') orderId: number, @Body('couponCode') couponCode: string){
        return this.orderService.applyCoupon(orderId, couponCode);
    }


}
