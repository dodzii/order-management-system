import { Body, Controller, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':userId/orders')
    getOrderHistory(@Param('userId') userId: number){
        return this.userService.getOrderHistory(userId);
    }


}
