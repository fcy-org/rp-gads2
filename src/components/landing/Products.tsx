import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const productImages = [
  "WhatsApp Image 2026-04-27 at 14.40.55 (2).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.56 (1).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.56 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.57.jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.58 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.59 (3).jpeg",
  "WhatsApp Image 2026-04-27 at 14.40.59.jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.00 (1).jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.01 (2).jpeg",
  "WhatsApp Image 2026-04-27 at 14.41.01 (3).jpeg",
];

export const Products = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Mix de Produtos</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Tudo que sua loja precisa em <span className="text-primary">um único fornecedor</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Mais de 4.000 SKUs de marcas líderes para abastecer seu estoque.
        </p>
      </div>

      <div className="mt-10">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {productImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl border-2 border-border overflow-hidden bg-card shadow-card">
                  <img
                    src={`/products/${image}`}
                    alt={`Produto ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 md:-left-12" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 md:-right-12" />
        </Carousel>
      </div>
    </div>
  </section>
);
