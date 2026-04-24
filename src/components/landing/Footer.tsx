import logo from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-primary-deep py-10 text-white/80">
    <div className="container-tight">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Rio Piranhas" width={40} height={40} className="h-10 w-10" />
          <div>
            <div className="font-display text-base font-extrabold text-white">RIO PIRANHAS</div>
            <div className="text-xs">Distribuidora · MA & PI</div>
          </div>
        </div>
        <div className="text-center text-xs sm:text-right">
          <div>© {new Date().getFullYear()} Rio Piranhas. Todos os direitos reservados.</div>
          <div className="mt-1">CNPJ 00.000.000/0001-00</div>
        </div>
      </div>
    </div>
  </footer>
);
