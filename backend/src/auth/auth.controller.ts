import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAccessTokenCookie(response: Response, token: string) {
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() createAuthDto: CreateAuthDto, @Res() response: Response) {
    const { username, password } = createAuthDto;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.authService.login(createAuthDto);

    this.setAccessTokenCookie(response, token);
    return response.status(200).json({
      message: 'User logged in successfully',
    });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    const { username, password } = createAuthDto;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { access_token } = await this.authService.register(createAuthDto);

    this.setAccessTokenCookie(response, access_token);
    return response.status(201).json({
      message: 'User registered successfully',
    });
  }
}
