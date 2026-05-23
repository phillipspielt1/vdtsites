import { cookies } from "next/headers";

const COOKIE = "vdt_admin";

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  const v = c.get(COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD ?? "change-me";
  return !!v && v === expected;
}

export async function setAdminCookie(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD ?? "change-me";
  if (password !== expected) return false;
  const c = await cookies();
  c.set(COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return true;
}

export async function clearAdminCookie(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}
