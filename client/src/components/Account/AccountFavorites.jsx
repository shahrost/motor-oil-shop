import { useContext } from "react";
import useAccountFavorites from "./hooks/useAccountFavorites";
import LanguageContext from "../../context/LanguageContext";
import { AccountTabs, FavoritesList } from "./sections";

// «علاقه‌مندی‌های من»
function AccountFavorites() {
  const { t } = useContext(LanguageContext);
  const { favoriteProducts, loading } = useAccountFavorites();

  return (
    <div className="max-w-5xl mx-auto my-10 px-5 space-y-6">
      <AccountTabs t={t} />

      <FavoritesList products={favoriteProducts} loading={loading} t={t} />
    </div>
  );
}

export default AccountFavorites;
