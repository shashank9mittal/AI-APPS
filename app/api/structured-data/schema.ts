import z from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

export type Recipe = z.infer<typeof recipeSchema>;
