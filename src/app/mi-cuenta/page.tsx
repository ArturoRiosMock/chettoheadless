"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "rounded-xl border border-[#e8e6e3] h-[52px] px-4 w-full font-['Inter'] text-[#2d2d2d] placeholder:text-[#6b6b6b]/60 focus:border-[#c4b5a0] focus:outline-none focus:ring-1 focus:ring-[#c4b5a0]";

export default function MiCuentaPage() {
  const [nombre, setNombre] = useState("María");
  const [apellidos, setApellidos] = useState("González López");
  const [email, setEmail] = useState("maria.gonzalez@email.com");
  const [telefono, setTelefono] = useState("+34 600 123 456");
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-['Inter']">
      <header className="border-b border-[#e8e6e3] bg-[#f7f6f4]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-1 text-[14px] text-[#6b6b6b] transition-colors hover:text-[#2d2d2d]"
          >
            ← Volver
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8e6e3] text-[#c4b5a0]"
              aria-hidden
            >
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
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <div>
              <h1 className="text-xl font-semibold text-[#2d2d2d] md:text-2xl">
                Mi Cuenta
              </h1>
              <p className="text-[15px] text-[#6b6b6b]">
                Hola, María González
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10 md:flex-row md:gap-12">
        <aside className="w-full shrink-0 md:w-[200px]">
          <nav className="flex flex-col gap-1 font-['Inter']" aria-label="Cuenta">
            <span className="rounded-xl bg-[#c4b5a0] px-4 py-3 text-[15px] font-medium text-white">
              Mi Perfil
            </span>
            <Link
              href="#"
              className="rounded-xl px-4 py-3 text-[15px] text-[#6b6b6b] transition-colors hover:bg-[#f7f6f4] hover:text-[#2d2d2d]"
            >
              Mis Pedidos
            </Link>
            <Link
              href="#"
              className="rounded-xl px-4 py-3 text-[15px] text-[#6b6b6b] transition-colors hover:bg-[#f7f6f4] hover:text-[#2d2d2d]"
            >
              Direcciones
            </Link>
            <Link
              href="#"
              className="rounded-xl px-4 py-3 text-[15px] text-[#6b6b6b] transition-colors hover:bg-[#f7f6f4] hover:text-[#2d2d2d]"
            >
              Favoritos
            </Link>
            <div className="my-4 border-t border-[#e8e6e3] pt-4">
              <p className="mb-2 px-4 text-[11px] font-semibold tracking-wider text-[#c4b5a0]">
                AJUSTES
              </p>
              <Link
                href="#"
                className="block rounded-xl px-4 py-3 text-[15px] text-[#6b6b6b] transition-colors hover:bg-[#f7f6f4] hover:text-[#2d2d2d]"
              >
                Notificaciones
              </Link>
              <Link
                href="#"
                className="block rounded-xl px-4 py-3 text-[15px] text-[#6b6b6b] transition-colors hover:bg-[#f7f6f4] hover:text-[#2d2d2d]"
              >
                Privacidad
              </Link>
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 space-y-12">
          <section aria-labelledby="info-personal-heading">
            <h2
              id="info-personal-heading"
              className="mb-6 text-lg font-semibold text-[#2d2d2d]"
            >
              Información personal
            </h2>
            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={inputClass}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellidos"
                    className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                  >
                    Apellidos
                  </label>
                  <input
                    id="apellidos"
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className={inputClass}
                    autoComplete="family-name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#c4b5a0] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Guardar cambios
              </button>
            </form>
          </section>

          <section aria-labelledby="password-heading">
            <h2
              id="password-heading"
              className="mb-6 text-lg font-semibold text-[#2d2d2d]"
            >
              Cambiar contraseña
            </h2>
            <form
              className="max-w-md space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="password-actual"
                  className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                >
                  Contraseña actual
                </label>
                <input
                  id="password-actual"
                  type="password"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  className={inputClass}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label
                  htmlFor="password-nueva"
                  className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                >
                  Nueva contraseña
                </label>
                <input
                  id="password-nueva"
                  type="password"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label
                  htmlFor="password-confirmar"
                  className="mb-2 block text-[14px] font-medium text-[#2d2d2d]"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="password-confirmar"
                  type="password"
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-[#c4b5a0] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Actualizar contraseña
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
