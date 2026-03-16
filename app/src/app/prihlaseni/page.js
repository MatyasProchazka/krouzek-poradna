// Stránka /prihlaseni
import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Přihlášení · Poradna" };

export default function LoginPage() {
  return (
    <section className="card narrow">
      <h2>Přihlášení</h2>
      {/* AuthForm čte parametry z adresy (useSearchParams), proto ho Next.js
          chce obalit do <Suspense>. Ten určuje, co ukázat, než se načte. */}
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </section>
  );
}
