import { useNavigate } from "react-router-dom";
import SkullCanvas from "./SkullCanvas";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6 gap-8 bg-white dark:bg-black text-black dark:text-white">

      {/* Fondo 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SkullCanvas />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        <p className="text-xs tracking-[0.5em] uppercase opacity-40">
          Tempus fugit
        </p>

        <h1 className="text-7xl md:text-9xl font-bold leading-none tracking-tight">
          Memento<br />Mori
        </h1>

        <p className="text-sm md:text-base max-w-md opacity-60 leading-relaxed font-light">
          Tu vida tiene aproximadamente 4.000 semanas.
          Esta aplicación te ayuda a visualizarlas, una por una.
        </p>

        <button
          onClick={() => navigate("/app")}
          className="border border-black dark:border-white px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          Ver mi calendario
        </button>

      </div>
    </section>
  );
}

export default Hero;