export default function TrustBadge() {
  return (
    <div className="w-full flex justify-center py-8 md:py-10">
      <div className="w-full max-w-5xl ">
        <img
          src="/trusted.jpg"
          alt="Trusted badge"
          className="
            w-full
            h-20 md:h-28
            object-contain
            border-none outline-none
          "
          loading="lazy"
        />
      </div>
    </div>
  );
}