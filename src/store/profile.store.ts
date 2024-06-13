import { atom } from "jotai";
interface TwitterUser {
  username: string;
  follower_count: number;
  following_count: number;
  rest_id: string;
  name: string;
  metadata: Record<string, any>;
  is_blue_verified: boolean;
  _constructor_name_: string;
}

interface UserEntity {
  id: string;
  created_at: string;
  twitter_user_id: string;
  twitter_user: TwitterUser;
  categories: any[];
  _constructor_name_: string;
}
export const atomProfile = atom<UserEntity | undefined>(undefined);
