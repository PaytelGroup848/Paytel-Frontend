export default function MoneyBack() {
  return (
    <div className="w-full flex justify-center px-4 py-6 sm:py-8">
      <div
        className="w-full overflow-hidden rounded-2xl shadow-lg"
        style={{ maxWidth: "72vw" }}
      >
        <img
          src="/moneyback.png"
          alt="Money back guarantee"
          className="w-full object-cover block"
          style={{ height: "clamp(180px, 66vh, 340px)" }}
        />
      </div>
    </div>
  );
}