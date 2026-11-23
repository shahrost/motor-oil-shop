import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, renderHook } from "../../../test/hookHarness";
import apiClient from "../../api/apiClient";
import useProducts from "../ProductContext/hooks/useProducts";
import { ProductContext } from "../../context";
import useProductForm from "../../components/ProductForm/hooks/useProductForm";
import useProductEdit from "../../components/ProductEditForm/hooks/useProductEdit";
import useProductManager from "../../components/Admin/ProductManager/hooks/useProductManager";
import { updateProductService } from "../../services/productService";

vi.mock("../../api/apiClient", () => ({ default: { get: vi.fn(), post: vi.fn(), put: vi.fn() } }));

const product = { id: "64b000000000000000000001", name: "روغن", brand: "وم اویل", price: 100, cartonCount: 6, isActive: true };
const response = (data) => ({ data: { success: true, message: "موفق", data } });

beforeEach(() => {
  vi.clearAllMocks();
  apiClient.get.mockResolvedValue(response([product]));
});

describe("product mutations across the API and context boundary", () => {
  it("keeps real product identifiers and prices after adding and editing", async () => {
    const catalog = renderHook(useProducts);
    catalog.render();
    await flushPromises();
    const added = { ...product, id: "64b000000000000000000002", price: 200 };
    apiClient.post.mockResolvedValue(response(added));
    await catalog.render().addProduct(added);
    expect(catalog.render().products.find((item) => item.id === added.id)).toMatchObject(added);
    apiClient.put.mockResolvedValue(response({ ...product, price: 300 }));
    await catalog.render().updateProduct(product.id, { ...product, price: 300 });
    expect(catalog.render().products.find((item) => item.id === product.id).price).toBe(300);
  });

  it("unwraps multipart update responses too", async () => {
    apiClient.put.mockResolvedValue(response(product));
    const saved = await updateProductService(product.id, { ...product, image: { file: new Blob(["test"], { type: "image/png" }) } });
    expect(saved).toEqual(product);
    expect(apiClient.put.mock.calls[0][1]).toBeInstanceOf(FormData);
  });

  it("leaves the add form and catalog intact after a rejected save", async () => {
    const catalog = renderHook(useProducts);
    catalog.render();
    await flushPromises();
    apiClient.post.mockRejectedValue({ response: { data: { message: "ثبت رد شد" } } });
    const { addProduct } = catalog.render();
    const form = renderHook(() => useProductForm(addProduct));
    form.render().updateField("brand", "وم اویل");
    await form.render().submitProduct({ preventDefault() {} });
    expect(form.render().product.brand).toBe("وم اویل");
    expect(form.render().error).toBe("ثبت رد شد");
    expect(catalog.render().products).toHaveLength(1);
  });

  it("passes checkbox booleans and keeps an unsuccessful edit open", async () => {
    const update = vi.fn().mockRejectedValue(new Error("offline"));
    const close = vi.fn();
    const form = renderHook(() => useProductEdit(product, update, close));
    form.render().handleEditChange({ target: { name: "isActive", type: "checkbox", checked: false, value: "on" } });
    await form.render().saveEdit();
    expect(update.mock.calls[0][1].isActive).toBe(false);
    expect(form.render().editForm.isActive).toBe(false);
    expect(form.render().error).toBeTruthy();
    expect(close).not.toHaveBeenCalled();
  });

  it("the admin manager waits for the edit promise before the form closes", async () => {
    let finish;
    const update = vi.fn(() => new Promise((resolve) => { finish = resolve; }));
    const manager = renderHook(useProductManager, new Map([[ProductContext, { products: [product], updateProduct: update }]]));
    manager.render().startEdit(product);
    const { saveEdit, cancelEdit } = manager.render();
    const form = renderHook(() => useProductEdit(product, saveEdit, cancelEdit));
    const pending = form.render().saveEdit();
    expect(manager.render().editingProduct).toEqual(product);
    expect(form.render().saving).toBe(true);
    finish(product);
    await pending;
    expect(manager.render().editingProduct).toBeNull();
  });
});
