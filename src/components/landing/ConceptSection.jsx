const concepts = [
  {
    id: 1,
    number: "01",
    title: "4.000 semanas",
    text: "Si vivís hasta los 80 años, tu vida equivale a aproximadamente 4.000 semanas. Menos de lo que parece.",
  },
  {
    id: 2,
    number: "02",
    title: "El tiempo no vuelve",
    text: "Cada celda del calendario representa una semana que ya pasó o que está por venir. No se puede pausar.",
  },
  {
    id: 3,
    number: "03",
    title: "Vivir con intención",
    text: "Visualizar tu tiempo restante no es morboso, es claridad. Saber que es finito te ayuda a elegir mejor.",
  },
];

function ConceptSection() {
  return (
    <section className="relative px-6 py-32 overflow-hidden border-t border-white/10">

      {/* fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* heading */}
        <div className="text-center mb-28 md:mb-32">
          <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase opacity-40 mb-5">
            Tempus fugit
          </p>

          <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
            Ver el tiempo
            <br />
            cambia todo
          </h2>

          <p className="mt-6 text-sm md:text-base max-w-xl mx-auto opacity-50 font-light leading-relaxed">
            Cuando el tiempo deja de ser abstracto, las decisiones cambian.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch place-items-stretch">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="
                group relative w-full h-full
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                min-h-[260px]
                transition-all duration-500
                hover:-translate-y-2
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:shadow-2xl
              "
            >
              {/* número decorativo */}
              <span className="absolute top-6 right-6 text-6xl font-bold opacity-[0.04] group-hover:opacity-[0.08] transition duration-500 select-none">
                {concept.number}
              </span>

              {/* línea superior */}
              <div className="w-10 h-px bg-white/20 mb-8 group-hover:w-16 transition-all duration-500" />

              {/* título */}
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-5">
                {concept.title}
              </h3>

              {/* texto */}
              <p className="text-sm md:text-base leading-relaxed opacity-60 font-light">
                {concept.text}
              </p>

              {/* glow inferior */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/[0.02] to-transparent rounded-b-3xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConceptSection;