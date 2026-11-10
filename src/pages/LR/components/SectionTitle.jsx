export function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-cyan-200" : "text-sky-700"}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}) {
  return (
    <div className={`mb-12 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem] ${light ? "text-white" : "text-slate-950"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${light ? "text-slate-300" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
