import { unstable_noStore as noStore } from 'next/cache';
import { supabase, isConfigured } from './supabase';
import {
  mockArtifacts,
  mockArticles,
  mockEvents,
  mockCategories,
  mockCollections,
  mockContactMessages,
} from './mock-data';
import type { Artifact, Article, EventItem, Category, Collection, ContactMessage } from './types';

function logSupabaseError(label: string, error: { message: string } | null) {
  if (error) {
    console.error(`[supabase:${label}] ${error.message}`);
  }
}

export async function getPublishedArtifacts(): Promise<Artifact[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockArtifacts.filter((artifact) => artifact.status === 'published');
  }

  const { data, error } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  logSupabaseError('getPublishedArtifacts', error);
  return (data as Artifact[]) ?? [];
}

export async function getArtifactById(id: string): Promise<Artifact | null> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockArtifacts.find((artifact) => artifact.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .eq('id', id)
    .single();

  logSupabaseError('getArtifactById', error);
  return (data as Artifact) ?? null;
}

export async function getAllArtifacts(): Promise<Artifact[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockArtifacts;
  }

  const { data, error } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .order('created_at', { ascending: false });

  logSupabaseError('getAllArtifacts', error);
  return (data as Artifact[]) ?? [];
}

export async function getPublishedArticles(): Promise<Article[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockArticles.filter((article) => article.status === 'published');
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  logSupabaseError('getPublishedArticles', error);
  return (data as Article[]) ?? [];
}

export async function getAllArticles(): Promise<Article[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockArticles;
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  logSupabaseError('getAllArticles', error);
  return (data as Article[]) ?? [];
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockEvents.filter((eventItem) => eventItem.status === 'published');
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true });

  logSupabaseError('getPublishedEvents', error);
  return (data as EventItem[]) ?? [];
}

export async function getAllEvents(): Promise<EventItem[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockEvents;
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  logSupabaseError('getAllEvents', error);
  return (data as EventItem[]) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockCategories;
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  logSupabaseError('getCategories', error);
  return (data as Category[]) ?? [];
}

export async function getCollections(): Promise<Collection[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockCollections;
  }

  const { data, error } = await supabase
    .from('collections')
    .select('*, category:categories(*)')
    .order('name');

  logSupabaseError('getCollections', error);
  return (data as Collection[]) ?? [];
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return mockContactMessages;
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  logSupabaseError('getAllContactMessages', error);
  return (data as ContactMessage[]) ?? [];
}

export async function getTopViewedArtifacts(limit = 5): Promise<Artifact[]> {
  noStore();
  if (!isConfigured || !supabase) {
    return [...mockArtifacts]
      .sort((left, right) => (right.view_count ?? 0) - (left.view_count ?? 0))
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from('artifacts')
    .select('id, name, view_count, status')
    .order('view_count', { ascending: false })
    .limit(limit);

  logSupabaseError('getTopViewedArtifacts', error);
  return (data as Artifact[]) ?? [];
}
