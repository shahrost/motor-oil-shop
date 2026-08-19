function DashboardCard({ title, value, icon, color = "bg-white" }) {
  return (
    <div
      className={`
      ${color}
      rounded-xl
      shadow
      p-5
      text-center
      `}
    >
      <div className="text-3xl mb-3">{icon}</div>

      <p
        className="
      font-bold
      text-gray-600
      "
      >
        {title}
      </p>

      <p
        className="
      text-3xl
      font-bold
      mt-3
      "
      >
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;
