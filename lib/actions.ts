'use server';

import { revalidatePath } from 'next/cache';
import { supabase, isConfigured } from './supabase';
import type { Artifact, Article, EventItem } from './types';

// ─── Contact form ─────────────────────────────────────────────────────────────

export async function submitContact(formData: FormData) {
  const full_name = (formData.get('full_name') as string | null)?.trim();
  const email = (formData.get('email') as string | null)?.trim();
  const phone = (formData.get('phone') as string | null)?.trim() || null;
  const message = (formData.get('message') as string | null)?.trim();

  if (!full_name || !email || !message) {
    return { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' };
  }

  if (!isConfigured || !supabase) {
    // Mock success when Supabase not configured
    return { success: true };
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert({ full_name, email, phone, message });

  if (error) return { success: false, error: 'Không thể gửi tin nhắn. Vui lòng thử lại.' };
  return { success: true };
}

// ─── Artifacts ────────────────────────────────────────────────────────────────

export async function saveArtifact(data: Partial<Artifact> & { id?: string }) {
  if (!isConfigured || !supabase) return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, collection: _col, ...rest } = data;
  let error;
  if (id) {
    ({ error } = await supabase.from('artifacts').update(rest).eq('id', id));
  } else {
    ({ error } = await supabase.from('artifacts').insert(rest));
  }
  if (error) return { success: false, error: error.message };
  revalidatePath('/hien-vat');
  revalidatePath('/quan-tri');
  return { success: true };
}

export async function deleteArtifact(id: string) {
  if (!isConfigured || !supabase) return { success: true };
  const { error } = await supabase.from('artifacts').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/hien-vat');
  revalidatePath('/quan-tri');
  return { success: true };
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function saveArticle(data: Partial<Article> & { id?: string }) {
  if (!isConfigured || !supabase) return { success: true };
  const { id, ...rest } = data;
  let error;
  if (id) {
    ({ error } = await supabase.from('articles').update(rest).eq('id', id));
  } else {
    ({ error } = await supabase.from('articles').insert(rest));
  }
  if (error) return { success: false, error: error.message };
  revalidatePath('/bai-viet');
  revalidatePath('/quan-tri');
  return { success: true };
}

export async function deleteArticle(id: string) {
  if (!isConfigured || !supabase) return { success: true };
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/bai-viet');
  return { success: true };
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function saveEvent(data: Partial<EventItem> & { id?: string }) {
  if (!isConfigured || !supabase) return { success: true };
  const { id, ...rest } = data;
  let error;
  if (id) {
    ({ error } = await supabase.from('events').update(rest).eq('id', id));
  } else {
    ({ error } = await supabase.from('events').insert(rest));
  }
  if (error) return { success: false, error: error.message };
  revalidatePath('/su-kien');
  return { success: true };
}

export async function deleteEvent(id: string) {
  if (!isConfigured || !supabase) return { success: true };
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/su-kien');
  return { success: true };
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function markMessageRead(id: string) {
  if (!isConfigured || !supabase) return { success: true };
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/quan-tri');
  return { success: true };
}
