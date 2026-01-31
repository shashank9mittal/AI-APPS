import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to generate Text" }, { status: 500 });
  }
}
