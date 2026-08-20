import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function CustomerInfo({ customer, handleChange }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <h2 className="text-xl font-extrabold text-black mb-6">
        👤 {t("order.customerInfo.title")}
      </h2>

      <input
        name="name"
        value={customer.name}
        onChange={handleChange}
        placeholder={t("common.fullNamePlaceholder")}
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
        placeholder={t("order.customerInfo.phonePlaceholder")}
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
        <option value="">{t("order.customerInfo.selectArea")}</option>
        <option value="پرند">{t("order.customerInfo.areas.parand")}</option>
        <option value="رباط کریم">
          {t("order.customerInfo.areas.robatKarim")}
        </option>
        <option value="نسیم شهر">
          {t("order.customerInfo.areas.nasimShahr")}
        </option>
        <option value="نصیرشهر">
          {t("order.customerInfo.areas.nasirShahr")}
        </option>
        <option value="جاده ساوه">
          {t("order.customerInfo.areas.javadeSaveh")}
        </option>
        <option value="بهارستان">
          {t("order.customerInfo.areas.baharestan")}
        </option>
        <option value="صباشهر">
          {t("order.customerInfo.areas.sabashahr")}
        </option>
        <option value="اسدآباد">
          {t("order.customerInfo.areas.asadabad")}
        </option>
      </select>

      <textarea
        name="address"
        value={customer.address}
        onChange={handleChange}
        placeholder={t("order.customerInfo.addressPlaceholder")}
        rows="4"
        className="w-full border rounded-xl p-4 mb-5"
        required
      />
    </>
  );
}

export default CustomerInfo;
