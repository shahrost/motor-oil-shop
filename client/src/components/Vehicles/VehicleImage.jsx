function VehicleImage({ vehicle, name, className = "" }) {
  if (vehicle.image) {
    return (
      <img
        src={vehicle.image}
        alt={name}
        draggable={false}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={`flex items-center justify-center text-gray-300 ${className}`}
    >
      <svg
        viewBox="0 0 64 32"
        fill="currentColor"
        className="w-full h-full max-w-56"
      >
        <path d="M6 22v-4.5c0-1.4.9-2.6 2.2-3l5.3-1.6 5-5.6c.9-1 2.2-1.6 3.6-1.6h14.2c1.4 0 2.7.6 3.6 1.6l4.2 4.9 6.4 1.5c1.5.4 2.5 1.7 2.5 3.2V22c0 1-.8 1.8-1.8 1.8h-3a6 6 0 0 0-11.8 0H24.6a6 6 0 0 0-11.8 0H7.8C6.8 23.8 6 23 6 22Zm14.3-10.2-3.6 4h10.5v-5.4h-5.1c-.7 0-1.4.3-1.8 1.4Zm10.9-1.4v5.4h12.2l-3.2-3.8c-.5-.9-1.3-1.6-2.2-1.6h-6.8Z" />
        <circle cx="18.7" cy="24" r="3.5" />
        <circle cx="45.7" cy="24" r="3.5" />
      </svg>
    </div>
  );
}

export default VehicleImage;
