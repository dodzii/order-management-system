import { CartDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(dto: CartDto): Promise<"Item added to cart successfully" | "Error adding item to cart">;
    getUserCart(userId: number): Promise<"Error fetching cart" | {
        total: number;
        cart: any[];
    }>;
    updateCart(dto: CartDto): Promise<string>;
    removeFromCart(dto: CartDto): Promise<"Item removed from cart" | "Error removing item from cart">;
}
