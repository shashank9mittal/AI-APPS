"use client";

import { useCompletion } from "@ai-sdk/react";

const StreamText = () => {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setInput,
  } = useCompletion({
    api: "/api/stream",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="flex flex-col w-full max-w-2xl min-h-screen py-16 px-4 mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            AI Streaming
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Watch responses appear in real-time
          </p>
        </header>

        {/* Content area */}
        <main className="flex-1 flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm"
            >
              {error instanceof Error ? error.message : String(error)}
            </div>
          )}

          {(completion || isLoading) && (
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/50 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 backdrop-blur-sm">
              <p className="text-zinc-700 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {completion}
                {isLoading && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle bg-amber-500 animate-pulse"
                    aria-hidden
                  />
                )}
              </p>
            </div>
          )}

          {!completion && !isLoading && !error && (
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Ask a question and watch the response stream in
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Input form */}
        <form
          onSubmit={onSubmit}
          className="sticky bottom-4 mt-8 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-300/30 dark:shadow-zinc-950/50 backdrop-blur-xl"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="How can I help you?"
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:focus:ring-amber-400/30 dark:focus:border-amber-400 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            />
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
                disabled={!input.trim()}
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
};

export default StreamText;
