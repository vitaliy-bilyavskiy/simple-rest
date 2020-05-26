import { definition } from 'koa-joi-swagger-ts';
import { UserSchema } from './user.schema';

@definition('Users Request', 'User data')
export class UsersRequestSchema {
  public data = UserSchema.required();
}
export default {};
