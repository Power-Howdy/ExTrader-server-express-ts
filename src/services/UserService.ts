import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/user.repository';
import { User } from '@src/entity/user.entity';
import UserDTO from '@src/dto/user.dto';


// **** Variables **** //




/**
 * Get all users.
 */
function getAll(): Promise<User[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(user: UserDTO): Promise<void> {  
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: UserDTO): Promise<void> {
  //TODO:: 
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  // TODO:: 
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
