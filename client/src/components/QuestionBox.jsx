import { useState } from "react";
import { motion } from "framer-motion";

/**
 * QuestionBox – a simple, accessible text‑box component
 * ------------------------------------------------------
 * Props (optional):
 *   onSubmit?: (question: string) => void – called with the user’s input
 */
export default function QuestionBox({ onSubmit }) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return; // ignore empty strings
    onSubmit?.(question.trim());
    setQuestion("");
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto p-4 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <textarea
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here…"
          rows={4}
          className="w-full resize-none rounded-2xl border bg-gray-100 border-gray-300 focus:outline-none p-3 font-light text-gray-900 shadow-inner"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Ask AI Tutor
        </button>
      </form>
    </motion.section>
  );
}
