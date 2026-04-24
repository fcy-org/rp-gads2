import pampers from "@/assets/pampers-logo-1.png";
import huggies from "@/assets/huggies-logo-2.png";
import mamypoko from "@/assets/logo-mamypoko-02.png";
import johnson from "@/assets/johnson-logo.png";
import nivea from "@/assets/NIVEA-logo.png";
import dove from "@/assets/Dove_logo.png";
import colgate from "@/assets/colgate-logo-1.svg";
import palmolive from "@/assets/Palmolive_logo_2019.png";
import sundown from "@/assets/sundown-logo.png";
import garnier from "@/assets/garnier-logo.png";
import loreal from "@/assets/loreal-logo.png";
import lux from "@/assets/Lux-Logo.png";

const brands = [
  { name: "Pampers", logo: pampers },
  { name: "Huggies", logo: huggies },
  { name: "MamyPoko", logo: mamypoko },
  { name: "Johnson's", logo: johnson },
  { name: "Nivea", logo: nivea },
  { name: "Dove", logo: dove },
  { name: "Colgate", logo: colgate },
  { name: "Palmolive", logo: palmolive },
  { name: "Sundown", logo: sundown },
  { name: "Garnier", logo: garnier },
  { name: "L'Oréal", logo: loreal },
  { name: "Lux", logo: lux },
];

export const Brands = () => (
  <section className="bg-muted/40 py-14 sm:py-16">
    <div className="container-tight">
      <p className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Trabalhamos com as marcas que seu cliente procura
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((b) => (
          <div
            key={b.name}
            className="group relative flex h-24 items-center justify-center rounded-2xl bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            <img
              src={b.logo}
              alt={`${b.name} logo`}
              className="max-h-full max-w-full object-contain transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
