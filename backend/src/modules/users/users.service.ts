import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  public constructor(private readonly jwtService: JwtService) {}

  public async login(email: string, password: string) {
    const user = await User;
  }
}
