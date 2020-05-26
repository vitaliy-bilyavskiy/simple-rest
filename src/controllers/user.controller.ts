import { Context } from 'koa';
import {
  controller,
  description,
  ENUM_PARAM_IN,
  get,
  parameter,
  post,
  put,
  response,
  summary,
  tag,
} from 'koa-joi-swagger-ts';
import { BaseController } from './base.controller';
import { BaseAPIResponseSchema } from './schemas/baseAPI.response.schema';
import {
  getAllUsers, insertUser, updateUser, getUserById,
} from '../services/user.service';
import { UsersResponseSchema } from './schemas/users.response.schema';
import { UsersRequestSchema } from './schemas/users.request.schema';
import { UserResponseSchema } from './schemas/user.response.schema';
import { UserIdSchema } from './schemas/user.schema';

@controller('/users')
export abstract class UserController extends BaseController {
  @tag('User')
  @get('/')
  @response(200, { $ref: UsersResponseSchema })
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @description('Returns list of all users')
  @summary('Get all users')
  public async getAllUsers(ctx: Context): Promise<void> {
    const serviceResult = await getAllUsers();
    if (serviceResult) {
      ctx.body = serviceResult;
      ctx.status = 200;
      ctx.statusMessage = null;
    }
  }

  @tag('User')
  @get('/{userId}')
  @parameter('userId', UserIdSchema, ENUM_PARAM_IN.path)
  @response(200, { $ref: UserResponseSchema })
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @description('Return user')
  @summary('Get user')
  public async getUser(ctx: Context): Promise<void> {
    const { userId } = ctx.params;
    const serviceResult = await getUserById(userId);
    if (serviceResult) {
      ctx.body = serviceResult;
      ctx.status = 200;
      ctx.statusMessage = null;
    }
  }

  @tag('User')
  @post('/')
  @parameter('body', { $ref: UsersRequestSchema }, ENUM_PARAM_IN.body)
  @response(200, { $ref: BaseAPIResponseSchema })
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @description('Update user data')
  @summary('Update user data')
  public async updateUser(ctx: Context): Promise<void> {
    const serviceResult = await updateUser(ctx.request.body.data);
    if (serviceResult) {
      ctx.status = 200;
      ctx.statusMessage = null;
    } else {
      ctx.status = 400;
      ctx.statusMessage = 'User not found!';
    }
  }

  @tag('User')
  @put('/')
  @parameter('body', { $ref: UsersRequestSchema }, ENUM_PARAM_IN.body)
  @response(200, { $ref: BaseAPIResponseSchema })
  @response(400, { $ref: BaseAPIResponseSchema })
  @response(500, { $ref: BaseAPIResponseSchema })
  @description('Insert new user')
  @summary('Insert new user')
  public async insertUser(ctx: Context): Promise<void> {
    const serviceResult = await insertUser(ctx.request.body.data);
    if (serviceResult) {
      ctx.status = 200;
      ctx.statusMessage = null;
    }
  }
}

export default {};
