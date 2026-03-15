import Link from "next/link";

const navLinks = [
  { href: "/projects", label: "Проекты" },
  { href: "/materials", label: "Материалы" },
  { href: "/inspiration", label: "Вдохновение" },
  { href: "/contacts", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="bg-[#181B20] text-[#D0D3D9]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-sm font-medium uppercase text-[#E4E6EA] label-wide tracking-[0.15em]"
            >
              VILINS
            </Link>
            <p className="mt-4 text-sm font-light leading-relaxed text-[#8A919C]">
              Декоративный металл для лобби и фасадов.
              <br />
              От первого чертежа до монтажа.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase text-[#6B7280] label-wide tracking-[0.15em]">
              Навигация
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-light text-[#8A919C] transition-colors hover:text-[#E4E6EA]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase text-[#6B7280] label-wide tracking-[0.15em]">
              Контакты
            </p>
            <div className="flex flex-col gap-3 text-sm font-light">
              <a
                href="mailto:hello@vilins.ru"
                className="text-[#8A919C] transition-colors hover:text-[#E4E6EA]"
              >
                hello@vilins.ru
              </a>
              <a
                href="tel:+74951234567"
                className="text-[#8A919C] transition-colors hover:text-[#E4E6EA]"
              >
                +7 (495) 123‑45‑67
              </a>
              <a
                href="https://vilins.ru/portfolio"
                className="text-[#8A919C] transition-colors hover:text-[#E4E6EA]"
              >
                vilins.ru/portfolio
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#22262D] pt-8">
          <p className="text-xs font-light text-[#5B6472]">
            © 2025 VILINS. Декоративный металл.
          </p>
        </div>
      </div>
    </footer>
  );
}
