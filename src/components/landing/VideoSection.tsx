import { useEffect } from "react";

export const VideoSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/0b256e8c-1ea0-49a1-a6c2-4aa9d6840568/players/69ed28e055df2a8c627ba916/v4/player.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="container-tight text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Conheça a Rio Piranhas</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Veja por dentro do nosso <span className="text-primary">centro de distribuição</span>
        </h2>

        <div className="mx-auto mt-8 max-w-3xl">
          {/* @ts-ignore */}
          <vturb-smartplayer id="vid-69ed28e055df2a8c627ba916" style={{ display: "block", margin: "0 auto", width: "100%" }} />
        </div>
      </div>
    </section>
  );
};
