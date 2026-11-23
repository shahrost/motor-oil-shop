const productModel = {
  id: null,

  name: "",

  sku: "",

  brand: "",

  category: "",

  volume: "",

  viscosity: "",

  api: "",

  acea: "",

  oilType: "",

  description: "",

  price: 0,
  priceCheck: 0,
  discountPercent: 0,

  cartonCount: 1,

  stock: 0,

  image: {
    main: "",
    gallery: [],
  },

  tags: [],

  isBestSeller: false,
  isActive: true,
  salesClosed: false,

  promotion: {
    isActive: false,
    buyQty: 0,
    buyQtyCash: 0,
    buyQtyCheck: 0,
    minQty: 0,
    giftQtyCash: 0,
    giftQtyCheck: 0,
    note: "",
  },
};

export default productModel;
