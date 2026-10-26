import { APP_STORES } from "../../../data/appStores";

function StoreLinks() {
  return (
    <div className="mt-6">
      <p className="text-center text-gray-600 text-sm">
        یا اپلیکیشن اندروید را از فروشگاه دریافت کنید:
      </p>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {APP_STORES.map((store) =>
          store.url ? (
            <a
              key={store.key}
              href={store.url}
              target="_blank"
              rel="noreferrer"
              className="text-center bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-bold"
            >
              {store.label}
            </a>
          ) : (
            <span
              key={store.key}
              aria-disabled="true"
              className="text-center bg-gray-200 text-gray-500 px-4 py-3 rounded-lg font-bold cursor-not-allowed"
            >
              {store.label} <span className="text-xs font-normal">(به‌زودی)</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export default StoreLinks;
