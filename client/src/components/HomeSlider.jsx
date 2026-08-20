import { useContext, useEffect, useState } from "react";
import LanguageContext from "../context/LanguageContext";

function HomeSlider() {
  const { t } = useContext(LanguageContext);

  const slides = [
    {
      icon: "🚚",
      title: t("homeSlider.slide1.title"),
      text: t("homeSlider.slide1.text"),
      color: "from-green-600 to-green-800",
    },

    {
      icon: "💳",
      title: t("homeSlider.slide2.title"),
      text: t("homeSlider.slide2.text"),
      color: "from-blue-600 to-blue-800",
    },

    {
      icon: "🔥",
      title: t("homeSlider.slide3.title"),
      text: t("homeSlider.slide3.text"),
      color: "from-yellow-500 to-yellow-700",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  function nextSlide() {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }

  function prevSlide() {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  return (
    <section className="p-6 md:p-10">
      <div
        className={`
          max-w-6xl mx-auto
          rounded-3xl
          bg-linear-to-l
          ${slides[current].color}
          text-white
          shadow-xl
          p-8 md:p-14
          text-center
          transition-all duration-500
        `}
      >
        <div className="text-5xl mb-5">{slides[current].icon}</div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          {slides[current].title}
        </h2>

        <p className="mt-5 text-lg text-white">{slides[current].text}</p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl font-bold"
          >
            {t("homeSlider.prev")}
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl font-bold"
          >
            {t("homeSlider.next")}
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                w-3 h-3 rounded-full
                ${current === index ? "bg-white" : "bg-white/40"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;
