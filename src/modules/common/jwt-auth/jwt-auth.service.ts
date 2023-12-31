import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, Scope } from "@nestjs/common";
import { JWT_PAYLOAD } from "./types";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable({scope: Scope.DEFAULT})
export class JwtAuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    /**
     * 
     * @param { JWT_PAYLOAD } payload 
     * @returns { Promise<string> }
     */
    public async createNewToken(payload: JWT_PAYLOAD): Promise<string> {
        try {
            const token = await this.jwtService.signAsync(payload, { 
                secret: this.configService.get<string>("JWT_SECRET"),
            });
            return token;
        } catch (error) {
            throw new Error("Unable to create token")
        }
    }

    /**
     * 
     * @param { string } token 
     * @returns { Promise<JWT_PAYLOAD> }
     */
    public async verifyToken(token: string): Promise<JWT_PAYLOAD> {
       return this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("JWT_SECRET")})
    }

    @OnEvent('VERIFY_TOKEN')
    public async subscribeVerifyJwtToken(payload: {token: string}) {
      return this.verifyToken(payload.token);
    }
}