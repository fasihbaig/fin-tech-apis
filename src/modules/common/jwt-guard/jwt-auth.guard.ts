import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor( 
    private eventEmitter: EventEmitter2
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

      const payload = await this.eventEmitter.emitAsync('VERIFY_TOKEN', { token: req.headers.token});
      const decodedPayload = payload[0]
      req.user = decodedPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Unable to authorize user.", error && error.message && { cause: error.message});
    }
  }
}