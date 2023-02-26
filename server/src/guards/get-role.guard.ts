import { UserRole } from './../types/user.types';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
} from '@nestjs/common';

const RoleGuard = (role: UserRole): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      try {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return user.role.includes(role);
      } catch (e) {
        throw new ForbiddenException('Only admin can do this request');
      }
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
