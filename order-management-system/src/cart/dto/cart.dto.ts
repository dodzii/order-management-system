import { IsNotEmpty } from "class-validator";

export class CartDto {

    cartId: number;
    productId: number;
    quantity: number;
    
}