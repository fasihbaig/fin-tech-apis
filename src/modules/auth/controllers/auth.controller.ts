import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  create(@Body("username") username: string, @Body("password") password: string ) {
    return this.authService.login(username, password);
  }


}
