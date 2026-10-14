import { useState } from "react";

// Copies `text`; `message` briefly says "Copied", or shows the text itself when the browser refuses
export function useCopy(text: string) {
  const [message, setMessage] = useState("");
  const flash = (m: string) => {
    setMessage(m);
    setTimeout(() => setMessage(""), 1400);
  };
  const copy = () => {
    if (!navigator.clipboard) return flash(text);
    navigator.clipboard.writeText(text).then(() => flash("Copied"), () => flash(text));
  };
  return { message, copy };
}
