import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin, setAdminCookie, clearAdminCookie } from "@/lib/inline-editor/admin-auth";

export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const ok = await setAdminCookie(password);
  if (!ok) redirect("/admin?error=1");
  redirect("/");
}

async function logout() {
  "use server";
  await clearAdminCookie();
  redirect("/admin");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const admin = await isAdmin();

  return (
    <section className="min-h-screen bg-[#ece7de] flex items-center">
      <div className="mx-auto max-w-2xl w-full px-6 lg:px-10 py-20 lg:py-28">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#999] mb-6">
          Admin
        </p>
        <h1 className="text-5xl lg:text-6xl font-semibold leading-[1.05] text-[#1a1a1a] tracking-tight mb-10">
          {admin ? "You're signed in." : "Sign in to edit the site."}
        </h1>

        {admin ? (
          <div className="space-y-8 text-[#444] leading-relaxed">
            <p className="text-lg">
              You&apos;re in editing mode. Open any page and click on text to edit it
              right where it sits — changes save automatically. The little
              toolbar at the bottom of every page shows save status.
            </p>

            <ol className="space-y-3 list-decimal pl-5 text-base">
              <li>
                Open the{" "}
                <Link href="/" className="text-[#1a1a1a] underline underline-offset-2">home page</Link>.
              </li>
              <li>Hover any text — a soft yellow highlight means it&apos;s editable. Click and type.</li>
              <li>Changes auto-save 1.2 seconds after you stop typing, or click <em>Save now</em>.</li>
              <li>To exit editing mode, sign out below.</li>
            </ol>

            <form action={logout}>
              <button
                type="submit"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] text-white px-6 py-3 hover:bg-black transition-colors text-sm font-medium"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <form action={login} className="space-y-5 max-w-md">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-[0.22em] text-[#999] mb-2">
                Password
              </span>
              <input
                name="password"
                type="password"
                autoFocus
                required
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a1a1a] text-[#1a1a1a]"
              />
            </label>
            {error && (
              <p className="text-sm text-red-600">
                That password isn&apos;t right. Try again.
              </p>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] text-white px-6 py-3 hover:bg-black transition-colors text-sm font-medium"
            >
              Sign in
            </button>
            <p className="text-xs text-[#888] pt-2">
              Forgot your password? Reset it via <code className="bg-white px-1.5 py-0.5 rounded text-[#1a1a1a]">npx wrangler secret put ADMIN_PASSWORD --name vdtsites</code>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
