import KambazNavigation from "./Navigation";
import type { Children } from "@/app/labs/layout";

export default function KambazLayout({ children }: Children) {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width="200">
            <KambazNavigation />
          </td>
          <td valign="top" width="100%">
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
