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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(orderDto) {
        try {
            const cartTotalPrice = await this.prisma.cart.findFirst({
                where: {
                    cartId: orderDto.cartId
                },
                select: {
                    cartTotalPrice: true
                }
            });
            await this.prisma.order.create({
                data: {
                    userId: orderDto.userId,
                    cartId: orderDto.cartId,
                    status: orderDto.status,
                    totalPrice: cartTotalPrice.cartTotalPrice,
                }
            });
            return 'Order created successfully';
        }
        catch (e) {
            return "Error creating order";
        }
    }
    async getOrder(orderId) {
        try {
            const order = await this.prisma.order.findFirst({
                where: {
                    orderId: orderId
                },
            });
            return order;
        }
        catch (e) {
            return "Error fetching order";
        }
    }
    async updateOrderStatus(orderId, status) {
        try {
            await this.prisma.order.update({
                where: {
                    orderId: orderId
                },
                data: {
                    status: status
                }
            });
            return 'Order status updated successfully';
        }
        catch (e) {
            return "Error updating order status";
        }
    }
    async applyCoupon(orderId, couponCode) {
        try {
            const order = await this.prisma.order.findFirst({
                where: {
                    orderId: orderId
                },
                select: {
                    totalPrice: true
                }
            });
            if (couponCode === '10OFF') {
                await this.prisma.order.update({
                    where: {
                        orderId: orderId
                    },
                    data: {
                        totalPrice: Number(order.totalPrice) * 0.9
                    }
                });
                return 'Coupon applied successfully';
            }
            else {
                return (couponCode === '10OFF');
            }
        }
        catch (e) {
            return e.message;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map