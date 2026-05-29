'use client';
import React, { useState } from 'react';

interface Props {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = 'Kopieer' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 flex items-center gap-1"
    >
      {copied ? (
        <span className="text-green-600">✓ Gekopieerd!</span>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
