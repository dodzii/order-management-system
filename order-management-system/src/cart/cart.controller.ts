import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto';

@Controller('api/cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Post('add')
    addToCart(@Body() dto: CartDto){
        return this.cartService.addToCart(dto);
    }

    @Get(':userId')
    getUserCart(@Param('userId') userId: number){
        return this.cartService.getUserCart(userId);
    }

    @Put('update')
    updateCart(@Body() dto: CartDto){
        return this.cartService.updateCart(dto);
    }

    @Delete('remove')
    removeFromCart(@Body() dto: CartDto){
        return this.cartService.removeFromCart(dto);
    }

}
