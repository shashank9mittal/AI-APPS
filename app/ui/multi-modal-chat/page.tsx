"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      />
    </svg>
  );
}

export default function MultiModalChatPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/multi-modal-chat",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !fileCount) return;
    sendMessage({ text: input.trim() || "What’s in this?", files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isLoading = status === "submitted" || status === "streaming";
  const fileCount = files?.length ?? 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="flex flex-col w-full max-w-2xl min-h-screen py-16 px-4 mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Multi-modal Chat
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Send messages with images and files
          </p>
        </header>

        {/* Content area */}
        <main className="flex-1 flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm"
            >
              {error.message}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-[85%] rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/40"
                    : "max-w-[85%] rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/50 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 backdrop-blur-sm px-4 py-3"
                }
              >
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div className="text-zinc-700 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed text-sm">
                  {message.parts.map((part, index) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <span key={`${message.id}-${index}`}>
                            {part.text}
                          </span>
                        );

                      case "file":
                        if (part.mediaType.startsWith("image/")) {
                          return (
                            <span
                              key={`${message.id}-${index}`}
                              className="inline-block mt-2 rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-600/50 max-w-full"
                            >
                              <Image
                                src={part.url}
                                alt={part.filename ?? `attachment-${index}`}
                                width={400}
                                height={400}
                                className="object-cover max-h-64 w-auto"
                              />
                            </span>
                          );
                        }
                        return null;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/50 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 backdrop-blur-sm px-4 py-3">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 && !error && !isLoading && (
            <div className="flex-1 flex items-center justify-center py-16">
              <div className="text-center max-w-xs">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <svg
                    className="w-7 h-7 text-zinc-400 dark:text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Type a message and attach images or files to get started
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-4 mt-8 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-300/30 dark:shadow-zinc-950/50 backdrop-blur-xl"
        >
          {fileCount > 0 && (
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {fileCount} file{fileCount !== 1 ? "s" : ""} attached
              </span>
              <button
                type="button"
                onClick={() => {
                  setFiles(undefined);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                Clear
              </button>
            </div>
          )}
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:focus:ring-amber-400/30 dark:focus:border-amber-400 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) setFiles(e.target.files);
              }}
            />
            <label
              htmlFor="file-upload"
              className="relative flex items-center justify-center h-[46px] w-[46px] shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:border-amber-500 cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <PaperclipIcon className="w-5 h-5" />
              {fileCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-white px-1">
                  {fileCount}
                </span>
              )}
            </label>

            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white font-medium transition-all duration-200"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() && !fileCount}
                className="px-5 py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 text-white font-medium shadow-lg shadow-amber-500/25 dark:shadow-amber-600/20 hover:shadow-amber-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-amber-500/25"
              >
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
