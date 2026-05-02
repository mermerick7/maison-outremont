export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Logo typographique Maison Outremont */}
        <div className="mb-12">
          <div className="text-xs tracking-[0.4em] text-stone mb-4 uppercase">
            Depuis 2010
          </div>
          <h1 className="font-serif text-6xl md:text-7xl text-navy leading-tight tracking-tight">
            Maison
            <br />
            Outremont
          </h1>
          <div className="text-sm tracking-[0.3em] text-stone mt-6 uppercase">
            Paris · Montréal
          </div>
        </div>

        {/* Séparateur élégant */}
        <div className="w-16 h-px bg-tobacco mx-auto my-12"></div>

        {/* Baseline */}
        <p className="font-serif text-2xl md:text-3xl text-charcoal italic font-light leading-relaxed">
          Le vestiaire intemporel
          <br />
          de l&apos;homme moderne
        </p>

        {/* Description */}
        <p className="text-base text-charcoal/70 mt-8 max-w-md mx-auto leading-relaxed">
          Tailoring contemporain et savoir-faire français.
          Une maison de prêt-à-porter masculin entre tradition et modernité.
        </p>

        {/* Mention bas de page */}
        <div className="mt-16 text-xs tracking-[0.3em] text-stone uppercase">
          Site en développement
        </div>
      </div>
    </main>
  );
}