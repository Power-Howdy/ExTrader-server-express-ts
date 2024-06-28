import UserRepo from '@src/repos/user.repository';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import RouteError from '@src/common/RouteError';

import { User } from '@src/entity/user.entity';
import { EMAIL_NOT_FOUND, UNAUTHORIZED } from '@src/common/ErrorMsgs';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: UNAUTHORIZED,
  EmailNotFound(email: string) {
    return EMAIL_NOT_FOUND + email;
  },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<User> {
  // Fetch user
  const user = await UserRepo.getOne(email);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.pwdHash ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  // Return
  return user;
}


// **** Export default **** //

export default {
  login,
} as const;
