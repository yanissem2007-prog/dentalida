import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
      <LoginForm />
    </Suspense>
  );
}
