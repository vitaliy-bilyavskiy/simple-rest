import * as Joi from 'joi';
import { definition } from 'koa-joi-swagger-ts';
import { BaseAPIResponseSchema } from './baseAPI.response.schema';
import { UserSchema } from './user.schema';

@definition('Users Response', 'Array of users')
export class UsersResponseSchema extends BaseAPIResponseSchema {
  public data = Joi.array()
    .items(UserSchema)
    .required();
}
export default {};
