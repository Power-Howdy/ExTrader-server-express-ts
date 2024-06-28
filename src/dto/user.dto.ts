export default interface UserDTO  {
  firstName: string,
  lastName: string,
  email: string,
  password?: string
  pwdHash?: string
}