import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IReq, IRes } from './types/express/misc';
import PwdUtil from '@src/util/PwdUtil';
import UserDTO from '@src/dto/user.dto';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<UserDTO>, res: IRes) {
  const user = req.body;
  if(user.password) {
    const pwdHash = await PwdUtil.getHash(user.password);
    try {
      await UserService.addOne({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        pwdHash: pwdHash,      
      });
      return res.status(HttpStatusCodes.CREATED).end();
    } catch (error) {
      console.log("User creation error: ", error);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message
      })
    }
    
  }
  
}

/**
 * Update one user.
 */
async function update(req: IReq<{user: UserDTO}>, res: IRes) {
  const { user } = req.body;
  await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
