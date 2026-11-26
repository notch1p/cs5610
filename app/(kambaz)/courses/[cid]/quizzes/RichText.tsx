"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Quill needs the browser's DOM, so it's only loaded on the client.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-40 rounded border border-neutral-300" />,
});

// No image button and no "image" format, so pasted images are dropped rather
// than inlined as base64. The server takes at most 2 MB per request.
const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block", "link"],
    ["clean"],
  ],
};
const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "link",
];

// A WYSIWYG editor that reports its content as HTML.
export default function RichText({
  id,
  value,
  onChangeAction: onChange,
}: {
  id?: string;
  value: string;
  onChangeAction: (html: string) => void;
}) {
  return (
    <div id={id} className="wd-rich-text">
      <ReactQuill
        theme="snow"
        value={value}
        modules={MODULES}
        formats={FORMATS}
        onChange={(html, _delta, _source, editor) =>
          // An emptied editor still holds "<p><br></p>"; keep that as "".
          onChange(editor.getText().trim() ? html : "")
        }
      />
    </div>
  );
}
