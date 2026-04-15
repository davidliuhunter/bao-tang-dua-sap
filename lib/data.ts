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

// ─── Artifacts ────────────────────────────────────────────────────────────────

export async function getPublishedArtifacts(): Promise<Artifact[]> {
  if (!isConfigured || !supabase) {
    return mockArtifacts.filter((a) => a.status === 'published');
  }
  const { data } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  return (data as Artifact[]) ?? mockArtifacts.filter((a) => a.status === 'published');
}

export async function getArtifactById(id: string): Promise<Artifact | null> {
  if (!isConfigured || !supabase) {
    return mockArtifacts.find((a) => a.id === id) ?? null;
  }
  const { data } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .eq('id', id)
    .single();
  return (data as Artifact) ?? mockArtifacts.find((a) => a.id === id) ?? null;
}

export async function getAllArtifacts(): Promise<Artifact[]> {
  if (!isConfigured || !supabase) return mockArtifacts;
  const { data } = await supabase
    .from('artifacts')
    .select('*, collection:collections(*)')
    .order('created_at', { ascending: false });
  return (data as Artifact[]) ?? mockArtifacts;
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isConfigured || !supabase) {
    return mockArticles.filter((a) => a.status === 'published');
  }
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  return (data as Article[]) ?? mockArticles.filter((a) => a.status === 'published');
}

export async function getAllArticles(): Promise<Article[]> {
  if (!isConfigured || !supabase) return mockArticles;
  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  return (data as Article[]) ?? mockArticles;
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getPublishedEvents(): Promise<EventItem[]> {
  if (!isConfigured || !supabase) {
    return mockEvents.filter((e) => e.status === 'published');
  }
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true });
  return (data as EventItem[]) ?? mockEvents.filter((e) => e.status === 'published');
}

export async function getAllEvents(): Promise<EventItem[]> {
  if (!isConfigured || !supabase) return mockEvents;
  const { data } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
  return (data as EventItem[]) ?? mockEvents;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (!isConfigured || !supabase) return mockCategories;
  const { data } = await supabase.from('categories').select('*').order('name');
  return (data as Category[]) ?? mockCategories;
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  if (!isConfigured || !supabase) return mockCollections;
  const { data } = await supabase
    .from('collections')
    .select('*, category:categories(*)')
    .order('name');
  return (data as Collection[]) ?? mockCollections;
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  if (!isConfigured || !supabase) return mockContactMessages;
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  return (data as ContactMessage[]) ?? mockContactMessages;
}
