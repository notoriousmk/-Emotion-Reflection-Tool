//inputFrom file

import { useState } from "react";
import api from "../api";

interface Props {
  onNewEmoji: (emojiName: string) => void;
}

export default function ReflectForm({ onNewEmoji }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/analyze", { text });
      setResult(response.data);
      // send to /emojis/add
      await api.post("/emojis/add", { name: response.data.emotion });
      onNewEmoji(response.data.emotion);
    } catch (err) {
      setError("Error connecting to the server.");
    } finally {
      setLoading(false);
      setText("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <textarea
          className="textarea"
          rows={4}
          placeholder="How are you feeling?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading || !text.trim()}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="result-box">
          <p className="text-lg font-semibold">Emotion: {result.emotion}</p>
          <p className="text-gray-700">
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
