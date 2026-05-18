import { createElement, useEffect } from "react";

const PLAYER_ID = "69ed28e055df2a8c627ba916";
const PLAYER_SCRIPT_ID = `scr_${PLAYER_ID}`;
const PLAYER_SCRIPT_URL =
  "https://scripts.converteai.net/0b256e8c-1ea0-49a1-a6c2-4aa9d6840568/players/69ed28e055df2a8c627ba916/v4/player.js";

export const VideoSection = () => {
  useEffect(() => {
    if (document.getElementById(PLAYER_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = PLAYER_SCRIPT_ID;
    script.src = PLAYER_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="container-tight text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Estrutura de atacado</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Estoque e logística para sua loja <span className="text-primary">repor mais rápido</span>
        </h2>

        <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl bg-primary-deep shadow-blue">
          {/*
            The ConverteAI player is a web component registered by the external script.
            React.createElement avoids TypeScript custom-element declarations.
          */}
          {createVslPlayer()}
        </div>
      </div>
    </section>
  );
};

const createVslPlayer = () =>
  createElement("vturb-smartplayer", {
    id: `vid-${PLAYER_ID}`,
    style: { display: "block", margin: "0 auto", width: "100%" },
  });
