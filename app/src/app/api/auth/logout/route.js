// POST /api/auth/logout – odhlášení = smazání cookie s tokenem
//
// Pozor na rozdíl mezi JWT a session: JWT je platný až do vypršení, i když
// ho smažeme z prohlížeče. Kdyby ho někdo předtím ukradl, mohl by ho dál
// používat. Proto se tokenům dává krátká platnost. Session uložená na serveru
// jde naopak zrušit okamžitě (prostě se smaže z databáze).
import { NextResponse } from "next/server";
import { endSession } from "@/lib/auth";

export async function POST() {
  await endSession();
  return NextResponse.json({ ok: true });
}
