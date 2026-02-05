"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema, type Recipe } from "@/app/api/structured-data/schema";

export default function RecipeGeneratorPage() {
  const [dishName, setDishName] = useState("");

  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const recipe = (object as Partial<Recipe> | undefined)?.recipe;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;
    submit({ dishName: dishName.trim() });
    setDishName("");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="flex flex-col w-full max-w-2xl min-h-screen py-16 px-4 mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Recipe Generator
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Enter a dish name and get a structured recipe
          </p>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm"
            >
              {error instanceof Error ? error.message : String(error)}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 shadow-sm backdrop-blur-sm">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Generating recipe...
              </p>
            </div>
          )}

          {recipe && (recipe.name || recipe.ingredients?.length || recipe.steps?.length) && (
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700/50 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50 backdrop-blur-sm space-y-5">
              {recipe.name && (
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {recipe.name}
                </h2>
              )}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
                    Ingredients
                  </h3>
                  <ul className="list-none space-y-1.5 text-zinc-700 dark:text-zinc-200 text-sm">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex gap-2 flex-wrap">
                        <span className="text-amber-600 dark:text-amber-400 tabular-nums">
                          {ing.quantity != null ? ing.quantity : "—"}
                        </span>
                        {ing.unit && (
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {ing.unit}
                          </span>
                        )}
                        <span>{ing.name ?? ""}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.steps && recipe.steps.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
                    Steps
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-200 text-sm">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {!recipe?.name && !recipe?.ingredients?.length && !recipe?.steps?.length && !isLoading && !error && (
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Enter a dish name below to generate a recipe
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
          <div className="flex gap-3">
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="e.g. Pasta Carbonara"
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
                disabled={!dishName.trim()}
                className="px-5 py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-600 dark:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 text-white font-medium shadow-lg shadow-amber-500/25 dark:shadow-amber-600/20 hover:shadow-amber-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-amber-500/25"
              >
                Start
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
