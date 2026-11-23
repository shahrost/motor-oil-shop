import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "../../../test/hookHarness";

const deps = vi.hoisted(() => ({ read: vi.fn(), fetch: vi.fn(), save: vi.fn(), reload: vi.fn() }));
vi.mock("../../context/ProductContext", () => ({ ProductContext: {} }));
vi.mock("../../services/productService", () => ({ fetchProducts: deps.fetch }));
vi.mock("../../services/mobilePriceService", () => ({ applyMobilePrices: deps.save }));
vi.mock("../../components/Admin/PriceManager/helpers/readPriceFile", () => ({ readPriceFile: deps.read }));
import { ProductContext } from "../../context/ProductContext";
import usePriceManager from "../../components/Admin/PriceManager/hooks/usePriceManager";

const product = { id: "a", brand: "ایدلوب", name: "روغن موتور", api: "SN", viscosity: "5W-40", volume: "4L", price: 900000, priceCheck: 1000000 };
const pages = (unit = "") => [{ page: 1, preview: "blob:example", table: { supplier: "ایدلوب", unit, basis: "item", rows: [
  { supplier: "ایدلوب", name: "روغن موتور", specs: "SN 5W40", api: "sn", viscosity: "5w40", volume: "4", amount: "11000000", source: "row" },
] } }];
const setup = () => renderHook(usePriceManager, new Map([[ProductContext, { reloadProducts: deps.reload }]]));

beforeEach(() => {
  vi.clearAllMocks();
  deps.fetch.mockResolvedValue({ data: [product] });
  deps.read.mockResolvedValue(pages());
  deps.save.mockImplementation(async (_, changes) => ({ updated: changes, unchanged: [], conflicts: [], failed: [] }));
});

describe("automatic price upload metadata and fresh baselines", () => {
  it("waits for an absent unit, then reuses OCR and the latest chosen discount", async () => {
    const runner = setup();
    runner.render().chooseDiscount("8");
    await runner.render().run({ name: "list.pdf" });
    expect(runner.render().waitingForUnit).toBe(true);
    expect(deps.save).not.toHaveBeenCalled();
    runner.render().chooseDiscount("5");
    runner.render().chooseUnit("rial");
    await vi.waitFor(() => expect(runner.render().result?.updated).toHaveLength(1));
    expect(deps.read).toHaveBeenCalledOnce();
    expect(deps.save).toHaveBeenCalledWith("prices", [{ id: "a", price: 1045000, priceCheck: 1100000,
      expectedPrice: 900000, expectedPriceCheck: 1000000 }]);
    expect(runner.render().waitingForUnit).toBe(false);
  });

  it("saves known units directly and fetches fresh prices after reading", async () => {
    deps.read.mockResolvedValue(pages("rial"));
    deps.fetch.mockResolvedValueOnce({ data: [product] }).mockResolvedValueOnce({ data: [{ ...product, price: 950000 }] });
    const runner = setup();
    runner.render().chooseDiscount("8");
    await runner.render().run({ name: "list.pdf" });
    expect(deps.save.mock.calls[0][1][0].expectedPrice).toBe(950000);
    expect(runner.render().waitingForUnit).toBe(false);
  });

  it("does not resume a cancelled metadata prompt or reuse its unit for another file", async () => {
    const runner = setup();
    runner.render().chooseDiscount("8");
    await runner.render().run({ name: "one.pdf" });
    runner.render().cancel();
    runner.render().chooseUnit("toman");
    expect(deps.save).not.toHaveBeenCalled();
    await runner.render().run({ name: "two.pdf" });
    expect(runner.render().waitingForUnit).toBe(true);
    expect(deps.save).not.toHaveBeenCalled();
  });
});
