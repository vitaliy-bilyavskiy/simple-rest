
import { definition } from "koa-joi-swagger-ts";
import { BaseAPIResponseSchema } from "./baseAPI.response.schema";
import { UserSchema } from "./user.schema";

@definition("User Response", "User")
export class UserResponseSchema extends BaseAPIResponseSchema{
  public data = UserSchema;
}
