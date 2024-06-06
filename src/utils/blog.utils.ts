export interface MediaInfo {
  h: number;
  w: number;
  x: number;
  y: number;
}

export interface Media {
  media_url_https: string;
  original_info: {
    focus_rects: MediaInfo[];
    height: number;
    width: number;
  };
  type: string;
}

export interface TwitterUser {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  follower_count: number;
  following_count: number;
  rest_id: string;
  name: string;
  metadata: {
    description: string;
    image_url: string;
    banner_url: string;
    url: string;
  };
  is_blue_verified: boolean;
}

export interface Tweet {
  id: string;
  created_at: string;
  content: string;
  tweet_id: string;
  post_created: string;
  favorite_count: number;
  reply_count: number;
  retweet_count: number;
  views: number | null;
  media: Media[];
  twitter_user_id: string;
  cluster_id: string;
  twitter_user: TwitterUser;
  related_questions: string[];
  related_cn_questions: string[];
  title_cn: string;
  content_cn: string;
  description_cn: string;
}

export interface Cluster {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  content: string;
  description: string | null;
  tweets: Tweet[];
}

// Define the main object type
export interface Blog extends Tweet {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  content: string;
  description: string;
  cluster_id: string;
  image_url: string;
  views: number;
  total_saved: number;
  cluster: Cluster;
  is_saved: boolean;
  related_questions: string[];
  related_cn_questions: string[];
  title_cn: string;
  content_cn: string;
  description_cn: string;
  tweets: Tweet[];
  total_bull: number;
  total_bear: number;
  reaction?: 'BULL' | 'BEAR';
  total_shared: number;
  slug: string;
}
