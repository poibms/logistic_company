import { UserRole } from './../types/user.types';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

const RoleGuard = (role: UserRole): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
