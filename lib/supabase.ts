import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          avatar: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['authors']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['authors']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tags']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          author_id: string | null;
          category_id: string | null;
          published_at: string;
          updated_at: string;
          read_time: number;
          views: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['post_tags']['Row'], 'created_at'>;
        Update: never;
      };
    };
  };
}
