'use client';

import React from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface HtmlCodeViewerProps {
  htmlContent: string;
  onCopy: () => void;
  copied: boolean;
  onDownload: () => void;
  title: string;
}

export const HtmlCodeViewer: React.FC<HtmlCodeViewerProps> = ({
  htmlContent,
  onCopy,
  copied,
  onDownload,
  title,
}) => {
  const charCount = htmlContent.length;
  const lineCount = htmlContent.split('\n').length;
  const sizeKb = (new Blob([htmlContent]).size / 1024).toFixed(1);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-none p-6 sm:p-8 text-stone-200 shadow-2xl my-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
            <FileCode className="w-4 h-4" />
            <span>Standalone Production Template</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Generated Semantic HTML & Embedded CSS
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            100% self-contained file with Amazon layout, Schema.org JSON-LD, and square components
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-none text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'HTML Copied!' : 'Copy Entire HTML'}</span>
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-none text-xs font-bold transition-colors border border-stone-700 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .html</span>
          </button>
        </div>
      </div>

      {/* Meta Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 py-3 px-4 bg-stone-950 rounded-none my-4 text-xs font-mono text-stone-400 border border-stone-800">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400">●</span>
          <span>Size: <strong>{sizeKb} KB</strong></span>
        </div>
        <div>Lines: <strong>{lineCount}</strong></div>
        <div>Chars: <strong>{charCount.toLocaleString()}</strong></div>
        <div className="text-stone-500 hidden sm:inline">|</div>
        <div className="text-stone-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Includes Article, HowTo, LocalBusiness & FAQ Schema</span>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-none overflow-hidden border border-stone-800 bg-stone-950">
        <div className="flex items-center justify-between px-4 py-2 bg-stone-900 border-b border-stone-800 text-xs text-stone-400 font-mono">
          <span className="truncate max-w-xs">{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html</span>
          <span>UTF-8 · HTML5</span>
        </div>

        <pre className="p-5 text-xs text-stone-300 font-mono overflow-x-auto max-h-[580px] leading-relaxed selection:bg-orange-500 selection:text-white">
          <code>{htmlContent}</code>
        </pre>
      </div>

      {/* Instructions on Deployment */}
      <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-400">
        <div className="p-3 bg-stone-950 rounded-none border border-stone-800">
          <strong className="text-white block mb-1">1. Static Web Hosting</strong>
          Upload directly to S3, Cloudflare Pages, Netlify, or Vercel static folder.
        </div>
        <div className="p-3 bg-stone-950 rounded-none border border-stone-800">
          <strong className="text-white block mb-1">2. CMS or Shopify</strong>
          Drop into custom page templates, blog post HTML source, or WordPress custom HTML blocks.
        </div>
        <div className="p-3 bg-stone-950 rounded-none border border-stone-800">
          <strong className="text-white block mb-1">3. Next.js Routing</strong>
          Deploy directly to Next.js App Router dynamic routes with zero configuration.
        </div>
      </div>
    </div>
  );
};
