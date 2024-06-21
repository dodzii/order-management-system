import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrderHistory(userId: number): Promise<{
        orderId: bigint;
        orderDate: Date;
        status: string;
        userId: bigint;
        cartId: bigint;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }[] | "Error fetching order history">;
}
