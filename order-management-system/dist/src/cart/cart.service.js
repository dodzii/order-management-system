"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(dto) {
        try {
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: dto.cartId,
                    productId: dto.productId
                }
            });
            if (cartItem) {
                const currentQuantity = cartItem.quantity;
                await this.prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: dto.cartId,
                            productId: dto.productId
                        }
                    },
                    data: {
                        quantity: currentQuantity + dto.quantity
                    }
                });
            }
            else {
                await this.prisma.cartItem.create({
                    data: {
                        cartId: dto.cartId,
                        productId: dto.productId,
                        quantity: dto.quantity
                    }
                });
            }
            return 'Item added to cart successfully';
        }
        catch (e) {
            return "Error adding item to cart";
        }
    }
    async getUserCart(userId) {
        try {
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
            let total = 0;
            let cart = [];
            cartItems.cartItems.forEach(item => {
                total += item.quantity * Number(item.product.price);
                cart.push({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                });
            });
            return {
                total,
                cart
            };
        }
        catch (e) {
            return "Error fetching cart";
        }
    }
    async updateCart(dto) {
        try {
            const cartItem = await this.prisma.cartItem.findFirst({
                where: {
                    cartId: dto.cartId,
                    productId: dto.productId
                }
            });
            if (cartItem) {
                const currentQuantity = cartItem.quantity;
                await this.prisma.cartItem.update({
                    where: {
                        cartId_productId: {
                            cartId: dto.cartId,
                            productId: dto.productId
                        }
                    },
                    data: {
                        quantity: currentQuantity + dto.quantity
                    }
                });
            }
        }
        catch (e) {
            return "Error updating cart";
        }
    }
    async removeFromCart(dto) {
        try {
            await this.prisma.cartItem.delete({
                where: {
                    cartId_productId: {
                        cartId: dto.cartId,
                        productId: dto.productId
                    }
                }
            });
            return "Item removed from cart";
        }
        catch (e) {
            return "Error removing item from cart";
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map