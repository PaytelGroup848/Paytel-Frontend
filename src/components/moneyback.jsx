export default function moneyBack() {
  return (
    <div className="w-full flex justify-center px-4 py-8 sm:py-10 lg:py-12">
      <div
        className="w-full overflow-hidden rounded-2xl shadow-lg"
        style={{ maxWidth: "90vw" }}
      >
        <img
          src="/moneyback.webp" 
          alt="Money back guarantee"
          className="w-full h-auto block object-cover"
        />
      </div>
    </div>
  );
}