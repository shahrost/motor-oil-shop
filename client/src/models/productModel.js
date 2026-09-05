const productModel = {
  id: null,

  name: "",

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

  cartonCount: 0,

  stock: 0,

  image: {
    main: "",
    gallery: [],
  },

  tags: [],

  isBestSeller: false,
  isActive: true,

  promotion: {
    isActive: false,
    buyQty: 0,
    giftQtyCash: 0,
    giftQtyCheck: 0,
    note: "",
  },
};

export default productModel;