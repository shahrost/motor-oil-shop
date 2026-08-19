function Features({ features }) {
  return (
    <section className="px-5 mt-14">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {features.map((item) => (
            <div
              key={item.title}
              className="
                bg-white
                rounded-3xl
                shadow
                p-6
                text-center
              "
            >
              <div className="text-4xl">{item.icon}</div>

              <h3
                className="
                  font-bold
                  text-lg
                  mt-4
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-gray-600
                  text-sm
                  mt-3
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
