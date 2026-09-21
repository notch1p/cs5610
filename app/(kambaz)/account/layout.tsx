import AccountNavigation from "./Navigation";
import type { Children } from "@/app/labs/layout";

export default function AccountLayout({ children }: Children) {
  return (
    <div id="wd-kambaz-account">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
