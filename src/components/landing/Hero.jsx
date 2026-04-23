function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      <p className="text-xs tracking-[0.5em] uppercase mb-6 opacity-50">
        Tempus fugit
      </p>

      <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
        Memento Mori
      </h1>

      <p className="text-base md:text-lg max-w-xl opacity-70 leading-relaxed mb-10">
        Tu vida tiene aproximadamente <strong>4.000 semanas</strong>. 
        Esta aplicación te ayuda a visualizarlas, una por una.
      </p>

      <button className="border border-black dark:border-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200">
        Ver mi calendario
      </button>

    </section>
  )
}

export default Hero