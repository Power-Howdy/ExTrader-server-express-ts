import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthService';

import { IReq, IRes } from './types/express/misc';

// **** Types **** //
interface ILoginReq {
  email: string;
  password: string;
}


// **** Functions **** //
/**
 * Login a user.
 */
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { email, password } = req.body;
  // Login
  const user = await AuthService.login(email, password);
  const userPayload = {
    id: user.id,
    email: user.email,
    name: user.firstName + " "+ user.lastName,
  };
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, userPayload);
  // Return
  return res.status(HttpStatusCodes.OK).json(userPayload);
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //
export default {
  login,
  logout,
} as const;
