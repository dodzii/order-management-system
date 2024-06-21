import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(orderDto: OrderDto): Promise<"Order created successfully" | "Error creating order">;
    getOrder(orderId: number): Promise<{
        orderId: bigint;
        orderDate: Date;
        status: string;
        userId: bigint;
        cartId: bigint;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    } | "Error fetching order">;
    updateOrderStatus(orderId: number, status: string): Promise<"Order status updated successfully" | "Error updating order status">;
    applyCoupon(orderId: number, couponCode: string): Promise<any>;
}
