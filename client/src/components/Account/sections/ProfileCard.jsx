// اطلاعات مشتری + دکمه‌ی خروج
function ProfileCard({ customer, logout, t }) {
  return (
    <div className="bg-white rounded-3xl shadow p-8 text-center">
      <h1 className="text-2xl font-extrabold mb-6">{t("account.title")}</h1>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-right">
        <p className="mb-2">
          <b>{t("account.name")}</b> {customer?.name}
        </p>

        <p>
          <b>{t("account.phone")}</b> {customer?.phone}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
      >
        {t("account.logout")}
      </button>
    </div>
  );
}

export default ProfileCard;
