import { OrderService } from './order.service';
import { OrderDto } from './dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
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
