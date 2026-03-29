"use client";

import Link from "next/link";

export default function EstadoPedidoPage() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter']">
      <header className="bg-[#f7f6f4] px-6 py-10">
        <div className="mx-auto max-w-[1354px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[14px] text-[#6b6b6b] hover:text-[#2d2d2d]"
          >
            ← Volver
          </Link>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#c4b5a0] shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m7.5 4.21 9 5.19" />
                <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z" />
                <path d="M3.27 6.96 12 12.01 20.73 6.96" />
                <path d="M12 22.08V12" />
              </svg>
            </div>
            <div>
              <h1 className="text-[28px] font-medium leading-tight text-[#2d2d2d] sm:text-[32px]">
                Estado del Pedido
              </h1>
              <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-[#6b6b6b]">
                Rastrea tu pedido en tiempo real y conoce exactamente dónde está.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="mx-auto max-w-[500px] rounded-2xl border border-[#e8e6e3] bg-white p-10">
          <div className="flex justify-center text-[#c4b5a0]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-[24px] font-medium text-[#2d2d2d]">
            Busca tu pedido
          </h2>
          <p className="mt-2 text-center text-[15px] text-[#6b6b6b]">
            Introduce tu número de pedido y email para ver el estado
          </p>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label
                htmlFor="order-number"
                className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
              >
                Número de pedido
              </label>
              <input
                id="order-number"
                name="orderNumber"
                type="text"
                placeholder="Ej: #10234"
                autoComplete="off"
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] px-4 text-[#2d2d2d] placeholder:text-[#6b6b6b]/60 focus:border-[#c4b5a0] focus:outline-none focus:ring-2 focus:ring-[#c4b5a0]/25"
              />
            </div>
            <div>
              <label
                htmlFor="order-email"
                className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
              >
                Email de confirmación
              </label>
              <input
                id="order-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                className="h-[52px] w-full rounded-xl border border-[#e8e6e3] px-4 text-[#2d2d2d] placeholder:text-[#6b6b6b]/60 focus:border-[#c4b5a0] focus:outline-none focus:ring-2 focus:ring-[#c4b5a0]/25"
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex h-14 w-full items-center justify-center rounded-full bg-[#c4b5a0] text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            >
              🔍 Buscar pedido
            </button>
          </form>

          <p className="mt-8 text-center text-[14px] text-[#6b6b6b]">
            ¿Tienes una cuenta con nosotros?{" "}
            <Link
              href="/cuenta"
              className="font-medium text-[#c4b5a0] underline-offset-2 hover:underline"
            >
              Accede a tu cuenta para ver todos tus pedidos →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
