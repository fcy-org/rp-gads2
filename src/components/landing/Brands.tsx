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

type BrandsProps = {
  compact?: boolean;
};

export const Brands = ({ compact = false }: BrandsProps) => {
  const content = (
    <>
      <p className={`text-center text-sm font-bold uppercase tracking-wider ${compact ? "text-white/85" : "text-muted-foreground"}`}>
        Trabalhamos com as marcas que seu cliente procura
      </p>
      <div className={`grid grid-cols-3 gap-3 ${compact ? "mt-4" : "mt-8 sm:grid-cols-4 md:grid-cols-6"}`}>
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-center rounded-lg bg-card px-3 py-4 transition-all hover:shadow-card"
            title={b.name}
          >
            <img src={b.logo} alt={b.name} className="h-10 w-full object-contain sm:h-12" />
          </div>
        ))}
      </div>
    </>
  );

  if (compact) {
    return (
      <div className="rounded-2xl bg-white/10 p-4 shadow-blue ring-1 ring-white/20 backdrop-blur">
        {content}
      </div>
    );
  }

  return (
    <section className="bg-muted/40 py-14 sm:py-16">
      <div className="container-tight">{content}</div>
    </section>
  );
};
