// POST /api/organization/invite – vygeneruje nový kód pozvánky (jen lektor)
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { regenerateInviteCode } from "@/lib/organizations";
import { unauthorized, forbidden } from "@/lib/http";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (user.role !== "lektor") return forbidden("Kód pozvánky může měnit jen lektor.");

  const org = regenerateInviteCode(user.organizationId);
  return NextResponse.json({ inviteCode: org.inviteCode });
}
