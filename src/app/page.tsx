import { Hero } from "@/components/hero";
import { StorySection } from "@/components/story-section";
import { HotspotSection } from "@/components/hotspot-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { storyScenes } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />

      <StorySection
        id="scene-01"
        mediaId="scene-01_media"
        label="01 — Первый шаг"
        heading="Сначала — понять пространство"
        headingSize="6xl"
        subheading="Обмер. Сценарии движения. База для всего металла."
        paragraph="VILINS выезжает на объект, фиксирует реальную геометрию лобби и сценарии движения. На базе обмеров рождается 3D‑модель и чертежи, к которым позже будет «привязан» весь металл — от стойки ресепшн до последней панели."
        bullets={[
          { text: "Выезд инженеров на объект" },
          { text: "Обмеры и 3D‑модель лобби" },
          { text: "Концепция навигации и сценариев" },
        ]}
        align="left"
        videoSrc={storyScenes["scene-01"].videoSrc}
        posterSrc={storyScenes["scene-01"].posterSrc}
      />

      <StorySection
        id="scene-02"
        mediaId="scene-02_media"
        label="02 — Проектирование"
        heading="Свой завод и одна из немногих камер нитрида титана в России"
        headingSize="5xl"
        paragraph="Рабочие чертежи уходят на собственный завод VILINS: раскрой, гибка, сварка, шлифовка. Здесь металл получает PVD‑покрытие нитридом титана в крупноформатной камере — одна из двух таких в России. Это позволяет держать одинаковый оттенок металла на всех деталях внутри одного лобби и от проекта к проекту."
        bullets={[
          { text: "PVD‑камера крупного формата — стабильный оттенок на больших деталях" },
          { text: "Полный цикл в одном цехе — от раскроя до упаковки" },
          { text: "Контроль геометрии и цвета на каждом этапе" },
        ]}
        align="right"
        videoSrc={storyScenes["scene-02"].videoSrc}
        posterSrc={storyScenes["scene-02"].posterSrc}
      />

      <StorySection
        id="scene-03"
        mediaId="scene-03_media"
        label="03 — Производство"
        heading="Готовые элементы — на объект"
        headingSize="6xl"
        paragraph="После контроля геометрии и цвета каждая стойка, панель и портал упаковываются в комплект под конкретное лобби. Заводская партия уезжает на объект уже в нужной последовательности монтажа — чтобы из пустого пространства можно было быстро собрать готовое решение."
        bullets={[
          {
            text: "Маркировка элементов под конкретное лобби",
          },
          { text: "Логистика под график стройки" },
          { text: "Ответственный за металл с вашей стороны" },
        ]}
        align="left"
        videoSrc={storyScenes["scene-03"].videoSrc}
        posterSrc={storyScenes["scene-03"].posterSrc}
      />

      <StorySection
        id="scene-04"
        mediaId="scene-04_media"
        label="04 — Монтаж"
        heading="Из деталей — в живое пространство"
        headingSize="5xl"
        paragraph="На объект выходит не набор разрозненных изделий, а продуманная система: стойки ресепшн, почтовые блоки, панели, навигация, ограждения. VILINS собирает всё в один комплект, чтобы монтаж прошёл быстро и без доработок по месту."
        facts={[
          { value: "от 3 мес", label: "полный цикл" },
          { value: "1 подрядчик", label: "вместо 5 по металлу" },
          { value: "3D", label: "согласование через макеты" },
        ]}
        align="right"
        videoSrc={storyScenes["scene-04"].videoSrc}
        posterSrc={storyScenes["scene-04"].posterSrc}
      />

      <HotspotSection />

      <StorySection
        id="scene-06"
        mediaId="scene-06_media"
        label="06 — Фасад"
        heading="Тот же металл — на фасаде"
        headingSize="5xl"
        paragraph="VILINS выводит язык металла за пределы лобби: фасадные панели, козырьки, входные группы и навигация снаружи. Здание считывается цельно — от улицы до последней кнопки в лифте."
        facts={[
          {
            value: "Кинетика",
            label: "Кинетические и статичные фасадные панели",
          },
          {
            value: "Защита",
            label: "Защищённые покрытия под городской климат",
          },
          {
            value: "Концепция",
            label: "Согласование с архитектурной концепцией",
          },
        ]}
        align="left"
        videoSrc={storyScenes["scene-06"].videoSrc}
        posterSrc={storyScenes["scene-06"].posterSrc}
      />

      <CtaSection />
      <Footer />
    </main>
  );
}
