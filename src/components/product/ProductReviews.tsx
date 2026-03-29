"use client";

const REVIEWS = [
  {
    rating: 5,
    name: "Marta G.",
    date: "15 de enero, 2026",
    text: "Los primeros que probé por mi marido que es un defensor indiscutible. Sin ofrecerle a información importante, So ofrecido Sneakers a un gran calidad, plus comunicada.",
    helpful: 15,
    images: [],
    verified: true,
  },
  {
    rating: 5,
    name: "Laura T.",
    date: "8 diciembre, 2025",
    text: "Como hijo de 4 años siente tan cómoda con estas zapatillas. Son super flexibles y ligeros. La entrega fue rápida y ahorramos bastantes.",
    helpful: 10,
    images: [],
    verified: true,
  },
  {
    rating: 5,
    name: "Carolina S.",
    date: "5 de abril, 2026",
    text: "Esperando estas zapatillas deshaciéndose de las de colegios y suela ya me he dejado ya ir he dejado Machorís, para ir despacio, yo se.",
    helpful: 8,
    images: [],
    verified: true,
  },
  {
    rating: 4,
    name: "Andrés D.",
    date: "24 de diciembre, 2025",
    text: "La verdad es que el calzado es genial para el pequeño de la casa, Sor muy, sombrero y sí, vida amicable con ella.",
    helpful: 7,
    images: [],
    verified: true,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7.68333 1.53C7.71255 1.47097 7.75768 1.42129 7.81363 1.38655C7.86959 1.35181 7.93414 1.3334 8 1.3334C8.06586 1.3334 8.13041 1.35181 8.18637 1.38655C8.24232 1.42129 8.28745 1.47097 8.31667 1.53L9.85667 4.64933C9.95812 4.85464 10.1079 5.03227 10.2931 5.16697C10.4783 5.30167 10.6934 5.38941 10.92 5.42267L14.364 5.92667C14.4293 5.93612 14.4906 5.96365 14.541 6.00613C14.5914 6.04862 14.629 6.10437 14.6493 6.16707C14.6697 6.22978 14.6722 6.29694 14.6564 6.36096C14.6406 6.42498 14.6072 6.4833 14.56 6.52933L12.0693 8.95467C11.9051 9.11473 11.7822 9.31232 11.7112 9.53042C11.6403 9.74852 11.6234 9.98059 11.662 10.2067L12.25 13.6333C12.2615 13.6986 12.2545 13.7657 12.2297 13.8271C12.2049 13.8885 12.1633 13.9417 12.1097 13.9807C12.0561 14.0196 11.9927 14.0427 11.9266 14.0473C11.8605 14.0519 11.7945 14.0378 11.736 14.0067L8.65733 12.388C8.45448 12.2815 8.22879 12.2258 7.99967 12.2258C7.77055 12.2258 7.54485 12.2815 7.342 12.388L4.264 14.0067C4.20555 14.0376 4.1396 14.0515 4.07363 14.0468C4.00767 14.0421 3.94435 14.019 3.89086 13.9801C3.83738 13.9412 3.79589 13.8881 3.7711 13.8268C3.74632 13.7655 3.73924 13.6985 3.75067 13.6333L4.338 10.2073C4.3768 9.98115 4.35999 9.74893 4.28903 9.5307C4.21806 9.31246 4.09507 9.11477 3.93067 8.95467L1.44 6.53C1.3924 6.48402 1.35866 6.4256 1.34264 6.36138C1.32662 6.29717 1.32896 6.22975 1.34939 6.16679C1.36981 6.10384 1.40751 6.04789 1.45818 6.00532C1.50886 5.96275 1.57047 5.93527 1.636 5.926L5.07933 5.42267C5.30617 5.38967 5.52159 5.30204 5.70706 5.16732C5.89252 5.03261 6.04247 4.85485 6.144 4.64933L7.68333 1.53Z"
        fill={filled ? "#C4B5A0" : "none"}
        stroke="#C4B5A0"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductReviews() {
  const avgRating = 4.8;
  const totalReviews = 15;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1354px] px-6">
        <h2 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-[#2d2d2d]">
          Opiniones de Clientes
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(avgRating)} />
            ))}
          </div>
          <span className="font-['Inter'] text-[14px] leading-5 text-[#6b6b6b]">
            {avgRating} ({totalReviews} valoraciones)
          </span>
        </div>

        <div className="mt-8 divide-y divide-[#e8e6e3]">
          {REVIEWS.map((review, i) => (
            <div key={i} className="py-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} filled={j < review.rating} />
                  ))}
                </div>
                {review.verified && (
                  <span className="rounded-full bg-[#f0ede8] px-3 py-1 font-['Inter'] text-[11px] font-medium text-[#8b7e6a]">
                    Verificado
                  </span>
                )}
              </div>
              <p className="mt-3 font-['Inter'] text-[14px] font-medium leading-5 tracking-[-0.15px] text-[#2d2d2d]">
                {review.name} · {review.date}
              </p>
              <p className="mt-2 font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.15px] text-[#6b6b6b]">
                {review.text}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <button type="button" className="font-['Inter'] text-[12px] text-[#6b6b6b] hover:text-[#2d2d2d]">
                  👍 Útil ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
