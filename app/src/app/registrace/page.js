// Stránka /registrace
import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Registrace" };

export default function RegisterPage() {
  return (
    <section className="card narrow">
      <h2>Registrace</h2>
      <Suspense>
        <AuthForm mode="register" />
      </Suspense>
    </section>
  );
}
