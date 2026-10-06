// تصویر کارت «خودروهای من»: یک خودروی فرضی بدون برند
function CarArt() {
  return (
    <svg viewBox="0 0 160 80" aria-hidden="true" className="h-32 w-auto drop-shadow-lg">
      <path
        d="M14 56V46c0-4 2.6-7.2 6.4-8.2l14-3.6 15-16.4A12 12 0 0 1 58.2 14h38.6a12 12 0 0 1 9.2 4.3l13 15.2 18 4.2c4.2 1 7 4.6 7 8.9V56c0 3-2.4 5.4-5.4 5.4H134a14 14 0 0 0-27.6 0H58.6a14 14 0 0 0-27.6 0h-11.6C16.4 61.4 14 59 14 56Z"
        className="fill-gray-800"
      />

      <path d="M54 24 41 36h29V22h-11a7 7 0 0 0-5 2Zm22-2v14h36l-9.6-11.4A7 7 0 0 0 97 22H76Z" fill="#cfe3f5" />

      <rect x="128" y="42" width="10" height="5" rx="2.5" fill="#faa61a" />

      <circle cx="44.8" cy="62" r="11" className="fill-gray-900" />
      <circle cx="44.8" cy="62" r="4.5" className="fill-gray-300" />
      <circle cx="120.2" cy="62" r="11" className="fill-gray-900" />
      <circle cx="120.2" cy="62" r="4.5" className="fill-gray-300" />
    </svg>
  );
}

export default CarArt;
