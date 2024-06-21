import { CartDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(dto: CartDto): Promise<any>;
    getUserCart(userId: number): Promise<({
        cartItems: {
            quantity: number;
            product: {
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
        }[];
    } & {
        cartId: bigint;
        userId: bigint;
        cartTotalPrice: import("@prisma/client/runtime/library").Decimal;
    }) | "Error fetching cart">;
    updateCart(dto: CartDto): Promise<"Cart updated successfully" | "Error updating cart">;
    removeFromCart(dto: CartDto): Promise<"Item removed from cart" | "Error removing item from cart">;
}
