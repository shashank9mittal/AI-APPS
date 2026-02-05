import { openai } from "@ai-sdk/openai";
import { recipeSchema } from "./schema";
import { Output, streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { dishName } = await req.json();
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      output: Output.object({ schema: recipeSchema }),
      prompt: `Generate a recipe for ${dishName}`,
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to generate structured data" },
      { status: 500 },
    );
  }
}
