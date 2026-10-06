const vehicleRepository = require("../repositories/vehicleRepository");
const { splitVehicleNames, buildVehicleNameIndex } = require("../utils/vehicleNameIndex");

const FILTER_KIND = "فیلتر";

// اتصال محصولات (فیلترها) به خودروهای سازگار از ستون «خودروهای سازگار» اکسل.
// فقط لینک «فیلتر» به productLinks خودرو اضافه می‌شه؛ لینک‌های فعلی و بقیه‌ی
// اطلاعات خودرو دست نمی‌خورن. خودرویی که دقیقاً پیدا نشه ساخته یا حدس زده
// نمی‌شه و فقط گزارش می‌شه.
// entries: [{ row, sku, vehicles: "<متن خانه‌ی اکسل>" }]
// خروجی: { linked: [{ sku, vehicles }], unmatched: [{ row, sku, vehicle }] }
async function linkProductsToVehicles(entries) {
  const result = { linked: [], unmatched: [] };

  if (!entries.length) return result;

  const vehicles = await vehicleRepository.getVehiclesForLinking();
  const index = buildVehicleNameIndex(vehicles);

  // sku خودرو ← لینک‌های جدید آن
  const newLinksByVehicle = new Map();

  entries.forEach(({ row, sku, vehicles: cell }) => {
    const productSku = String(sku).toUpperCase();
    const matchedSkus = new Set();

    splitVehicleNames(cell).forEach((vehicleName) => {
      const matches = index.find(vehicleName);

      if (!matches.length) {
        result.unmatched.push({ row, sku: productSku, vehicle: vehicleName });
        return;
      }

      matches.forEach((vehicle) => {
        matchedSkus.add(vehicle.sku);

        const alreadyLinked = (vehicle.productLinks || []).some(
          (link) => String(link.sku).toUpperCase() === productSku,
        );

        if (alreadyLinked) return;

        if (!newLinksByVehicle.has(vehicle.sku)) {
          newLinksByVehicle.set(vehicle.sku, { vehicle, skus: new Set() });
        }

        newLinksByVehicle.get(vehicle.sku).skus.add(productSku);
      });
    });

    result.linked.push({ sku: productSku, vehicles: matchedSkus.size });
  });

  const ops = [...newLinksByVehicle.values()].map(({ vehicle, skus }) => {
    const lastPriority = Math.max(
      0,
      ...(vehicle.productLinks || []).map((link) => link.priority || 0),
    );

    return {
      updateOne: {
        filter: { sku: vehicle.sku },
        update: {
          $push: {
            productLinks: {
              $each: [...skus].map((sku, i) => ({
                sku,
                priority: lastPriority + i + 1,
                kind: FILTER_KIND,
              })),
            },
          },
        },
      },
    };
  });

  if (ops.length) await vehicleRepository.bulkWrite(ops);

  return result;
}

module.exports = { linkProductsToVehicles };
