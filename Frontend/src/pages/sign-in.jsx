import AuthForm from "@/components/auth-form";
import AuthThemeToggle from "@/components/auth-theme-toggle";

const SignIn = () => (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
    <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
      <AuthThemeToggle />
    </div>
    <div className="pointer-events-none absolute -left-32 top-10 size-72 rounded-full border-[30px] border-primary/10" />
    <div className="pointer-events-none absolute -bottom-40 -right-20 size-96 rounded-full border border-primary/10" />
    <AuthForm mode="signin" />
  </main>
);

export default SignIn;
