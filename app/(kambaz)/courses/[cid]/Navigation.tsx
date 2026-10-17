"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../kambaz.css";

type LINKST = Readonly<{
  segment: string;
  id: string;
  label: string;
}>;

const LINKS: LINKST[] = [
  { segment: "home", id: "wd-course-home-link", label: "Home" },
  { segment: "modules", id: "wd-course-modules-link", label: "Modules" },
  { segment: "piazza", id: "wd-course-piazza-link", label: "Piazza" },
  { segment: "zoom", id: "wd-course-zoom-link", label: "Zoom" },
  {
    segment: "assignments",
    id: "wd-course-assignments-link",
    label: "Assignments",
  },
  { segment: "quizzes", id: "wd-course-quizzes-link", label: "Quizzes" },
  { segment: "grades", id: "wd-course-grades-link", label: "Grades" },
  { segment: "people/table", id: "wd-course-people-link", label: "People" },
  {
    segment: "announcements",
    id: "wd-course-announcements-link",
    label: "Announcements",
  },
];

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname() ?? "";
  const inCourse = pathname.startsWith(`/courses/${cid}`);

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group rounded-none text-lg"
    >
      {LINKS.map(({ segment, id, label }) => {
        const href = `/courses/${cid}/${segment}`;
        const active = inCourse
          ? pathname === href ||
            (segment !== "home" && pathname.startsWith(href))
          : segment === "home";
        return (
          <Link
            key={id}
            href={href}
            id={id}
            className={
              active
                ? "list-group-item active border-0"
                : "list-group-item border-0 text-red-600"
            }
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
