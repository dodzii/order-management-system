import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getOrderHistory(userId: number): Promise<{
        orderId: bigint;
        orderDate: Date;
        status: string;
        userId: bigint;
        cartId: bigint;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }[] | "Error fetching order history">;
}
