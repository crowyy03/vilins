"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Footer } from "@/components/footer";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    caption: "Лобби премиального ЖК",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    caption: "Фасадные панели",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    caption: "Входная группа",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    caption: "Пространственный дизайн",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    caption: "PVD-покрытие нитридом титана",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    caption: "Архитектурные чертежи",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    caption: "Металлообработка",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    caption: "Детали из латуни",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    caption: "Кинетический фасад",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    caption: "Лифтовые порталы",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    caption: "Монтаж на объекте",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80",
    caption: "Стеновые панели",
    span: "col-span-1 row-span-1",
  },
];

function GalleryItem({
  item,
  index,
}: {
  item: (typeof images)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-sm bg-[#22262D] ${item.span}`}
    >
      <img
        src={item.src}
        alt={item.caption}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#181B20]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="p-4 text-xs font-light text-[#D0D3D9]">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function InspirationPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <main className="bg-[#1C1F26]">
      <section className="flex min-h-[50vh] items-end pb-16 pt-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
              Галерея
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Вдохновение
            </h1>
            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-[#8A919C]">
              Референсы, текстуры, пространства. Визуальный язык VILINS.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10 lg:px-16">
        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:auto-rows-[280px]">
          {images.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
