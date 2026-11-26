"use client";

import DOMPurify from "dompurify";

// Renders HTML written in the quiz editor. DOMPurify strips scripts and event
// handlers first, since faculty-written HTML is shown to students. DOMPurify
// needs a browser, so nothing is rendered on the server.
export default function SafeHtml({
  html,
  className,
}: {
  html?: string;
  className?: string;
}) {
  const clean =
    typeof window === "undefined" ? "" : DOMPurify.sanitize(html ?? "");
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
