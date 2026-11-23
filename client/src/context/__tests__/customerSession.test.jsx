import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, renderHook } from "../../../test/hookHarness";
import CustomerAuthContext, { CustomerAuthProvider } from "../CustomerAuthContext";
import LanguageContext from "../LanguageContext";
import CustomerProtectedRoute from "../../components/CustomerProtectedRoute";
import { fetchCustomerProfile, loginCustomer } from "../../services/customerAuthService";
import { clearCustomerToken } from "../../services/customerTokenStorage";

const storage = vi.hoisted(() => ({ token: "valid-token" }));
vi.mock("../../services/customerTokenStorage", () => ({
  getCustomerToken: () => storage.token,
  saveCustomerToken: (token) => { storage.token = token; },
  clearCustomerToken: vi.fn(() => { storage.token = null; }),
}));
vi.mock("../../services/customerAuthService", () => ({ fetchCustomerProfile: vi.fn(), loginCustomer: vi.fn(), registerCustomer: vi.fn() }));

function session() {
  const hook = renderHook(() => CustomerAuthProvider({ children: null }).props.value);
  hook.render();
  return hook;
}

beforeEach(() => {
  vi.clearAllMocks();
  storage.token = "valid-token";
});

describe("customer session recovery", () => {
  it("keeps the token after 503, shows a retry state and recovers without login", async () => {
    fetchCustomerProfile.mockRejectedValueOnce({ response: { status: 503 } }).mockResolvedValueOnce({ id: "customer", name: "علی" });
    const state = session();
    await flushPromises();
    expect(state.render()).toMatchObject({ customer: null, loading: false, loadError: true });
    expect(storage.token).toBe("valid-token");
    const route = renderHook(() => CustomerProtectedRoute({ children: "private" }), new Map([
      [CustomerAuthContext, state.render()], [LanguageContext, { t: (key) => key }],
    ]));
    expect(route.render().props.role).toBe("alert");
    state.render().retryProfile();
    state.render();
    await flushPromises();
    expect(state.render()).toMatchObject({ customer: { id: "customer" }, loading: false, loadError: false });
    expect(clearCustomerToken).not.toHaveBeenCalled();
  });

  it("network failures also preserve the token", async () => {
    fetchCustomerProfile.mockRejectedValue(new Error("offline"));
    const state = session();
    await flushPromises();
    expect(state.render().loadError).toBe(true);
    expect(storage.token).toBe("valid-token");
  });

  it.each([401, 403, 404])("clears an invalid or removed account on %s and finishes loading", async (status) => {
    fetchCustomerProfile.mockRejectedValue({ response: { status } });
    const state = session();
    await flushPromises();
    expect(storage.token).toBeNull();
    expect(state.render()).toMatchObject({ customer: null, loading: false, loadError: false });
  });

  it("an old profile failure cannot clear a newly logged-in account", async () => {
    let fail;
    fetchCustomerProfile.mockReturnValue(new Promise((_, reject) => { fail = reject; }));
    loginCustomer.mockResolvedValue({ token: "new-token", customer: { id: "new-customer", name: "علی" } });
    const state = session();
    await state.render().login({ phone: "09121234567", password: "test" });
    fail({ response: { status: 401 } });
    await flushPromises();
    expect(storage.token).toBe("new-token");
    expect(state.render().customer.id).toBe("new-customer");
    expect(clearCustomerToken).not.toHaveBeenCalled();
  });
});
