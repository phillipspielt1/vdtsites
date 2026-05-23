"use client";

import { usePathname } from "next/navigation";
import type { SiteContent } from "@/lib/site-content";
import { ContentProvider } from "./content-context";
import AdminBar from "./AdminBar";

/**
 * Client wrapper that bridges the (server) layout's content/admin flags to
 * the (client) ContentProvider, and hides the editor on the /admin route
 * itself so the editor doesn't try to wrap the sign-in page.
 *
 * To drop into another project: copy this file, ensure @/lib/site-content
 * exports `SiteContent` + `defaultContent`, and call <EditorShell> in your
 * root layout passing `content` (from loadContent) and `admin` (from isAdmin).
 */
export default function EditorShell({
  children,
  content,
  admin,
}: {
  children: React.ReactNode;
  content: SiteContent;
  admin: boolean;
}) {
  const pathname = usePathname() ?? "/";
  const isAdminRoute = pathname.startsWith("/admin");
  const editable = admin && !isAdminRoute;

  return (
    <ContentProvider initial={content} editable={editable}>
      {children}
      {editable && <AdminBar />}
    </ContentProvider>
  );
}
