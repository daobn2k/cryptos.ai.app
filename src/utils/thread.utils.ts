export interface IThread {
  blog_id?: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  messages: any[]; // Adjust the type of messages based on the actual data structure, e.g., Message[] if you have a Message interface
  name: string;
  updated_at: string;
  user_id: string;
}

export interface IMessageThread {
  content: string;
  created_at: string;
  id: string;
  images: string[];
  metadata: any;
  reply_id: string;
  resources: string[];
  type: "user" | "assistant" | string;
}
