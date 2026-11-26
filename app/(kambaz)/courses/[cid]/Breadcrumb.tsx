"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname() ?? "";
  // The course section is the segment after the course id
  // (/courses/<cid>/<section>/...), so pages inside it, like a quiz or an
  // assignment, show their section rather than their id.
  const section = pathname.split("/")[3] ?? "";
  const label = section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <span>
      {course?.name} &gt; {label}
    </span>
  );
}
