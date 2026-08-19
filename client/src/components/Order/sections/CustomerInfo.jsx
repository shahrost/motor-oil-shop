function CustomerInfo({ customer, handleChange }) {
  return (
    <>
      <h2 className="text-xl font-extrabold text-black mb-6">
        👤 اطلاعات مشتری
      </h2>

      <input
        name="name"
        value={customer.name}
        onChange={handleChange}
        placeholder="نام و نام خانوادگی"
        className="w-full border rounded-xl p-4 mb-4"
        required
      />

      <input
        name="phone"
        value={customer.phone}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");

          if (value.length <= 11) {
            handleChange({
              target: {
                name: "phone",
                value,
              },
            });
          }
        }}
        placeholder="مثال: 09198334264"
        maxLength="11"
        className="w-full border rounded-xl p-4 mb-4"
        required
      />

      <select
        name="area"
        value={customer.area}
        onChange={handleChange}
        className="w-full border rounded-xl p-4 mb-4"
        required
      >
        <option value="">انتخاب منطقه</option>
        <option>پرند</option>
        <option>رباط کریم</option>
        <option>نسیم شهر</option>
        <option>نصیرشهر</option>
        <option>جاده ساوه</option>
        <option>بهارستان</option>
        <option>صباشهر</option>
        <option>اسدآباد</option>
      </select>

      <textarea
        name="address"
        value={customer.address}
        onChange={handleChange}
        placeholder="آدرس دقیق"
        rows="4"
        className="w-full border rounded-xl p-4 mb-5"
        required
      />
    </>
  );
}

export default CustomerInfo;
