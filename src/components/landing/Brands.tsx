import pampers from "@/assets/pampers-logo-1.png";
import huggies from "@/assets/huggies logo.png";
import mamypoko from "@/assets/logo-mamypoko-02.png";
import johnson from "@/assets/Johnson_and_Johnson_Logo.svg";
import nivea from "@/assets/NIVEA-logo.png";
import dove from "@/assets/Dove_logo.png";
import colgate from "@/assets/colgate-logo-1.svg";
import palmolive from "@/assets/Palmolive_logo_2019.png";
import sundown from "@/assets/sundown-logo.png";
import garnier from "@/assets/Garnier-Logo.png";
import loreal from "@/assets/L'Oréal_logo.svg.png";
import lux from "@/assets/Lux_logo.jpg";

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
      <div className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-center rounded-lg bg-card px-3 py-4 transition-all hover:shadow-card"
            title={b.name}
          >
            <img src={b.logo} alt={b.name} className="h-12 w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
