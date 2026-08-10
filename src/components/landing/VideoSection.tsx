export const VideoSection = () => {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="container-tight text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Conheça a Rio Piranhas</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Veja por dentro do nosso <span className="text-primary">centro de distribuição</span>
        </h2>

        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl shadow-lg">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/H9jj7fPuBmI"
            title="Vídeo Institucional Dec Rio Piranhas"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
