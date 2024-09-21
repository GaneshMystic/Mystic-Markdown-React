import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

const md = new MarkdownIt();
md.use(
  await Shiki({
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
  })
);


export default function App() {
  const [markdown, setMarkdown] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    setMarkdown(input);
    const render = md.render(input);
    debugger
    setHtmlContent(render);
  };

  return (
    <div className="App">
      <h1>Markdown-it in React</h1>
      <textarea
        value={markdown}
        onChange={handleInputChange}
        placeholder="Write your Markdown here..."
        rows="10"
        cols="50"
      />
      <div
        className="MarkdownPreview"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

