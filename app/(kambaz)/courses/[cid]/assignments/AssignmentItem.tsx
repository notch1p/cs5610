import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export default function AssignmentItem({
  cid,
  aid,
  title,
  details,
  deleteAssignment,
}: {
  cid: string;
  aid: string;
  title: string;
  details: string;
  deleteAssignment: () => void;
}) {
  return (
    <li className="wd-assignment-list-item mb-3 flex items-center gap-3 border border-neutral-300 border-l-[3px] border-l-green-600 bg-white p-3">
      <FaFileAlt className="mt-1 shrink-0 text-xl text-green-700" />
      <div className="flex justify-between items-center w-full">
        <div className="flex-auto">
          <Link
            href={`/courses/${cid}/assignments/${aid}`}
            className="wd-assignment-link font-semibold text-neutral-900 no-underline"
          >
            {title}
          </Link>
          <div className="mt-1 text-sm text-neutral-600 flex">{details}</div>
        </div>
        <button
          type="button"
          className="border-none bg-white pt-2 text-base"
          onClick={deleteAssignment}
        >
          <FaTrashCan />
        </button>
      </div>
    </li>
  );
}
