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



// Custom renderer for headings
md.renderer.rules.heading_open = (tokens, idx) => {
  const level = tokens[idx].tag.slice(1);
  switch (level) {
    case '1':
      return `<h1 style="color: red; font-size: 2em;">`;
    case '2':
      return `<h2 style="color: green; font-size: 1.5em;">`;
    case '3':
      return `<h3 style="color: blue; font-size: 1.2em;">`;
    default:
      return `<h${level}>`;
  }
};



// Custom renderer for bold text
md.renderer.rules.strong_open = () => {
  return `<strong style="color: purple;">`;
};

md.renderer.rules.strong_close = () => {
  return `</strong>`;
};

// Custom renderer for italic text
md.renderer.rules.em_open = () => {
  return `<em style="color: orange;">`;
};

md.renderer.rules.em_close = () => {
  return `</em>`;
};


// Custom renderer for blockquotes
md.renderer.rules.blockquote_open = () => {
  return `<blockquote style="border-left: 4px solid green; padding-left: 10px; color: green;">`;
};

md.renderer.rules.blockquote_close = () => {
  return `</blockquote>`;
};


// Custom renderer for ordered lists
md.renderer.rules.ordered_list_open = () => {
  return `<ol style="padding-left: 20px; color: darkblue;">`;
};

md.renderer.rules.ordered_list_close = () => {
  return `</ol>`;
};

// Custom renderer for unordered lists
md.renderer.rules.bullet_list_open = () => {
  return `<ul style="padding-left: 20px; color: darkgreen;">`;
};

md.renderer.rules.bullet_list_close = () => {
  return `</ul>`;
};

// Custom renderer for list items
md.renderer.rules.list_item_open = () => {
  return `<li style="margin-bottom: 5px;">`;
};

md.renderer.rules.list_item_close = () => {
  return `</li>`;
};

// Custom renderer for inline code
md.renderer.rules.code_inline = (tokens, idx) => {
  return `<code style="background-color: #f5f5f5; padding: 2px 4px; border-radius: 4px; color: red;">${tokens[idx].content}</code>`;
};

// Custom renderer for horizontal rule
md.renderer.rules.hr = () => {
  return `<hr style="border: 0; height: 1px; background: #333; margin: 20px 0;">`;
};


// Custom renderer for links
md.renderer.rules.link_open = (tokens, idx) => {
  const href = tokens[idx].attrGet('href');
  return `<a href="${href}" style="color: #1e90ff; text-decoration: underline;" target="_blank" rel="noopener noreferrer">`;
};

md.renderer.rules.link_close = () => {
  return `</a>`;
};


// Custom renderer for images
md.renderer.rules.image = (tokens, idx) => {
  const src = tokens[idx].attrGet('src');
  const alt = tokens[idx].content;
  return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; border: 2px solid #ccc; border-radius: 8px;" />`;
};


// Custom renderer for tables
md.renderer.rules.table_open = () => {
  return `<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">`;
};

md.renderer.rules.table_close = () => {
  return `</table>`;
};

// Custom renderer for table rows
md.renderer.rules.tr_open = () => {
  return `<tr style="border-bottom: 1px solid #ddd;">`;
};

md.renderer.rules.tr_close = () => {
  return `</tr>`;
};

// Custom renderer for table headers
md.renderer.rules.th_open = () => {
  return `<th style="padding: 8px; text-align: left; background-color: #f2f2f2;">`;
};

md.renderer.rules.th_close = () => {
  return `</th>`;
};

// Custom renderer for table cells
md.renderer.rules.td_open = () => {
  return `<td style="padding: 8px; text-align: left;">`;
};

md.renderer.rules.td_close = () => {
  return `</td>`;
};


// Custom renderer for fenced code blocks
// md.renderer.rules.fence = (tokens, idx, options, env, self) => {
//   const token = tokens[idx];
//   const language = token.info.trim();
//   return `<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px;"><code class="language-${language}" style="font-family:calibri">${md.utils.escapeHtml(token.content)}</code></pre>`;
// };




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

