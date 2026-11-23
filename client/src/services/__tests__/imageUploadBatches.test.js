import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../api/apiClient";
import { uploadProductImagesService } from "../productImportService";
import { uploadVehicleImagesService } from "../vehicleImportService";

vi.mock("../../api/apiClient", () => ({ default: { post: vi.fn() } }));

const files = Array.from({ length: 19 }, (_, i) => new File(["x"], `img-${i}.webp`));

beforeEach(() => {
  vi.clearAllMocks();
  apiClient.post.mockImplementation(async (_path, formData) => ({
    data: {
      data: formData.getAll("images").map((file, i) => (
        i % 2 ? { name: file.name, filename: `local-${file.name}` } : { name: file.name, url: `cloud/${file.name}` }
      )),
    },
  }));
});

describe.each([
  ["products", uploadProductImagesService, "/products/images"],
  ["vehicles", uploadVehicleImagesService, "/vehicles/images"],
])("batched %s image upload", (_label, upload, path) => {
  it("sends 8 files per multipart request to its own endpoint and maps names", async () => {
    const progress = [];
    const uploaded = await upload(files, (count) => progress.push(count));

    expect(apiClient.post).toHaveBeenCalledTimes(3);
    for (const [calledPath, formData, options] of apiClient.post.mock.calls) {
      expect(calledPath).toBe(path);
      expect(formData).toBeInstanceOf(FormData);
      expect(options).toEqual({ headers: { "Content-Type": "multipart/form-data" } });
    }
    expect(apiClient.post.mock.calls.map(([, formData]) => formData.getAll("images").length)).toEqual([8, 8, 3]);
    expect(progress).toEqual([8, 16, 19]);
    expect(Object.keys(uploaded)).toHaveLength(19);
    expect(uploaded["img-0.webp"]).toBe("cloud/img-0.webp");
    expect(uploaded["img-1.webp"]).toBe("local-img-1.webp");
  });

  it("works without a progress callback and with no files", async () => {
    expect(await upload([])).toEqual({});
    expect(apiClient.post).not.toHaveBeenCalled();
  });
});
