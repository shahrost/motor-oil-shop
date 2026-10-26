import brand from "../data/brand";

// نام فروشگاه فقط در data/brand.js تعریف می‌شه
const translations = {
  fa: {
    nav: {
      home: "خانه",
      products: "محصولات",
      brands: "برندها",
      myVehicles: "خودروها",
      promotions: "طرح‌های فروش",
      cart: "سبد خرید",
      contact: "تماس با ما",
      about: "درباره ما",
    },

    site: {
      name: brand.name,
    },

    // توضیح صفحه‌ها برای گوگل و تب مرورگر (hooks/usePageMeta)؛ {name} با نام محصول/برند/خودرو پر می‌شه
    meta: {
      products: "لیست روغن موتور، فیلتر، اسپری‌جات و اکتان برندهای مختلف با قیمت نقدی و چکی برای خرید عمده.",
      product: "{name} — مشخصات، قیمت نقدی و چکی و خودروهای سازگار.",
      brands: "برندهای روغن موتور و روانکار موجود برای خرید عمده.",
      brand: "محصولات برند {name} با قیمت نقدی و چکی برای فروشگاه‌ها و اتوسرویس‌ها.",
      category: "{name} — خرید عمده با قیمت نقدی و چکی.",
      vehicles: "روغن موتور، فیلتر و روانکار مناسب خودروی خود را بر اساس برند و مدل پیدا کنید.",
      vehicleBrand: "روغن موتور و فیلتر مناسب خودروهای {name}.",
      vehicle: "روغن موتور، فیلتر و روانکار مناسب {name}.",
      viscosity: "روغن موتورها بر اساس گرید ویسکوزیته.",
      viscosityProducts: "روغن موتورهای گرید {name} با قیمت نقدی و چکی.",
      promotions: "طرح‌های فروش و هدیه‌ی خرید عمده روی محصولات منتخب.",
      about: "معرفی فروشگاه، حوزه‌ی فعالیت، برندها، روش‌های پرداخت نقدی و چکی، آدرس و راه‌های تماس.",
    },

    header: {
      register: "ثبت‌نام",
      showPhoto: "نمایش بزرگ عکس",
      toggleTheme: "تغییر حالت شب و روز",
      lightMode: "حالت روز",
      darkMode: "حالت شب",
      whatsapp: "واتساپ",
      call: "تماس تلفنی",
      openMenu: "باز کردن منو",
      closeMenu: "بستن منو",
      close: "بستن",
      cartLabel: "سبد خرید",
      accountMenu: {
        profile: "حساب کاربری",
        orders: "خریدهای من",
        favorites: "علاقه‌مندی‌های من",
        support: "تماس با پشتیبانی",
        logout: "خروج",
      },
    },

    favorites: {
      add: "افزودن به علاقه‌مندی‌ها",
      remove: "حذف از علاقه‌مندی‌ها",
      empty: "هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید. روی قلب کارت محصول بزنید.",
    },

    footer: {
      tagline:
        "تامین و فروش انواع روغن موتور و فیلتر و اسپری‌جات و انواع اکتان برای فروشگاه‌های لوازم یدکی، اتوسرویس‌ها و مشتریان عمده.",
      rights: "تمامی حقوق محفوظ است",
      enamad: "جایگاه نماد اعتماد الکترونیکی (اینماد)",
      social: {
        telegram: "تلگرام",
        whatsapp: "واتساپ",
        rubika: "روبیکا",
        eitaa: "ایتا",
        bale: "بله",
        phone: "تماس تلفنی",
      },
    },

    common: {
      brand: "برند:",
      brandLogo: "لوگوی {brand}",
      viscosity: "گرید:",
      atfType: "نوع:",
      volume: "حجم:",
      quantity: "تعداد",
      orderUnitLabel: "واحد خرید",
      payment: "پرداخت",
      brandLabel: "برند",
      viscosityLabel: "گرید",
      volumeLabel: "لیتراژ",
      apiLabel: "استاندارد API",
      productTypeLabel: "نوع محصول",
      priceLabel: "قیمت",
      orderUnit: {
        number: "عدد",
        carton: "کارتن",
      },
      paymentType: {
        cash: "نقدی",
        check: "اعتباری",
      },
      promotion: {
        badge: "طرح فروش ویژه",
        every: "هر",
        gift: "هدیه",
        giftEarned: "هدیه این خرید:",
        minOrder: "حداقل سفارش:",
      },
      viewProducts: "مشاهده محصولات",
      continueShopping: "ادامه خرید",
      productsAvailable: "محصول موجود است",
      available: "موجود است",
      addToCart: "افزودن به سبد خرید",
      addedToCart: "به سبد خرید اضافه شد",
      add: "افزودن",
      fullNamePlaceholder: "نام و نام خانوادگی",
      phonePlaceholder: "شماره موبایل",
      passwordPlaceholder: "رمز عبور",
      volumeLabels: {
        "300cc": "300cc",
        "500cc": "500cc",
        "1 لیتری": "1 لیتری",
        "2 لیتری": "2 لیتری",
        "3 لیتری": "3 لیتری",
        "4 لیتری": "4 لیتری",
        "5 لیتری": "5 لیتری",
        "100 گرمی": "100 گرمی",
        "120 گرمی": "120 گرمی",
        "1 پوندی": "1 پوندی",
        "2 پوندی": "2 پوندی",
        "3 پوندی": "3 پوندی",
        "5 پوندی": "5 پوندی",
        "7 کیلویی": "7 کیلویی",
        "17 کیلویی": "17 کیلویی",
        "180 کیلویی": "180 کیلویی",
      },
    },

    home: {
      entries: {
        lubricants: {
          title: "روانکار",
          description: "روغن موتور، فیلتر و سایر روانکارها",
        },
        myVehicles: {
          title: "خودروهای من",
          description: "برند و مدل خودروتون رو انتخاب کنید و روانکار و فیلتر مناسبش رو ببینید",
        },
      },
      guide: "راهنمای سایت",
      installApp: "نصب اپلیکیشن",
      productsTitle: "محصولات روغن موتور و فیلتر",
      productsSubtitle: `محصولات فروشگاه ${brand.name}`,
      quickFilter: {
        title: "فیلتر سریع محصولات",
        allBrands: "همه برندها",
        allViscosities: "همه گریدها",
        allVolumes: "همه لیتراژها",
        allApis: "همه استانداردهای API",
        allTypes: "همه انواع محصولات",
        submit: "نمایش محصولات",
      },
      brandList: {
        title: "برندهای موجود",
      },
      featured: {
        viewAll: "مشاهده همه",
      },
      search: {
        placeholder: "جستجوی سریع محصول، برند یا گرید...",
        button: "جستجو",
      },
      features: {
        fastDelivery: {
          title: "ارسال سریع",
          description: "ارسال سریع سفارشات و هماهنگی از طریق واتساپ",
        },
        wholesalePartnership: {
          title: "همکاری عمده",
          description: "شرایط ویژه برای فروشگاه‌ها و اتوسرویس‌ها",
        },
        paymentTerms: {
          title: "شرایط پرداخت",
          description: "امکان همکاری با شرایط پرداخت متنوع",
        },
        productVariety: {
          title: "تنوع محصولات",
          description: "ارائه انواع روغن موتور و محصولات مصرفی خودرو",
        },
      },
    },

    products: {
      filters: {
        title: "فیلتر محصولات",
        clear: "پاک کردن",
        searchPlaceholder: "جستجوی محصول، برند، گرید...",
        onlyAvailable: "فقط محصولات موجود",
        submit: "نمایش محصولات",
      },
      notFound: "محصولی پیدا نشد",
      scrollTop: "بازگشت به بالای صفحه",
    },

    compatibleVehicles: {
      more: "خودرو دیگر",
      less: "کمتر",
    },

    productCard: {
      cartonCount: "تعداد در کارتن:",
      pricePerUnit: "قیمت هر عدد",
      view: "مشخصات",
    },

    productDetail: {
      oilType: "نوع روغن:",
      description: "توضیحات محصول",
      notFound: "محصول پیدا نشد",
      back: "بازگشت",
    },

    cart: {
      removeItem: "حذف محصول",
      empty: {
        title: "سبد خرید خالی است",
      },
      summary: {
        total: "مبلغ کل:",
        clear: "پاک کردن سبد",
        checkout: "ثبت سفارش",
      },
    },

    order: {
      title: "ثبت نهایی سفارش",
      submit: "ثبت سفارش نهایی",
      submitting: "در حال ثبت سفارش...",
      submitError: "ثبت سفارش ناموفق بود؛ سبد خرید شما حفظ شده است. لطفاً دوباره تلاش کنید.",
      products: {
        title: "محصولات سفارش",
        total: "مبلغ کل سفارش:",
      },
      buttons: {
        title: "روش پرداخت کل سفارش",
        allCash: "همه نقدی",
        allCheck: "همه اعتباری",
      },
      success: {
        title: "سفارش شما ثبت شد",
        text: "سفارش شما برای بررسی ارسال شد.",
        viewInCart: "مشاهده سفارش در سبد خرید",
      },
      lastOrder: {
        title: "آخرین سفارش ثبت‌شده‌ی شما",
        orderNumber: "شماره سفارش:",
        date: "تاریخ:",
        status: "وضعیت:",
        unitPrice: "قیمت هر عدد:",
        lineTotal: "جمع:",
        total: "مبلغ کل سفارش:",
        hide: "بستن",
      },
      productCard: {
        orderUnitLabel: "واحد سفارش",
        price: "قیمت محصول:",
        unitPrice: "قیمت هر عدد:",
        lineTotal: "قیمت کل",
      },
      paymentSelector: {
        label: "نحوه پرداخت",
      },
      invalidPhone: "لطفاً شماره موبایل معتبر وارد کنید",
      customerInfo: {
        title: "اطلاعات مشتری",
        phonePlaceholder: "مثال: 09198334264",
        selectArea: "انتخاب منطقه",
        addressPlaceholder: "آدرس دقیق",
        location: {
          open: "انتخاب موقعیت روی نقشه",
          close: "بستن نقشه",
          loading: "در حال بارگذاری نقشه...",
          hint: "نقشه را بکشید یا روی آن بزنید تا پین قرمز روی محل شما باشد؛ یا دکمه‌ی گرد بالای نقشه را بزنید تا موقعیت فعلی‌تان خودکار پیدا شود.",
          locate: "موقعیت فعلی من",
          locating: "در حال پیدا کردن موقعیت شما...",
          picked: "موقعیت روی نقشه ثبت شد",
          clear: "حذف موقعیت",
          errors: {
            denied: "اجازه‌ی دسترسی به موقعیت داده نشد. از تنظیمات مرورگر اجازه دهید یا محل را دستی روی نقشه انتخاب کنید.",
            unavailable: "موقعیت شما پیدا نشد. GPS گوشی را روشن کنید یا محل را دستی روی نقشه انتخاب کنید.",
            timeout: "پیدا کردن موقعیت طول کشید. دوباره امتحان کنید یا محل را دستی انتخاب کنید.",
            insecure: "مرورگر فقط روی اتصال امن (https) اجازه‌ی پیدا کردن موقعیت می‌دهد. محل را دستی روی نقشه انتخاب کنید.",
          },
        },
        areas: {
          parand: "پرند",
          robatKarim: "رباط کریم",
          nasimShahr: "نسیم شهر",
          nasirShahr: "نصیرشهر",
          javadeSaveh: "جاده ساوه",
          baharestan: "بهارستان",
          sabashahr: "صباشهر",
          asadabad: "اسدآباد",
        },
      },
    },

    account: {
      title: "حساب کاربری",
      name: "نام:",
      phone: "شماره موبایل:",
      logout: "خروج از حساب",
      myOrders: "سفارش‌های من",
      loading: "در حال بارگذاری...",
      noOrders: "هنوز سفارشی ثبت نکرده‌اید.",
      orderNumber: "سفارش",
      itemsCount: "قلم کالا",
      showDetails: "مشاهده جزئیات",
      hideDetails: "بستن جزئیات",
      orderStatus: {
        new: "جدید",
        contacted: "تماس گرفته شد",
        readyToShip: "آماده ارسال",
        shipped: "ارسال شد",
        delivered: "تحویل شد",
      },
    },

    accountLogin: {
      title: "ورود به حساب کاربری",
      loggingIn: "در حال ورود...",
      submit: "ورود",
      noAccount: "هنوز ثبت‌نام نکرده‌اید؟",
      error: "خطا در ورود",
    },

    register: {
      title: "ثبت‌نام مشتریان",
      submitting: "در حال ثبت‌نام...",
      hasAccount: "قبلاً ثبت‌نام کرده‌اید؟",
      error: "خطا در ثبت‌نام",
    },

    contact: {
      subtitle:
        "برای دریافت قیمت روز، مشاوره انتخاب روغن و ثبت سفارش با ما در ارتباط باشید.",
      actions: {
        whatsapp: "پیام در واتساپ",
        callUs: "تماس با ما",
      },
      info: {
        areaTitle: "محدوده فعالیت",
        areaText:
          "سبزدشت، گلستان، بهارستان، پرند، رباط‌کریم، نسیم‌شهر، نصیرشهر، خیرآباد، همدانک، اورین، آدران، صباشهر، شاهدشهر، کهنز، جاده آدران، الارد، فردوسیه، حصارک، صالحیه، شترخوار",
      },
    },

    about: {
      title: `درباره ${brand.name}`,
      intro:
        "تامین و فروش انواع روغن موتور و فیلتر و اسپری‌جات و انواع اکتان برای فروشگاه‌های لوازم یدکی، اتوسرویس‌ها و مشتریان عمده.",
      supply: {
        title: "تامین محصولات",
        text: "ارائه روغن موتور سمن و محصولات مورد نیاز بازار خودرو",
      },
      partnership: {
        title: "همکاری با همکاران",
        text: "همکاری با لوازم یدکی‌ها و اتوسرویس‌ها",
      },
      support: {
        title: "پشتیبانی سریع",
        text: "دریافت قیمت روز و ثبت سفارش از طریق واتساپ",
      },
      activityTitle: "حوزه‌ی فعالیت",
      brandsTitle: "برندهایی که عرضه می‌کنیم",
      payment: {
        title: "روش‌های پرداخت",
        cash: "نقدی",
        cashText: "قیمت نقدی هر محصول در صفحه‌ی همان محصول نمایش داده می‌شود.",
        check: "چکی (اعتباری)",
        checkText: "قیمت چکی جداگانه نمایش داده می‌شود. شرایط: [شرایط پرداخت چکی]",
      },
      store: {
        title: "اطلاعات تماس فروشگاه",
        address: "آدرس",
        hours: "ساعت کاری",
        landline: "تلفن ثابت",
        mobile: "تلفن همراه",
      },
    },

    brands: {
      title: "برندهای روغن موتور",
      subtitle: "انتخاب برند مورد نظر",
    },

    share: {
      button: "اشتراک‌گذاری",
      telegram: "تلگرام",
      whatsapp: "واتس‌اپ",
      copy: "کپی لینک",
      copied: "لینک کپی شد",
      more: "برنامه‌های دیگر",
    },

    reviews: {
      title: "امتیاز و نظرات کاربران",
      outOf5: "از ۵",
      basedOn: "{count} رأی",
      noRatings: "هنوز امتیازی ثبت نشده",
      beFirst: "اولین امتیاز را شما ثبت کنید",
      yourRating: "امتیاز شما به این خودرو",
      starLabel: "{count} ستاره",
      levels: { 1: "خیلی بد", 2: "بد", 3: "معمولی", 4: "خوب", 5: "عالی" },
      namePlaceholder: "نام شما (اختیاری)",
      textPlaceholder: "تجربه‌ی شما از این خودرو یا روغن‌های مناسبش (اختیاری)",
      textNote: "متن نظر بعد از تأیید نمایش داده می‌شود",
      submit: "ثبت امتیاز",
      sending: "در حال ثبت...",
      thanks: "ممنون! امتیاز شما ثبت شد",
      alreadyRated: "شما به این خودرو امتیاز داده‌اید",
      pendingNote: "نظر شما پس از تأیید مدیر سایت نمایش داده می‌شود",
      error: "ثبت امتیاز انجام نشد؛ دوباره تلاش کنید",
      guest: "کاربر مهمان",
      empty: "هنوز نظری ثبت نشده؛ اولین نفر باشید",
    },

    vehicles: {
      title: "خودروهای من",
      subtitle: "برند و مدل خودروی خودتون رو انتخاب کنید تا روغن‌های مناسبش رو ببینید",
      modelsCount: "مدل",
      loading: "در حال بارگذاری...",
      searchPlaceholder: "جستجوی مدل خودرو...",
      searchAllPlaceholder: "جستجوی خودرو، مثلاً پراید یا Pride",
      clearSearch: "پاک کردن جستجو",
      searchCount: "خودرو پیدا شد",
      searchError: "دریافت لیست خودروها ممکن نشد؛ دوباره امتحان کنید",
      showMore: "نمایش بیشتر",
      notFoundBrand: "برند خودرو پیدا نشد",
      notFoundModels: "خودرویی پیدا نشد",
      notFoundVehicle: "خودرو پیدا نشد",
      back: "بازگشت به برندهای خودرو",
      specs: "مشخصات خودرو",
      years: "سال ساخت",
      engine: "موتور",
      oilCapacity: "حجم روغن موتور",
      engineSize: "حجم موتور",
      fuel: "سوخت",
      gearbox: "گیربکس",
      body: "بدنه",
      status: "وضعیت",
      altViscosity: "ویسکوزیته جایگزین",
      alternativeOils: "گزینه‌های جایگزین",
      liter: "لیتر",
      viscosity: "ویسکوزیته پیشنهادی",
      api: "استاندارد API",
      changeInterval: "تعویض روغن",
      km: "کیلومتر",
      viewSpecs: "مشاهده مشخصات و روغن‌ها",
      recommendedOils: "روغن‌های مناسب این خودرو",
      country: "کشور سازنده",
      shareText: `روغن و فیلتر مناسب در ${brand.name}`,
      recommendedBadge: `پیشنهاد ${brand.name}`,
      parts: {
        oil: "روغن موتور",
        filter: "فیلتر",
        gearboxFilter: "فیلتر گیربکس",
        antifreeze: "ضدیخ",
        coolant: "آب رادیاتور",
        washer: "شیشه‌شور",
        items: "محصول",
        forVehicle: "مناسب این خودرو",
        suitableFor: "{part} مناسب {vehicle}",
        pick: "برای دیدن محصولات مناسب این خودرو یکی از دسته‌ها را انتخاب کنید",
        empty: "فعلاً محصولی از این دسته برای این خودرو موجود نیست",
      },
      electricNoOil: "این خودرو برقی است و روغن موتور ندارد",
      noOils: "فعلاً روغن مناسبی برای این خودرو موجود نیست",
    },

    brandProducts: {
      title: "محصولات برند",
      notFound: "محصولی از این برند پیدا نشد",
    },

    categoryProducts: {
      notFound: "محصولی توی این دسته پیدا نشد",
    },

    viscosity: {
      title: "دسته بندی روغن موتور",
      subtitle: "انتخاب گرید مناسب روغن",
      viewGrade: "مشاهده روغن‌های",
    },

    promotions: {
      title: "طرح‌های فروش",
      subtitle: "طرح‌های ویژه هدیه‌دار روی محصولات منتخب",
      notFound: "در حال حاضر طرح فروش فعالی وجود ندارد",
    },

    viscosityProducts: {
      back: "بازگشت به گریدهای روغن",
      titlePrefix: "خرید روغن موتور",
      countText: "محصول با گرید",
      notFound: "محصولی با این گرید پیدا نشد",
    },

    homeSlider: {
      prev: "قبلی",
      next: "بعدی",
      slide1: {
        title: "ارسال سریع روغن موتور",
        text: "تامین روغن موتور برای لوازم یدکی‌ها و اتوسرویس‌ها در منطقه",
      },
      slide2: {
        title: "شرایط همکاری ویژه",
        text: "فروش عمده و تک  با شرایط پرداخت مناسب",
      },
      slide3: {
        title: "محصولات ویژه ",
        text: "قیمت روز روغن موتور و تخفیف مخصوص همکاران",
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      products: "Products",
      brands: "Brands",
      myVehicles: "My Vehicles",
      promotions: "Sales Promotions",
      cart: "Cart",
      contact: "Contact Us",
      about: "About Us",
    },

    site: {
      name: brand.nameEn,
    },

    meta: {
      products: "Motor oils, filters, sprays and octane boosters from many brands, with cash and cheque prices for wholesale.",
      product: "{name} — specs, cash and cheque prices and compatible vehicles.",
      brands: "Motor oil and lubricant brands available for wholesale.",
      brand: "{name} products with cash and cheque prices for parts shops and auto services.",
      category: "{name} — wholesale with cash and cheque prices.",
      vehicles: "Find the right motor oil, filter and lubricant for your vehicle by make and model.",
      vehicleBrand: "Motor oils and filters for {name} vehicles.",
      vehicle: "Motor oil, filters and lubricants for {name}.",
      viscosity: "Motor oils by viscosity grade.",
      viscosityProducts: "{name} motor oils with cash and cheque prices.",
      promotions: "Wholesale promotions and gift offers on selected products.",
      about: "About the shop, what we supply, brands, cash and cheque payment, address and contact details.",
    },

    header: {
      register: "Sign Up",
      showPhoto: "View full photo",
      toggleTheme: "Toggle light / dark mode",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      whatsapp: "WhatsApp",
      call: "Call Us",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      close: "Close",
      cartLabel: "Cart",
      accountMenu: {
        profile: "My Account",
        orders: "My Orders",
        favorites: "My Favorites",
        support: "Contact Support",
        logout: "Log Out",
      },
    },

    favorites: {
      add: "Add to favorites",
      remove: "Remove from favorites",
      empty: "You have no favorites yet. Tap the heart on a product card.",
    },

    footer: {
      tagline:
        "Supplying and selling all kinds of engine oil, filters, sprays, and octane boosters for auto-parts stores, auto service centers, and wholesale customers.",
      rights: "All rights reserved",
      enamad: "E-Namad trust seal placeholder",
      social: {
        telegram: "Telegram",
        whatsapp: "WhatsApp",
        rubika: "Rubika",
        eitaa: "Eitaa",
        bale: "Bale",
        phone: "Call Us",
      },
    },

    common: {
      brand: "Brand:",
      brandLogo: "{brand} logo",
      viscosity: "Grade:",
      atfType: "Type:",
      volume: "Volume:",
      quantity: "Quantity",
      orderUnitLabel: "Order Unit",
      payment: "Payment",
      brandLabel: "Brand",
      viscosityLabel: "Grade",
      volumeLabel: "Volume",
      apiLabel: "API Standard",
      productTypeLabel: "Product Type",
      priceLabel: "Price",
      orderUnit: {
        number: "Pcs",
        carton: "Carton",
      },
      paymentType: {
        cash: "Cash",
        check: "Credit",
      },
      promotion: {
        badge: "Special Offer",
        every: "Every",
        gift: "free",
        giftEarned: "Gift for this order:",
        minOrder: "Minimum order:",
      },
      viewProducts: "View Products",
      continueShopping: "Continue Shopping",
      productsAvailable: "products available",
      available: "available",
      addToCart: "Add to Cart",
      addedToCart: "Added to cart",
      add: "Add",
      fullNamePlaceholder: "Full Name",
      phonePlaceholder: "Mobile Number",
      passwordPlaceholder: "Password",
      volumeLabels: {
        "300cc": "300cc",
        "500cc": "500cc",
        "1 لیتری": "1 Liter",
        "2 لیتری": "2 Liters",
        "3 لیتری": "3 Liters",
        "4 لیتری": "4 Liters",
        "5 لیتری": "5 Liters",
        "100 گرمی": "100g",
        "120 گرمی": "120g",
        "1 پوندی": "1 lb",
        "2 پوندی": "2 lb",
        "3 پوندی": "3 lb",
        "5 پوندی": "5 lb",
        "7 کیلویی": "7kg",
        "17 کیلویی": "17kg",
        "180 کیلویی": "180kg",
      },
    },

    home: {
      entries: {
        lubricants: {
          title: "Lubricants",
          description: "Engine oils, filters and other lubricants",
        },
        myVehicles: {
          title: "My Vehicles",
          description: "Pick your car brand and model to see its matching lubricants and filters",
        },
      },
      guide: "Site Guide",
      installApp: "Install App",
      productsTitle: "Engine Oil & Filter Products",
      productsSubtitle: `Products from ${brand.nameEn}`,
      quickFilter: {
        title: "Quick Product Filter",
        allBrands: "All Brands",
        allViscosities: "All Grades",
        allVolumes: "All Volumes",
        allApis: "All API Standards",
        allTypes: "All Product Types",
        submit: "Show Products",
      },
      brandList: {
        title: "Available Brands",
      },
      featured: {
        viewAll: "View All",
      },
      search: {
        placeholder: "Quick search for a product, brand, or grade...",
        button: "Search",
      },
      features: {
        fastDelivery: {
          title: "Fast Delivery",
          description: "Quick order delivery and coordination via WhatsApp",
        },
        wholesalePartnership: {
          title: "Wholesale Partnership",
          description:
            "Special terms for auto-parts stores and auto service centers",
        },
        paymentTerms: {
          title: "Payment Terms",
          description: "Flexible payment terms for partners",
        },
        productVariety: {
          title: "Product Variety",
          description: "A wide range of engine oils and auto consumables",
        },
      },
    },

    products: {
      filters: {
        title: "Product Filters",
        clear: "Clear",
        searchPlaceholder: "Search by product, brand, grade...",
        onlyAvailable: "In stock only",
        submit: "Show Products",
      },
      notFound: "No products found",
      scrollTop: "Back to top",
    },

    compatibleVehicles: {
      more: "more vehicles",
      less: "Show less",
    },

    productCard: {
      cartonCount: "Items per Carton:",
      pricePerUnit: "Price per Unit",
      view: "Specs",
    },

    productDetail: {
      oilType: "Oil Type:",
      description: "Product Description",
      notFound: "Product not found",
      back: "Back",
    },

    cart: {
      removeItem: "Remove Item",
      empty: {
        title: "Your cart is empty",
      },
      summary: {
        total: "Total:",
        clear: "Clear Cart",
        checkout: "Checkout",
      },
    },

    order: {
      title: "Finalize Order",
      submit: "Submit Final Order",
      submitting: "Submitting order...",
      submitError: "Your order could not be submitted; your cart is kept. Please try again.",
      products: {
        title: "Order Products",
        total: "Order Total:",
      },
      buttons: {
        title: "Payment Method for Entire Order",
        allCash: "All Cash",
        allCheck: "All Credit",
      },
      success: {
        title: "Your order has been placed",
        text: "Your order has been sent for review.",
        viewInCart: "View order in cart",
      },
      lastOrder: {
        title: "Your Last Submitted Order",
        orderNumber: "Order No.:",
        date: "Date:",
        status: "Status:",
        unitPrice: "Price per Unit:",
        lineTotal: "Subtotal:",
        total: "Order Total:",
        hide: "Close",
      },
      productCard: {
        orderUnitLabel: "Order Unit",
        price: "Product Price:",
        unitPrice: "Price per Unit:",
        lineTotal: "Total",
      },
      paymentSelector: {
        label: "Payment Method",
      },
      invalidPhone: "Please enter a valid mobile number",
      customerInfo: {
        title: "Customer Information",
        phonePlaceholder: "e.g. 09198334264",
        selectArea: "Select Area",
        addressPlaceholder: "Exact Address",
        location: {
          open: "Pick location on map",
          close: "Close map",
          loading: "Loading map...",
          hint: "Drag or tap the map so the red pin sits on your place, or press the round button at the top of the map to find your current location automatically.",
          locate: "My current location",
          locating: "Finding your location...",
          picked: "Map location saved",
          clear: "Remove location",
          errors: {
            denied: "Location permission was denied. Allow it in your browser settings or pick the place on the map manually.",
            unavailable: "Could not find your location. Turn on your phone's GPS or pick the place on the map manually.",
            timeout: "Finding your location took too long. Try again or pick the place manually.",
            insecure: "The browser only allows location on a secure (https) connection. Pick the place on the map manually.",
          },
        },
        areas: {
          parand: "Parand",
          robatKarim: "Robat Karim",
          nasimShahr: "Nasim Shahr",
          nasirShahr: "Nasirshahr",
          javadeSaveh: "Saveh Road",
          baharestan: "Baharestan",
          sabashahr: "Sabashahr",
          asadabad: "Asadabad",
        },
      },
    },

    account: {
      title: "My Account",
      name: "Name:",
      phone: "Mobile Number:",
      logout: "Log Out",
      myOrders: "My Orders",
      loading: "Loading...",
      noOrders: "You haven't placed any orders yet.",
      orderNumber: "Order",
      itemsCount: "items",
      showDetails: "View Details",
      hideDetails: "Hide Details",
      orderStatus: {
        new: "New",
        contacted: "Contacted",
        readyToShip: "Ready to Ship",
        shipped: "Shipped",
        delivered: "Delivered",
      },
    },

    accountLogin: {
      title: "Log In to Your Account",
      loggingIn: "Logging in...",
      submit: "Log In",
      noAccount: "Don't have an account yet?",
      error: "Login failed",
    },

    register: {
      title: "Customer Registration",
      submitting: "Signing up...",
      hasAccount: "Already registered?",
      error: "Registration failed",
    },

    contact: {
      subtitle:
        "Contact us for today's pricing, oil selection advice, and placing an order.",
      actions: {
        whatsapp: "Message on WhatsApp",
        callUs: "Call Us",
      },
      info: {
        areaTitle: "Service Area",
        areaText:
          "Sabzdasht, Golestan, Baharestan, Parand, Robat Karim, Nasim Shahr, Nasirshahr, Kheirabad, Hamedanak, Owrin, Adran, Sabashahr, Shahedshahr, Kohnooz, Adran Road, Alard, Ferdosieh, Hesarak, Salehieh, Shotorkhar",
      },
    },

    about: {
      title: `About ${brand.nameEn}`,
      intro:
        "Supplying and selling all kinds of engine oil, filters, sprays, and octane boosters for auto-parts stores, auto service centers, and wholesale customers.",
      supply: {
        title: "Product Supply",
        text: "Providing Seman motor oil and other products the auto market needs",
      },
      partnership: {
        title: "Partner Collaboration",
        text: "Working with auto-parts stores and auto service centers",
      },
      support: {
        title: "Fast Support",
        text: "Get today's price and place orders via WhatsApp",
      },
      activityTitle: "What We Do",
      brandsTitle: "Brands We Supply",
      payment: {
        title: "Payment Methods",
        cash: "Cash",
        cashText: "Each product's cash price is shown on its page.",
        check: "Cheque (credit)",
        checkText: "Cheque prices are shown separately. Terms: [cheque payment terms]",
      },
      store: {
        title: "Store Contact Details",
        address: "Address",
        hours: "Opening Hours",
        landline: "Landline",
        mobile: "Mobile",
      },
    },

    brands: {
      title: "Engine Oil Brands",
      subtitle: "Choose a brand",
    },

    share: {
      button: "Share",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      copy: "Copy link",
      copied: "Link copied",
      more: "Other apps",
    },

    reviews: {
      title: "Ratings & reviews",
      outOf5: "out of 5",
      basedOn: "{count} ratings",
      noRatings: "No ratings yet",
      beFirst: "Be the first to rate",
      yourRating: "Your rating for this vehicle",
      starLabel: "{count} stars",
      levels: { 1: "Very bad", 2: "Bad", 3: "Okay", 4: "Good", 5: "Excellent" },
      namePlaceholder: "Your name (optional)",
      textPlaceholder: "Your experience with this vehicle or its oils (optional)",
      textNote: "Comments are shown after approval",
      submit: "Submit rating",
      sending: "Submitting...",
      thanks: "Thanks! Your rating was saved",
      alreadyRated: "You have rated this vehicle",
      pendingNote: "Your comment will appear after the site admin approves it",
      error: "Could not submit; please try again",
      guest: "Guest",
      empty: "No reviews yet — be the first",
    },

    vehicles: {
      title: "My Vehicles",
      subtitle: "Choose your car brand and model to see the suitable oils",
      modelsCount: "models",
      loading: "Loading...",
      searchPlaceholder: "Search car model...",
      searchAllPlaceholder: "Search a car, e.g. Pride or پراید",
      clearSearch: "Clear search",
      searchCount: "vehicles found",
      searchError: "Couldn't load the vehicle list; please try again",
      showMore: "Show more",
      notFoundBrand: "Car brand not found",
      notFoundModels: "No vehicles found",
      notFoundVehicle: "Vehicle not found",
      back: "Back to car brands",
      specs: "Vehicle specifications",
      years: "Production years",
      engine: "Engine",
      oilCapacity: "Engine oil capacity",
      engineSize: "Engine size",
      fuel: "Fuel",
      gearbox: "Gearbox",
      body: "Body",
      status: "Status",
      altViscosity: "Alternative viscosity",
      alternativeOils: "Alternative options",
      liter: "L",
      viscosity: "Recommended viscosity",
      api: "API standard",
      changeInterval: "Oil change interval",
      km: "km",
      viewSpecs: "View specs & suitable oils",
      recommendedOils: "Oils suitable for this vehicle",
      country: "Country",
      shareText: `suitable oils & filters at ${brand.nameEn}`,
      recommendedBadge: `${brand.nameEn} pick`,
      parts: {
        oil: "Engine Oil",
        filter: "Filter",
        gearboxFilter: "Transmission Filter",
        antifreeze: "Antifreeze",
        coolant: "Radiator Coolant",
        washer: "Washer Fluid",
        items: "items",
        forVehicle: "for this vehicle",
        suitableFor: "{part} for {vehicle}",
        pick: "Choose a category to see the products that fit this vehicle",
        empty: "No products in this category are available for this vehicle yet",
      },
      electricNoOil: "This is an electric vehicle – it has no engine oil",
      noOils: "No suitable oil is currently available for this vehicle",
    },

    brandProducts: {
      title: "Products of",
      notFound: "No products found for this brand",
    },

    categoryProducts: {
      notFound: "No products found in this category",
    },

    viscosity: {
      title: "Engine Oil Categories",
      subtitle: "Choose the right oil grade",
      viewGrade: "View",
    },

    promotions: {
      title: "Sales Promotions",
      subtitle: "Special gift-with-purchase offers on selected products",
      notFound: "There are no active sales promotions right now",
    },

    viscosityProducts: {
      back: "Back to Oil Grades",
      titlePrefix: "Buy Engine Oil",
      countText: "products with grade",
      notFound: "No products found for this grade",
    },

    homeSlider: {
      prev: "Previous",
      next: "Next",
      slide1: {
        title: "Fast Engine Oil Delivery",
        text: "Supplying engine oil to auto-parts stores and auto service centers in the area",
      },
      slide2: {
        title: "Special Partnership Terms",
        text: "Wholesale and retail sales with convenient payment terms",
      },
      slide3: {
        title: "Featured Products",
        text: "Today's engine oil prices and special discounts for partners",
      },
    },
  },
};

export default translations;
