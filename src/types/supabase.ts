export interface News {
    id: string; // UUID do Supabase
    title: string;
    content: string;
    excerpt: string;
    category: string;
    image_url: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;

  }
  
  export interface Recipe {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    preparation_time: string;
    calories: string;
    ingredients: string[];
    instructions: string[];
    image_url: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
  }
  
  export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    plan: 'basic' | 'premium';
    status: 'active' | 'inactive';
    address?: string;
    birth_date?: string;
    created_at: string;
    updated_at: string;
  }