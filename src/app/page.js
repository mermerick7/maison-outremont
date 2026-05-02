export default function Home() {
  return (
    <main className="px-6 py-32 md:py-48">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo typographique Maison Outremont */}
        <div className="mb-12">
          <div className="text-xs tracking-[0.4em] text-stone mb-4 uppercase">
            Depuis 2010
          </div>
          <h1 className="font-serif text-6xl md:text-7xl text-navy leading-tight tracking-tight">
            Maison Outremont
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
      </div>
    </main>
  );
}