import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { courses } from "../../database";
import { AiOutlineMenu } from "react-icons/ai";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ cid: string }>;
}>) {
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <AiOutlineMenu className="me-4 -mb-1 inline text-xxl" />
        <Breadcrumb course={course} />
        &nbsp;<span>({course?._id})</span>
      </h2>
      <hr className="my-3" />
      <div className="flex gap-4">
        <div className="hidden w-[150px] shrink-0 md:block">
          <CourseNavigation cid={cid} />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
