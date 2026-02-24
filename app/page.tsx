import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          AI-APPS
        </h1>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          Choose an AI experience to get started
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Link
            href="/ui/chat"
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-8 py-6 shadow-lg shadow-zinc-200/50 transition-all hover:border-amber-200 hover:shadow-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:shadow-zinc-900/50 dark:hover:border-amber-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Chat
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Multi-turn conversation
              </p>
            </div>
          </Link>
          <Link
            href="/ui/multi-modal-chat"
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-8 py-6 shadow-lg shadow-zinc-200/50 transition-all hover:border-amber-200 hover:shadow-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:shadow-zinc-900/50 dark:hover:border-amber-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Multi-modal
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Chat with images and files
              </p>
            </div>
          </Link>
          <Link
            href="/ui/completion"
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-8 py-6 shadow-lg shadow-zinc-200/50 transition-all hover:border-amber-200 hover:shadow-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:shadow-zinc-900/50 dark:hover:border-amber-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Completion
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                One-shot AI text generation
              </p>
            </div>
          </Link>
          <Link
            href="/ui/stream"
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-8 py-6 shadow-lg shadow-zinc-200/50 transition-all hover:border-amber-200 hover:shadow-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:shadow-zinc-900/50 dark:hover:border-amber-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Streaming
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Real-time streaming responses
              </p>
            </div>
          </Link>
          <Link
            href="/ui/structured-data"
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-8 py-6 shadow-lg shadow-zinc-200/50 transition-all hover:border-amber-200 hover:shadow-amber-500/10 dark:border-zinc-700 dark:bg-zinc-800/90 dark:shadow-zinc-900/50 dark:hover:border-amber-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-6 w-6 text-amber-600 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Recipe
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Structured recipe generator
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
