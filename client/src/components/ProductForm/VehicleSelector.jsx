function VehicleSelector({ product, updateField }) {
  const vehicles = [
    "پراید",
    "تیبا",
    "ساینا",
    "کوییک",
    "پژو 405",
    "پژو پارس",
    "پژو 206",
    "پژو 207",
    "سمند",
    "دنا",
    "رانا",
    "شاهین",
    "ال 90",
    "زانتیا",
    "ریو",
    "نیسان",
    "ایسوزو",
    "ولوو",
    "اسکانیا",
    "بنز",
    "مان",
    "موتورسیکلت",
    "ماشین آلات صنعتی",
    "ماشین آلات راهسازی",
  ];

  function handleVehicleChange(vehicle) {
    let selected = [...product.vehicles];

    if (selected.includes(vehicle)) {
      selected = selected.filter((item) => item !== vehicle);
    } else {
      selected.push(vehicle);
    }

    updateField("vehicles", selected);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">خودروها و کاربرد محصول</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {vehicles.map((vehicle) => (
          <label
            key={vehicle}
            className="border rounded-lg p-3 cursor-pointer hover:bg-gray-100 flex gap-2 items-center"
          >
            <input
              type="checkbox"
              checked={product.vehicles.includes(vehicle)}
              onChange={() => handleVehicleChange(vehicle)}
            />

            <span>{vehicle}</span>
          </label>
        ))}
      </div>

      {product.vehicles.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold mb-2">انتخاب شده:</p>

          <div className="flex flex-wrap gap-2">
            {product.vehicles.map((item) => (
              <span key={item} className="bg-yellow-400 px-3 py-1 rounded-lg">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleSelector;
