import { createApiResponse } from "@api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { handleServiceResponse } from "@common/utils/httpHandlers";
import { UserSchema } from "@modules/user/userModel";
import { userService } from "@modules/user/userService";
import { Request, Response, Router } from "express";
import { z } from "zod";

export const userRegistry = new OpenAPIRegistry();

userRegistry.register("User", UserSchema);

export const userRouter: Router = (() => {
  const router = Router();

  userRegistry.registerPath({
    method: "get",
    path: "/users",
    tags: ["User"],
    responses: createApiResponse(z.array(UserSchema), "Success"),
  });
  router.get("/", async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
