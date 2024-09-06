import { User } from './entities/user.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("GetAll")
  findAll():Promise<User[]>  {
    return this.usersService.findAll();
  }

  @Get('GetOne/:email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Post("Insert")
  @ApiBody({
    description:"Insert Data",
    type : String
  })
  create(@Body() userDTO: CreateUserDto) {
    return this.usersService.create(userDTO);
  }

  @Patch('Update/:email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete('delete/:email')
  remove(@Param('email') email: string) {
    debugger;
    return this.usersService.remove(email);
  }
}
