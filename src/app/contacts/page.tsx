"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Footer } from "@/components/footer";

export default function ContactsPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-[#1C1F26]">
      <section className="flex min-h-screen items-center pt-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
                Контакты
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                Обсудим
                <br />
                ваш проект
              </h1>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[#8A919C]">
                Расскажите о вашем объекте — мы предложим решение по металлу,
                срокам и бюджету. Первая консультация бесплатна.
              </p>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                    Email
                  </p>
                  <a
                    href="mailto:hello@vilins.ru"
                    className="mt-1 block text-lg font-light text-[#E4E6EA] transition-colors hover:text-white"
                  >
                    hello@vilins.ru
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                    Телефон
                  </p>
                  <a
                    href="tel:+74951234567"
                    className="mt-1 block text-lg font-light text-[#E4E6EA] transition-colors hover:text-white"
                  >
                    +7 (495) 123‑45‑67
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                    Адрес
                  </p>
                  <p className="mt-1 text-lg font-light text-[#E4E6EA]">
                    Москва, Пресненская набережная, 12
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                    Портфолио
                  </p>
                  <a
                    href="/projects"
                    className="mt-1 block text-lg font-light text-[#E4E6EA] transition-colors hover:text-white"
                  >
                    vilins.ru/portfolio →
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-sm border border-[#22262D] bg-[#22262D]/50 p-12 text-center">
                  <div className="h-12 w-12 rounded-full border border-[#4B5563] flex items-center justify-center">
                    <svg className="h-5 w-5 text-[#8A919C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">Заявка отправлена</h3>
                  <p className="mt-2 text-sm font-light text-[#8A919C]">
                    Мы свяжемся с вами в течение рабочего дня.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6 rounded-sm border border-[#22262D] bg-[#22262D]/50 p-8 backdrop-blur-sm md:p-10"
                >
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                      Имя
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-2 block w-full border-b border-[#5B6472]/40 bg-transparent pb-2 text-sm font-light text-[#E4E6EA] outline-none transition-colors placeholder:text-[#5B6472] focus:border-[#8A919C]"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                      Компания
                    </label>
                    <input
                      type="text"
                      className="mt-2 block w-full border-b border-[#5B6472]/40 bg-transparent pb-2 text-sm font-light text-[#E4E6EA] outline-none transition-colors placeholder:text-[#5B6472] focus:border-[#8A919C]"
                      placeholder="Название компании"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-2 block w-full border-b border-[#5B6472]/40 bg-transparent pb-2 text-sm font-light text-[#E4E6EA] outline-none transition-colors placeholder:text-[#5B6472] focus:border-[#8A919C]"
                      placeholder="email@company.ru"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                      Сообщение
                    </label>
                    <textarea
                      rows={4}
                      className="mt-2 block w-full resize-none border-b border-[#5B6472]/40 bg-transparent pb-2 text-sm font-light text-[#E4E6EA] outline-none transition-colors placeholder:text-[#5B6472] focus:border-[#8A919C]"
                      placeholder="Расскажите о вашем проекте"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border border-[#5B6472] px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#E4E6EA] transition-all duration-300 hover:border-[#8A919C] hover:bg-white/5 hover:text-white"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
