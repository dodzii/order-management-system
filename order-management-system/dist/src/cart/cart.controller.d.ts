import { CartService } from './cart.service';
import { CartDto } from './dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addToCart(dto: CartDto): Promise<any>;
    getUserCart(userId: number): Promise<"Error fetching cart" | ({
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
    })>;
    updateCart(dto: CartDto): Promise<"Cart updated successfully" | "Error updating cart">;
    removeFromCart(dto: CartDto): Promise<"Item removed from cart" | "Error removing item from cart">;
}
