"use client";

import {
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineExperiment,
  AiOutlineInbox,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import "@/app/labs/lab2/tailwind/utilities.css";

export default function KambazNavigation() {
  return (
    <nav
      id="wd-kambaz-navigation"
      className="fixed bottom-0 top-0 z-20 hidden w-[120px] bg-black md:block"
    >
      <Link
        href="https://www.northeastern.edu"
        id="wd-neu-link"
        className="block bg-black text-center text-sm text-white no-underline"
        target="_blank"
      >
        <img src="/images/neu.png" className="w-[120px] object-scale-down" />
      </Link>
      <Link
        href="/account"
        id="wd-account-link"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <FaRegCircleUser className="inline-block text-3xl text-white" />
        <br />
        Account
      </Link>
      <Link
        href="/dashboard"
        id="wd-dashboard-link"
        className="block bg-white py-3 text-center text-sm text-red-600 no-underline"
      >
        <AiOutlineDashboard className="inline-block text-3xl text-red-600" />
        <br />
        Dashboard
      </Link>
      <Link
        href="/dashboard"
        id="wd-course-link"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <AiOutlineBook className="inline-block text-3xl text-red-600" />
        <br />
        Courses
      </Link>
      <Link
        href="/calendar"
        id="wd-calendar-link"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <AiOutlineCalendar className="inline-block text-3xl text-red-600" />
        <br />
        Calendar
      </Link>
      <Link
        href="/inbox"
        id="wd-inbox-link"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <AiOutlineInbox className="inline-block text-3xl text-red-600" />
        <br />
        Inbox
      </Link>
      <Link
        href="/labs"
        id="wd-labs-link"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <AiOutlineExperiment className="inline-block text-3xl text-red-600" />
        <br />
        Labs
      </Link>
      <Link
        href="/labs"
        id="wd-ai-nav-help"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <AiOutlineQuestionCircle className="inline-block text-3xl text-red-600" />
        <br />
        Labs (AI)
      </Link>
    </nav>
  );
}
