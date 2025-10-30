import React from "react";

export default function AudioSummary({ text }: { text: string }) {
  const speak = () => {
    if (!("speechSynthesis" in window)) return alert("TTS not supported");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "hi-IN"; // or set based on i18n
    window.speechSynthesis.speak(utter);
  };

  return (
    <button onClick={speak} className="mt-3 px-3 py-2 bg-blue-600 text-white rounded">
      🔊 Hear summary
    </button>
  );
}
