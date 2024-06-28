import PwdUtil from '@src/util/PwdUtil';
import { User } from '@src/entity/user.entity';
import { AppDataSource } from '@src/data-source';
import UserDTO from '@src/dto/user.dto';

// **** Functions **** //
const userRepo = AppDataSource.getRepository(User);
/**
 * Get one user.
 */
async function getOne(email: string): Promise<User | null> { 
  return await userRepo.findOneBy({ email: email})
}


/**
 * Get all users.
 */
async function getAll(): Promise<User[]> {  
  return await userRepo.find();
}

/**
 * Add one user.
 */
async function add(user: UserDTO): Promise<void> {  
  userRepo.create(user);
  return;
}

/**
 * Update a user.
 */
async function update(user: User): Promise<void> {
  const userRec = await userRepo.findOneBy({id: user.id});
  if(userRec) {
    userRec.firstName = user.firstName;
    userRepo.update({id: user.id}, user);
    return;
  } else {
    console.log("User not found!")
    return;
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  //
}


// **** Export default **** //

export default {
  getOne,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
