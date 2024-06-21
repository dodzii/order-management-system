import { CartService } from './cart.service';
import { CartDto } from './dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addToCart(dto: CartDto): Promise<"Item added to cart successfully" | "Error adding item to cart">;
    getUserCart(userId: number): Promise<"Error fetching cart" | {
        total: number;
        cart: any[];
    }>;
    updateCart(dto: CartDto): Promise<string>;
    removeFromCart(dto: CartDto): Promise<"Item removed from cart" | "Error removing item from cart">;
}
