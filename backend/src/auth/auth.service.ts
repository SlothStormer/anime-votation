import { Injectable, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    await this.prisma.user.create({
      data: {
        username: createAuthDto.username,
        password: hashedPassword,
      },
    });

    return {
      access_token: await this.jwtService.signAsync({
        username: createAuthDto.username,
      }),
    };
  }

  @Post('login')
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: createAuthDto.username,
      },
    });

    if (!user) {
      return 'No user found';
    }

    const match = bcrypt.compare(createAuthDto.password, user.password);

    if (!match) {
      return 'Wrong password';
    }

    const token = await this.jwtService.signAsync({
      username: user.username,
    });

    return token;
  }
}
