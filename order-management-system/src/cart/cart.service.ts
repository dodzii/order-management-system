import { Injectable } from '@nestjs/common';
import { CartDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}
    async addToCart(dto: CartDto) {
        try{
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: dto.cartId,
                    productId: dto.productId
                }
            });
            if(cartItem){
                const currentQuantity = cartItem.quantity;
                await this.prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: dto.cartId,
                            productId: dto.productId
                        }
                    },
                    data: {
                        quantity: dto.quantity
                    }
                });                
            }
            else{
                await this.prisma.cartItem.create({
                    data: {
                        cartId: dto.cartId,
                        productId: dto.productId,
                        quantity: dto.quantity
                    }
                });
            }

            //loop through cart items and calculate total price
            const cartItems = await this.prisma.cartItem.findMany({
                where: {
                    cartId: dto.cartId
                },
                include: {
                    product: {
                        select: {
                            price: true
                        }
                    }
                }
            });

            let total = 0;
            cartItems.forEach(item => {
                total += item.quantity * Number(item.product.price);
            });

            await this.prisma.cart.update({
                where: {
                    cartId: dto.cartId
                },
                data: {
                    cartTotalPrice: total
                }
            });

            return 'Item added to cart successfully';
        }
        catch(e){
            return e.message;
        }
        
    }

    async getUserCart(userId: number) {
        
        try{
            const cartItems = await this.prisma.cart.findFirst({
                where: {
                    userId: userId,
                },
                include: {
                    cartItems: {
                       select: {
                            quantity: true,
                            product: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            }
                        }
                    },
                },
            });

            
            return cartItems;
        }
        catch(e){
            return "Error fetching cart";
        }
        
    }

    async updateCart(dto: CartDto) {
        try{
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: dto.cartId,
                    productId: dto.productId
                }
            });
            if(cartItem){
                const currentQuantity = cartItem.quantity;
                await this.prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: dto.cartId,
                            productId: dto.productId
                        }
                    },
                    data: {
                        quantity: dto.quantity
                    }
                });
            }

            //loop through cart items and calculate total price
            const cartItems = await this.prisma.cartItem.findMany({
                where: {
                    cartId: dto.cartId
                },
                include: {
                    product: {
                        select: {
                            price: true
                        }
                    }
                }
            });

            let total = 0;
            cartItems.forEach(item => {
                total += item.quantity * Number(item.product.price);
            });

            await this.prisma.cart.update({
                where: {
                    cartId: dto.cartId
                },
                data: {
                    cartTotalPrice: total
                }
            });

            return 'Cart updated successfully';
        }
        catch(e){
            return "Error updating cart";
        }
    }

    async removeFromCart(dto: CartDto) {
        try{
            await this.prisma.cartItem.delete({
                where: {
                    cartId_productId: {
                        cartId: dto.cartId,
                        productId: dto.productId
                    }
                }
            });

            //loop through cart items and calculate total price
            const cartItems = await this.prisma.cartItem.findMany({
                where: {
                    cartId: dto.cartId
                },
                include: {
                    product: {
                        select: {
                            price: true
                        }
                    }
                }
            });

            let total = 0;
            cartItems.forEach(item => {
                total += item.quantity * Number(item.product.price);
            });

            await this.prisma.cart.update({
                where: {
                    cartId: dto.cartId
                },
                data: {
                    cartTotalPrice: total
                }
            });

            return "Item removed from cart";
        }
        catch(e){
            return "Error removing item from cart";
        }
    }
}
