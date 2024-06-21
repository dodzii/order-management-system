import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder(orderDto: OrderDto) {
        try{
            const cartTotalPrice = await this.prisma.cart.findFirst({
                where: {
                    cartId: orderDto.cartId
                },
                select: {
                    cartTotalPrice: true
                }
            });
            await this.prisma.order.create({
                data: {
                    userId: orderDto.userId,
                    cartId: orderDto.cartId,
                    status: orderDto.status,
                    totalPrice: cartTotalPrice.cartTotalPrice,
                }
            });
            return 'Order created successfully';
        }
        catch(e){
            return "Error creating order";
        }
    }

    async getOrder(orderId: number) {
        try{
            const order = await this.prisma.order.findFirst({
                where: {
                    orderId: orderId
                },
            });
            return order;
        }
        catch(e){
            return "Error fetching order";
        }
    }

    async updateOrderStatus(orderId: number, status: string) {
        try{
            await this.prisma.order.update({
                where: {
                    orderId: orderId
                },
                data: {
                    status: status
                }
            });
            return 'Order status updated successfully';
        }
        catch(e){
            return "Error updating order status";
        }
    }

    async applyCoupon(orderId: number, couponCode: string) {
        try{
            const order = await this.prisma.order.findFirst({
                where: {
                    orderId: orderId
                },
                select: {
                    totalPrice: true
                }
            });

            //hardcoded coupon code for now until implementing a coupon system
            if(couponCode === '10OFF'){
                await this.prisma.order.update({
                    where: {
                        orderId: orderId
                    },
                    data: {
                        totalPrice: Number(order.totalPrice)*0.9
                    }
                });
                return 'Coupon applied successfully';
            }
            else{
                return (couponCode === '10OFF');
            }
        }
        catch(e){
            return e.message;
        }
    }

    

}
