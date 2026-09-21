import Link from "next/link";
import { ReactNode } from "react";
export type Assignment = {
  cid: string;
  aid: string;
  title: string;
  children: ReactNode;
};

export default function AssignmentItem({
  cid,
  aid,
  title,
  children,
}: Assignment) {
  const titleLink = `/courses/${cid}/assignments/${aid}`;
  return (
    <li className="wd-assignment-list-item">
      {/* Link the title to /courses/${cid}/assignments/${aid}
          (className wd-assignment-link), then show details underneath */}
      <Link href={titleLink} className="wd-assignment-link">
        {title}
      </Link>
      <br />
      {children}
    </li>
  );
}
