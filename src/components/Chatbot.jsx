"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am Marty, your TechMart AI assistant. 🚀\n\nHow can I help you find products, compare specs, or browse our store today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to the bottom of the chat window when new messages arrive or loading state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Focus input field when chat window is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    if (!textToSend) {
      setInput("");
    }

    // Append user message
    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${baseURL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        let errorMsg = `Server returned status ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData && errData.response) {
            errorMsg = errData.response;
          } else if (errData && errData.message) {
            errorMsg = errData.message;
          }
        } catch (e) {
          try {
            const errText = await response.text();
            if (errText) {
              errorMsg = errText;
            }
          } catch (e2) {}
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      toast.error("Could not connect to the AI chatbot. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, I encountered an issue connecting to the server. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Suggestion chips for quick customer interactions
  const suggestionChips = [
    { label: "🔍 Find Laptops", query: "Search for the best high-performance laptops available in TechMart." },
    { label: "🏷️ Active Discounts", query: "Are there any current discounts or promotional offers running?" },
    { label: "🚚 Shipping Policy", query: "What is your shipping and return policy?" },
    { label: "🔒 Is my checkout secure?", query: "How do you protect customer payment information during checkout?" },
  ];

  // A custom, lightweight renderer for simple markdown tags from AI responses (bolding, newlines, and code blocks)
  const renderMessageContent = (text) => {
    if (!text) return null;

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let sectionIdx = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(...parseInlineMarkdown(textBefore, sectionIdx++));
      }
      const code = match[1];
      parts.push(
        <pre
          key={`code-block-${match.index}-${sectionIdx++}`}
          className="my-2 p-2 bg-slate-950 text-slate-100 rounded-lg text-xs overflow-x-auto font-mono border border-slate-800"
        >
          <code>{code}</code>
        </pre>
      );
      lastIndex = codeBlockRegex.lastIndex;
    }

    const textAfter = text.substring(lastIndex);
    if (textAfter) {
      parts.push(...parseInlineMarkdown(textAfter, sectionIdx++));
    }

    return <div className="space-y-1.5">{parts}</div>;
  };

  const parseInlineMarkdown = (text, sectionIdx) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const elements = [];
      const regex = /(\*\*.*?\*\*|`.*?`)/g;
      const tokens = line.split(regex);

      const lineElements = tokens.map((token, tokenIdx) => {
        if (token.startsWith("**") && token.endsWith("**")) {
          return (
            <strong key={`bold-${sectionIdx}-${lineIdx}-${tokenIdx}`} className="font-semibold text-slate-900 dark:text-white">
              {token.slice(2, -2)}
            </strong>
          );
        }
        if (token.startsWith("`") && token.endsWith("`")) {
          return (
            <code
              key={`code-inline-${sectionIdx}-${lineIdx}-${tokenIdx}`}
              className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded font-mono text-xs"
            >
              {token.slice(1, -1)}
            </code>
          );
        }
        return token;
      });

      return (
        <p key={`p-${sectionIdx}-${lineIdx}`} className="min-h-[1.2rem] leading-relaxed">
          {lineElements}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-between rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
        aria-label="Toggle AI Chatbot"
      >
        <span className="flex h-full w-full items-center justify-center">
          {isOpen ? (
            <svg
              className="h-6 w-6 animate-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="relative">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
            </div>
          )}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[550px] w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-sm">
                  M
                </div>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                  Marty
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  TechMart AI Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-650 dark:hover:text-slate-200 transition-colors"
              aria-label="Close chat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-850">
            {messages.map((msg, index) => (
              <div
                key={`msg-${index}`}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-all duration-200 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none"
                      : "bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-none"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    renderMessageContent(msg.content)
                  )}
                </div>
              </div>
            ))}

            {/* Quick Actions Suggestions - Show when only the initial message is present */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  Suggested Questions
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={`suggestion-${idx}`}
                      onClick={() => handleSend(chip.query)}
                      className="text-left w-full rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-850 px-3.5 py-2 text-xs text-slate-650 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-450 shadow-sm transition-all duration-200"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 rounded-2xl rounded-tl-none bg-slate-100/90 dark:bg-slate-800/90 px-4 py-3 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-550 dark:focus-within:border-emerald-400 bg-slate-50/50 dark:bg-slate-950/30 transition-all duration-200">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Marty anything..."
                disabled={isLoading}
                rows={1}
                className="flex-1 max-h-20 resize-none bg-transparent py-1 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none disabled:opacity-50 font-normal"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all duration-200 disabled:opacity-30 disabled:hover:bg-emerald-600 disabled:shadow-none shrink-0"
                aria-label="Send message"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center select-none">
              Marty is powered by AI and may make mistakes. Verify important info.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
