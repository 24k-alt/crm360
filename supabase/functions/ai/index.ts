import { serve } from "https://deno.land/std@0.219.0/http/server.ts";

type Message = { role: "system" | "user" | "assistant"; content: string };

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const apiKey = Deno.env.get("NV_API_KEY");
  if (!apiKey) return new Response("Missing NV_API_KEY", { status: 500 });

  const { messages, max_tokens = 512, temperature = 0.6 } = await req.json();
  const body = {
    model: "qwen/qwen3.5-122b-a10b",
    messages: messages as Message[],
    max_tokens,
    temperature,
    top_p: 0.95,
    stream: false,
    chat_template_kwargs: { enable_thinking: true }
  };

  const resp = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return new Response(resp.body, { status: resp.status, headers: { "Content-Type": "application/json" } });
});
