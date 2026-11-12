"use client";

import { ReactNode, useEffect, useState } from "react";
import "@/app/labs/lab2/tailwind/utilities.css";
import "./kambaz.css";
import KambazNavigation from "./Navigation";
import { AccountProvider, useAccountContext } from "./account/AccountContext";
import * as client from "./account/client";

function Session({ children }: { children: ReactNode }) {
  const { setCurrentUser } = useAccountContext();
  const [pending, setPending] = useState(true);
  useEffect(() => {
    client.profile().then((user) => {
      setCurrentUser(user ?? null);
      setPending(false);
    });
  }, [setCurrentUser]);
  return pending ? null : children;
}

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AccountProvider>
      <div id="wd-kambaz" className="font-sans">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Session>{children}</Session>
        </div>
      </div>
    </AccountProvider>
  );
}
