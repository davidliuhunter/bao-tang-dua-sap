'use client';

import { useRef } from 'react';

interface Props {
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
}

const TOOLS = [
  { label: 'B', title: 'Đậm', wrap: ['**', '**'] },
  { label: 'I', title: 'Nghiêng', wrap: ['*', '*'] },
  { label: 'H2', title: 'Tiêu đề', wrap: ['## ', ''] },
  { label: 'H3', title: 'Tiêu đề nhỏ', wrap: ['### ', ''] },
  { label: '—', title: 'Gạch ngang', insert: '\n---\n' },
  { label: '• List', title: 'Danh sách', wrap: ['- ', ''] },
  { label: '1. List', title: 'Danh sách số', wrap: ['1. ', ''] },
  { label: '🔗', title: 'Liên kết', wrap: ['[', '](url)'] },
] as const;

export default function RichTextEditor({ name, defaultValue = '', required, rows = 14 }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function applyFormat(wrap?: readonly [string, string], insert?: string) {
    const ta = ref.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    let newVal: string;
    let cursor: number;
    if (insert) {
      newVal = value.slice(0, s) + insert + value.slice(e);
      cursor = s + insert.length;
    } else if (wrap) {
      const selected = value.slice(s, e);
      const replacement = wrap[0] + (selected || 'văn bản') + wrap[1];
      newVal = value.slice(0, s) + replacement + value.slice(e);
      cursor = s + replacement.length;
    } else {
      return;
    }
    ta.value = newVal;
    ta.focus();
    ta.setSelectionRange(cursor, cursor);
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 p-2 bg-gray-50 border-b border-gray-200">
        {TOOLS.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.title}
            onMouseDown={(e) => {
              e.preventDefault();
              applyFormat(
                'wrap' in t ? t.wrap : undefined,
                'insert' in t ? t.insert : undefined
              );
            }}
            className="px-2 py-1 text-xs font-medium rounded hover:bg-amber-100 text-gray-600 hover:text-amber-800 transition-colors"
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center pr-1">Markdown</span>
      </div>
      {/* Textarea */}
      <textarea
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 text-sm font-mono resize-y focus:outline-none bg-white"
        placeholder="Viết nội dung bài viết ở đây...&#10;&#10;Hỗ trợ Markdown: **đậm**, *nghiêng*, ## tiêu đề"
      />
    </div>
  );
}
