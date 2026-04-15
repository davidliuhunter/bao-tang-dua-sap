export type PublishStatus = 'draft' | 'published';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  created_at: string;
  category?: Category;
}

export interface Artifact {
  id: string;
  name: string;
  description: string | null;
  origin: string | null;
  era: string | null;
  material: string | null;
  collection_id: string | null;
  status: PublishStatus;
  image_url: string | null;
  view_count: number;
  created_at: string;
  collection?: Collection;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  status: PublishStatus;
  image_url: string | null;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  status: PublishStatus;
  image_url: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}
