"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { User } from "@/app/(kambaz)/account/AccountContext";
import PeopleTable from "../PeopleTable";
import * as client from "../client";

export default function CoursePeople() {
  const { cid } = useParams();
  const [enrolled, setEnrolled] = useState<Omit<User, "password">[]>([]);
  useEffect(() => {
    client.findUsersForCourse(cid as string).then(setEnrolled);
  }, [cid]);
  return <PeopleTable users={enrolled} />;
}
