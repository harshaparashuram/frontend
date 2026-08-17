"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I’m your AI engineering assistant. Ask me about architecture, APIs, debugging, testing, or implementation decisions.",
  },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I received your message. The AI backend will be connected here next.",
        },
      ]);
      setIsLoading(false);
    }, 600);
  }

  function startNewConversation() {
    setMessages(initialMessages);
    setInput("");
    setIsLoading(false);
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-border bg-background border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 lg:px-8">
          <div>
            <p className="text-muted text-sm font-medium">AI Assistant</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Engineering Assistant
            </h1>
          </div>

          <Button variant="outline" onClick={startNewConversation}>
            New conversation
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8 lg:px-8">
          <div className="flex-1 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-2xl rounded-2xl px-4 py-3 text-sm leading-6",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground border",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="border-border bg-background text-muted rounded-2xl border px-4 py-3 text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-border bg-background mt-8 rounded-xl border p-2 shadow-sm"
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask your engineering question..."
                rows={3}
                disabled={isLoading}
                className="placeholder:text-muted min-h-20 flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Message"
              />

              <Button type="submit" disabled={!input.trim() || isLoading}>
                Send
              </Button>
            </div>
          </form>

          <p className="text-muted mt-3 text-center text-xs">
            AI-generated responses may require verification before production
            use.
          </p>
        </div>
      </div>
    </section>
  );
}
