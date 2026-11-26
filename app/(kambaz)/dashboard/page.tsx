"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import CourseEditor from "./CourseEditor";
import { emptyCourse, type Course } from "../store/coursesStore";
import { useAccountContext } from "../account/AccountContext";
import * as client from "../courses/client";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  // What the editor popup shows; null while it's closed.
  const [editor, setEditor] = useState<{
    course: Course;
    isNew: boolean;
  } | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { currentUser } = useAccountContext();
  const isAdmin = currentUser?.role === "ADMIN";
  // For faculty, enrollments are the courses they're in charge of: they see
  // and edit only those, and don't enroll or unenroll themselves.
  const isFaculty = currentUser?.role === "FACULTY";
  useEffect(() => {
    client.fetchAllCourses().then(setCourses);
    if (currentUser) {
      client.findMyCourses().then((mine: Course[]) => {
        setEnrolledIds(mine.map((c) => c._id));
      });
    }
  }, [currentUser]);
  const addCourse = async (course: Course) => {
    const newCourse: Course = await client.createCourse(course);
    setCourses((cs) => [...cs, newCourse]);
    // createCourse also enrolls you on the server
    setEnrolledIds((ids) => [...ids, newCourse._id]);
  };
  const updateCourse = async (course: Course) => {
    const updated: Course = await client.updateCourse(course);
    setCourses((cs) => cs.map((c) => (c._id === updated._id ? updated : c)));
  };
  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses((cs) => cs.filter((c) => c._id !== courseId));
  };
  const enroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    setEnrolledIds((ids) => [...ids, courseId]);
  };
  const unenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    setEnrolledIds((ids) => ids.filter((id) => id !== courseId));
  };
  const showEnrolledOnly =
    currentUser !== null && (isFaculty || !showAllCourses);
  const visibleCourses = showEnrolledOnly
    ? courses.filter((c) => enrolledIds.includes(c._id))
    : courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2
        id="wd-dashboard-published"
        className="flex items-center justify-between gap-2"
      >
        <span>
          {showEnrolledOnly
            ? `${currentUser.firstName}: Enrolled`
            : "Published"}{" "}
          Courses ({visibleCourses.length})
        </span>
        <span className="flex gap-2">
          {currentUser && !isFaculty && (
            <button
              type="button"
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
              id="wd-enrollments-toggle"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              Enrollments
            </button>
          )}
          {(isAdmin || isFaculty) && (
            <button
              type="button"
              className="rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
              id="wd-add-new-course-click"
              onClick={() => setEditor({ course: emptyCourse, isNew: true })}
            >
              Add
            </button>
          )}
        </span>
      </h2>
      {editor && (
        <CourseEditor
          dialogTitle={editor.isNew ? "Add Course" : "Edit Course"}
          course={editor.course}
          saveCourseAction={editor.isNew ? addCourse : updateCourse}
          handleCloseAction={() => setEditor(null)}
        />
      )}
      <hr />
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((c) => {
          const enrolled = enrolledIds.includes(c._id);
          const canEdit = isAdmin || (isFaculty && enrolled);
          return (
            <CourseCard
              key={c._id}
              {...c}
              onEditAction={
                canEdit
                  ? () => setEditor({ course: c, isNew: false })
                  : undefined
              }
              onDeleteAction={canEdit ? () => deleteCourse(c._id) : undefined}
              onEnrollAction={
                currentUser && !isFaculty && !enrolled
                  ? () => enroll(c._id)
                  : undefined
              }
              onUnenrollAction={
                enrolled && !isFaculty ? () => unenroll(c._id) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
