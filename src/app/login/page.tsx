"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <form onSubmit={go} className="card w-full max-w-md">
        <h1 className="text-3xl font-black">Đăng nhập</h1>
        <p className="mt-2 text-sm text-stone-500">
          Đăng nhập bằng tài khoản đã tạo trong Supabase Auth.
        </p>

        <label className="mt-6 block text-sm font-semibold">Email</label>
        <input
          className="input mt-2"
          placeholder="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mt-4 block text-sm font-semibold">Mật khẩu</label>
        <input
          className="input mt-2"
          placeholder="Mật khẩu"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button className="primary mt-5 w-full" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}
