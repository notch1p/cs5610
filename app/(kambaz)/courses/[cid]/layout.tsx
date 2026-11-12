"use client";

import { ReactNode, useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import type { Course } from "../../store/coursesStore";
import { useAccountContext } from "../../account/AccountContext";
import * as client from "../client";
import { AiOutlineMenu } from "react-icons/ai";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const { currentUser } = useAccountContext();
  // Signed in: only your enrolled courses can be opened. Signed out: any.
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [showCourseNav, setShowCourseNav] = useState(true);
  useEffect(() => {
    const load = currentUser ? client.findMyCourses : client.fetchAllCourses;
    // On failure (e.g. a 401 after a server restart) don't stay blank forever.
    load()
      .then(setCourses)
      .catch(() => setCourses([]));
  }, [currentUser]);

  if (!courses) return null; // still loading
  const course = courses.find((c) => c._id === courseId);
  if (currentUser && !course) {
    redirect("/dashboard");
  }

  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-700">
        <AiOutlineMenu
          className="me-4 -mb-1 inline cursor-pointer text-xxl"
          onClick={() => setShowCourseNav(!showCourseNav)}
          title="Toggle course navigation"
        />
        <Breadcrumb course={course} />
      </h2>
      <hr className="my-3" />
      <div className="flex gap-4">
        {showCourseNav ? (
          <div className="hidden w-[160px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
