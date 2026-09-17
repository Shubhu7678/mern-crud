import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

const AuthForm = ({ mode }) => {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (isSignup && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      if (isSignup) {
        await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      } else {
        await login({ email: form.email.trim(), password: form.password });
      }
      navigate(location.state?.from || "/home", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <LockKeyhole className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold tracking-tight">TaskFlow</p>
          <p className="text-xs text-muted-foreground">Your focused workspace</p>
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8">
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Welcome</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isSignup ? "Create your workspace" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {isSignup
              ? "Set up your account and turn your next step into momentum."
              : "Sign in to pick up exactly where you left off."}
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <label className="block space-y-2">
              <span className="text-sm font-medium">Full name</span>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input required minLength={2} value={form.name} onChange={updateField("name")} placeholder="Alex Morgan" className="h-11 rounded-xl pl-9" />
              </div>
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-sm font-medium">Email address</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input required type="email" value={form.email} onChange={updateField("email")} placeholder="you@example.com" className="h-11 rounded-xl pl-9" />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Password</span>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input required minLength={8} type={showPassword ? "text" : "password"} value={form.password} onChange={updateField("password")} placeholder="At least 8 characters" className="h-11 rounded-xl px-9" />
              <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </label>

          {isSignup && (
            <label className="block space-y-2">
              <span className="text-sm font-medium">Confirm password</span>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input required minLength={8} type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={updateField("confirmPassword")} placeholder="Repeat your password" className="h-11 rounded-xl pl-9" />
              </div>
            </label>
          )}

          <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-xl">
            {isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
            {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "New to TaskFlow?"}{" "}
          <Link className="font-semibold text-primary hover:underline" to={isSignup ? "/signin" : "/signup"}>
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
