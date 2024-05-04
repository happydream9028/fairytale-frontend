export interface IUserAuth {
  user_id: number;
  role?: number;
  email: string;
  password_hash?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  enable_integrations?: boolean;
  enable_app_settings?: boolean;
  enable_feed_creation?: boolean;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  user_id: number;
  phone: string;
  enable_integrations: boolean;
  enable_app_settings: boolean;
  enable_feed_creation: boolean;
  is_active: boolean;
  role: IUserRole;
  user_group: IUserGroup;
}

export interface IUserRole {
  id: number;
  role_name: string;
}

export interface IUserGroup {
  group_id: number;
  group_name: string;
}

export interface ICreateUser {
  user_id: number;
  email: string;
  password: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  role: number;
  user_group: number;
  enable_integrations: boolean;
  enable_app_settings: boolean;
  enable_feed_creation: boolean;
}
