export type UserType<T> = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role_id: string;
  profile_picture?: T;
};
