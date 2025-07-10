// emojis.tsx file

import { useEffect, useState } from "react";
import ReflectForm from "./ReflectForm.tsx";
import api from "../api.tsx";

interface Emoji {
  name: string;
}

const EmojisList = () => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  const fetchEmojis = async () => {
    try {
      const response = await api.get("/emojis");
      setEmojis(response.data.emojis);
    } catch (error) {
      console.error("Error fetching emojis", error);
    }
  };

  const handleNewEmoji = (emojiName: string) => {
    setEmojis((prev) => [...prev, { name: emojiName }]);
  };

  useEffect(() => {
    fetchEmojis();
  }, []);

  return (
    <div className="mt-10 text-center">
      <ReflectForm onNewEmoji={handleNewEmoji} />
      <h2 className="text-xl font-bold mt-8 mb-4">Past Emotions</h2>
      <ul className="emoji-list">
        {emojis.map((emoji, index) => (
          <li key={index} className="bg-white-100 shadow-sm p-3 rounded border text-center">
            {emoji.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmojisList;