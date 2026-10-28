"use client";

import Link from "next/link";
import Image from "next/image";

export default function CourseCard({
  _id,
  name,
  description,
  image,
  onEditAction: onEdit,
  onDeleteAction: onDelete,
  onEnrollAction: onEnroll,
  onUnenrollAction: onUnenroll,
}: {
  _id: string;
  name: string;
  description: string;
  image: string;
  onEditAction: () => void;
  onDeleteAction: () => void;
  onEnrollAction?: () => void;
  onUnenrollAction?: () => void;
}) {
  return (
    <div className="wd-dashboard-course w-[350px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Link
        href={`/courses/${_id}/home`}
        className="wd-dashboard-course-link block text-neutral-900 no-underline"
      >
        <Image
          src={image}
          width={300}
          height={160}
          alt={name}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold whitespace-nowrap">
            {name}
          </h5>
          <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
            {description}
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            Go
          </button>
          <button
            type="button"
            id="wd-edit-course-click"
            className="ms-2 inline-flex items-center justify-center rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
            onClick={(event) => {
              event.preventDefault();
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            id="wd-delete-course-click"
            className="ms-2 inline-flex items-center justify-center rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
            onClick={(event) => {
              event.preventDefault();
              onDelete();
            }}
          >
            Delete
          </button>
          {onEnroll && (
            <button
              type="button"
              id="wd-enroll-course-click"
              className="ms-2 inline-flex items-center justify-center rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
              onClick={(event) => {
                event.preventDefault();
                onEnroll();
              }}
            >
              Enroll
            </button>
          )}
          {onUnenroll && (
            <button
              type="button"
              id="wd-unenroll-course-click"
              className="ms-2 inline-flex items-center justify-center rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
              onClick={(event) => {
                event.preventDefault();
                onUnenroll();
              }}
            >
              Unenroll
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}
