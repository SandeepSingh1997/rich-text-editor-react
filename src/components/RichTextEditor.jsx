import { useRef, useEffect } from "react";
import { handleTextStyle, handleAddBullet } from "../utils/richTextUtils";
import Style from "./RichTextEditor.module.scss";

export default function RichTextEditor() {
  const textAreaRef = useRef(null);
  useEffect(() => {
    textAreaRef.current.innerHTML = "Bold is beautiful";
  });

  return (
    <div>
      <div
        className={Style.container}
        contentEditable={true}
        ref={textAreaRef}
      ></div>
      <button
        onClick={() => {
          handleTextStyle("b", textAreaRef);
        }}
      >
        bold
      </button>
      <button
        onClick={() => {
          handleTextStyle("h1", textAreaRef);
        }}
      >
        heading
      </button>
      <button
        onClick={() => {
          handleTextStyle("u", textAreaRef);
        }}
      >
        underline
      </button>
      <button onClick={handleAddBullet}>add bullet</button>
    </div>
  );
}
