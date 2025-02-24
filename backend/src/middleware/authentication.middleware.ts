import { IncomingHttpHeaders } from "http";

import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

import { User } from "src/modules/users/user";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  public constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeaders(headers: IncomingHttpHeaders) {
    const [type, token] = headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeaders(req.headers);
      if (!token) {
        throw new Error("Missing or invalid token");
      }

      const jwtPayload: {
        id: number;
        email: string;
      } = await this.jwtService.verify(token);
      const user = await User.findByPk(jwtPayload.id);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req as unknown as any).user = user;
    } catch (err) {
      this.logger.log(err);
    }

    next();
  }
}
