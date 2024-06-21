import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getOrderHistory(userId: number) {
        try{
            const orders = await this.prisma.order.findMany({
                where: {
                    userId: userId
                }
            });
            return orders;
        }
        catch(e){
            return "Error fetching order history";
        }
    }
}
