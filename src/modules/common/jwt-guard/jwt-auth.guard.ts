import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor( 
    private jwtAuthService: JwtAuthService
  ) {}

  /**
   * 
   * @param { ExecutionContext } context 
   * @returns { Promise<boolean> }
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      if( !req.headers.token ) {
        throw new UnauthorizedException("Your are not authorized to perform this operation.");
      }
      const decodedPayload = await this.jwtAuthService.verifyToken(req.headers.token);
      req.user = decodedPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Unable to authorize user.", error && error.message && { cause: error.message});
    }
  }
}