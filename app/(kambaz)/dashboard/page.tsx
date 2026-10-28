"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import {
  emptyCourse,
  useCoursesStore,
  type Course,
} from "../store/coursesStore";
import { useAccountContext } from "../account/AccountContext";
import { useEnrollmentsStore } from "../store/enrollmentsStore";

export default function Dashboard() {
  const { courses, addCourse, deleteCourse, updateCourse } = useCoursesStore();
  const [course, setCourse] = useState<Course>(emptyCourse);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { currentUser } = useAccountContext();
  const { enrollments, enroll, unenroll } = useEnrollmentsStore();
  const enrollmentFor = (courseId: string) =>
    enrollments.find(
      (enrollment) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId,
    );
  const showEnrolledOnly = currentUser !== null && !showAllCourses;
  const visibleCourses = showEnrolledOnly
    ? courses.filter((c) => enrollmentFor(c._id))
    : courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5 className="flex flex-wrap items-center gap-2">
        New Course
        <button
          type="button"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          id="wd-add-new-course-click"
          onClick={() => addCourse(course)}
        >
          Add
        </button>
        <button
          type="button"
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
          id="wd-update-course-click"
          onClick={() => updateCourse(course)}
        >
          Update
        </button>
      </h5>
      <input
        className="mb-2 mt-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        id="wd-course-name"
      />
      <input
        className="mb-2 w-full mt-2 block max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.number}
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
        id="wd-course-number"
      />
      <input
        type="date"
        className="mb-2 mt-2 w-full block max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.startDate}
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        id="wd-course-start-date"
      />
      <textarea
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        rows={3}
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
        id="wd-course-description"
      />
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
        {currentUser && (
          <button
            type="button"
            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
            id="wd-enrollments-toggle"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            Enrollments
          </button>
        )}
      </h2>
      <hr />
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((c) => {
          const enrollment = enrollmentFor(c._id);
          return (
            <CourseCard
              key={c._id}
              {...c}
              onEditAction={() => setCourse(c)}
              onDeleteAction={() => deleteCourse(c._id)}
              onEnrollAction={
                currentUser && !enrollment
                  ? () => enroll({ user: currentUser._id, course: c._id })
                  : undefined
              }
              onUnenrollAction={
                enrollment ? () => unenroll(enrollment._id) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
