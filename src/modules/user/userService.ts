import { StatusCodes } from "http-status-codes";

import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { User } from "@modules/user/userModel";
import { userRepository } from "@modules/user/userRepository";
import { logger } from "@src/server";

export const userService = {
  findAll: async (): Promise<ServiceResponse<User[] | null>> => {
    try {
      const users = await userRepository.findAllAsync();
      if (!users) {
        return new ServiceResponse(ResponseStatus.Failed, "No Users found", null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<User[]>(ResponseStatus.Success, "Users found", users, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
