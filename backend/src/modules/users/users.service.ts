/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./user";
import { compare, hash } from "bcrypt";
import { ResetPasswordDto } from "src/dtos/user.dto";
import { Op } from "sequelize";
import { generateToken } from "src/utils/generateToken";

@Injectable()
export class UsersService {
  public constructor(private readonly jwtService: JwtService) {}

  public async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.hash) {
      throw new BadRequestException("Invalid login or password");
    }

    const isPasswordValid = await compare(password, user.hash);
    if (!isPasswordValid) {
      throw new BadRequestException("Ivalid login or password");
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          userEmail: user.email,
          userName: user.name,
        },
      },
    };
  }

  public async register(email: string, password: string) {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestException("Email is already being used");
    }

    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    const newUser = await User.create({ email, hash: hashedPassword });

    const token = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });

    return {
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          userEmail: newUser.dataValues.email,
        },
      },
    };
  }

  public async changeName(id: number, name: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const userName = await User.update({ name: name }, { where: { id: id } });

    return {
      success: true,
      data: {
        userName,
      },
    };
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto, user: User) {
    const isPasswordValid = await compare(
      resetPasswordDto.oldPassword,
      user.hash,
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }

    await user.update({
      hash: await hash(resetPasswordDto.newPassword, 10),
    });

    return { success: true };
  }

  public generateTgToken(userId: number) {
    const token = generateToken(userId);
    return {
      success: true,
      data: {
        token,
      },
    };
  }

  public async tgCheck(email: string) {
    const user = await User.findOne({
      where: {
        email,
        telegram_id: { [Op.ne]: null },
      },
    });
    if (user) {
      return {
        success: true,
      };
    }
  }
}
