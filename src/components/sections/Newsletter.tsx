"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-brand-50 py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-neutral-950">
              Únete a la familia barefoot
            </h3>
            <p className="mt-2 text-neutral-500">
              Recibe consejos, guías y ofertas exclusivas sobre calzado barefoot
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md"
          >
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-l-lg border border-neutral-300 bg-white px-6 py-4 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-neutral-950 px-6 py-4 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
