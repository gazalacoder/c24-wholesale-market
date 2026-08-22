const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();

/* =========================================
   PORT
========================================= */

const PORT = process.env.PORT || 5000;

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

/* =========================================
   DATA FOLDER
========================================= */

const DATA_DIR = path.join(__dirname, "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, {
    recursive: true,
  });
}

/* =========================================
   DATA FILES
========================================= */

const PRODUCTS_FILE = path.join(
  DATA_DIR,
  "products.json"
);

const RETAILERS_FILE = path.join(
  DATA_DIR,
  "retailers.json"
);

const ENQUIRIES_FILE = path.join(
  DATA_DIR,
  "enquiries.json"
);

const OFFERS_FILE = path.join(
  DATA_DIR,
  "offers.json"
);

const ORDERS_FILE = path.join(
  DATA_DIR,
  "orders.json"
);

const PRICE_LIST_DOWNLOADS_FILE = path.join(
  DATA_DIR,
  "priceListDownloads.json"
);

const AI_CHATS_FILE = path.join(
  DATA_DIR,
  "aiChats.json"
);

/* =========================================
   FILE HELPERS
========================================= */

function createFile(file) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]", "utf8");
  }
}

createFile(PRODUCTS_FILE);
createFile(RETAILERS_FILE);
createFile(ENQUIRIES_FILE);
createFile(OFFERS_FILE);
createFile(ORDERS_FILE);
createFile(PRICE_LIST_DOWNLOADS_FILE);
createFile(AI_CHATS_FILE);

function readData(file) {
  try {
    const data = fs.readFileSync(file, "utf8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Database read error:",
      error.message
    );

    return [];
  }
}

function writeData(file, data) {
  fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

function createId(prefix) {
  return (
    prefix +
    "_" +
    Date.now() +
    "_" +
    crypto.randomBytes(4).toString("hex")
  );
}

function safeRetailer(retailer) {
  if (!retailer) {
    return null;
  }

  const {
    password,
    ...data
  } = retailer;

  return data;
}

/* =========================================
   HEALTH
========================================= */

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "C24 Wholesale API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    message: "C24 backend is working",
  });
});

/* =========================================
   PRODUCTS
========================================= */

app.get("/api/products", (req, res) => {
  res.json(readData(PRODUCTS_FILE));
});

app.get("/api/products/:id", (req, res) => {
  const products = readData(PRODUCTS_FILE);

  const product = products.find(
    (item) =>
      String(item.id) ===
      String(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json(product);
});

app.post("/api/products", (req, res) => {
  const products = readData(PRODUCTS_FILE);

  const {
    name,
    brand,
    category,
    mrp,
    wholesalePrice,
    price,
    discountPercent,
    stock,
    image,
    images,
    description,
    specifications,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: "Name and category are required",
    });
  }

  const product = {
    id: createId("product"),

    name: String(name).trim(),

    brand: String(brand || "").trim(),

    category: String(category).trim(),

    mrp: Number(mrp || price || 0),

    wholesalePrice: Number(
      wholesalePrice || price || 0
    ),

    discountPercent: Number(
      discountPercent || 0
    ),

    price: Number(mrp || price || 0),

    stock: Number(stock || 0),

    image: image || "",

    images: Array.isArray(images)
      ? images
      : image
      ? [image]
      : [],

    description: description || "",

    specifications: specifications || {},

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  products.push(product);

  writeData(PRODUCTS_FILE, products);

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});

app.put("/api/products/:id", (req, res) => {
  const products = readData(PRODUCTS_FILE);

  const index = products.findIndex(
    (item) =>
      String(item.id) ===
      String(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    id: products[index].id,
    updatedAt: new Date().toISOString(),
  };

  writeData(PRODUCTS_FILE, products);

  res.json({
    success: true,
    message: "Product updated",
    product: products[index],
  });
});

app.delete("/api/products/:id", (req, res) => {
  const products = readData(PRODUCTS_FILE);

  const index = products.findIndex(
    (item) =>
      String(item.id) ===
      String(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const deleted = products.splice(index, 1)[0];

  writeData(PRODUCTS_FILE, products);

  res.json({
    success: true,
    message: "Product deleted",
    product: deleted,
  });
});

/* =========================================
   RETAILER REGISTER
========================================= */

app.post(
  "/api/retailers/register",
  (req, res) => {
    const retailers = readData(RETAILERS_FILE);

    const {
      name,
      businessName,
      phone,
      email,
      gstNumber,
      password,
    } = req.body;

    if (
      !name ||
      !businessName ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, business name, phone and password are required.",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    const cleanPhone = String(phone).trim();

    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();

    const existing = retailers.find(
      (item) =>
        item.phone === cleanPhone ||
        (cleanEmail &&
          item.email === cleanEmail)
    );

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Retailer account already exists.",
      });
    }

    const retailer = {
      id: createId("retailer"),

      name: String(name).trim(),

      businessName: String(
        businessName
      ).trim(),

      phone: cleanPhone,

      email: cleanEmail,

      gstNumber: String(
        gstNumber || ""
      ).trim(),

      password: String(password),

      enquiries: [],

      orders: [],

      createdAt: new Date().toISOString(),
    };

    retailers.push(retailer);

    writeData(RETAILERS_FILE, retailers);

    res.status(201).json({
      success: true,
      message:
        "Retailer registered successfully",
      retailer: safeRetailer(retailer),
    });
  }
);

/* =========================================
   RETAILER LOGIN
========================================= */

app.post(
  "/api/retailers/login",
  (req, res) => {
    const retailers = readData(RETAILERS_FILE);

    const {
      phone,
      email,
      password,
    } = req.body;

    const identifier = String(
      phone || email || ""
    )
      .trim()
      .toLowerCase();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Phone/email and password are required.",
      });
    }

    const retailer = retailers.find(
      (item) => {
        const itemPhone = String(
          item.phone || ""
        )
          .trim()
          .toLowerCase();

        const itemEmail = String(
          item.email || ""
        )
          .trim()
          .toLowerCase();

        return (
          (
            itemPhone === identifier ||
            itemEmail === identifier
          ) &&
          String(item.password) ===
            String(password)
        );
      }
    );

    if (!retailer) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid phone/email or password.",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      retailer: safeRetailer(retailer),
    });
  }
);

/* =========================================
   RETAILER GET
========================================= */

app.get(
  "/api/retailers/:id",
  (req, res) => {
    const retailers = readData(RETAILERS_FILE);

    const retailer = retailers.find(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    res.json({
      success: true,
      retailer: safeRetailer(retailer),
    });
  }
);

/* =========================================
   RETAILER UPDATE
========================================= */

app.put(
  "/api/retailers/:id",
  (req, res) => {
    const retailers = readData(RETAILERS_FILE);

    const index = retailers.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    retailers[index] = {
      ...retailers[index],
      ...req.body,
      id: retailers[index].id,
    };

    writeData(RETAILERS_FILE, retailers);

    res.json({
      success: true,
      message: "Profile updated successfully",
      retailer: safeRetailer(
        retailers[index]
      ),
    });
  }
);

/* =========================================
   ENQUIRIES
========================================= */

app.get("/api/enquiries", (req, res) => {
  res.json(readData(ENQUIRIES_FILE));
});

app.post("/api/enquiries", (req, res) => {
  const enquiries = readData(
    ENQUIRIES_FILE
  );

  const retailers = readData(
    RETAILERS_FILE
  );

  const {
    name,
    business,
    phone,
    email,
    product,
    quantity,
    message,
    retailerId,
    retailerName,
  } = req.body;

  if (
    !name ||
    !business ||
    !phone ||
    !product ||
    !quantity
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Required enquiry fields are missing.",
    });
  }

  const enquiry = {
    id: createId("enquiry"),

    name: String(name).trim(),

    business: String(business).trim(),

    phone: String(phone).trim(),

    email: String(email || "")
      .trim()
      .toLowerCase(),

    product: String(product).trim(),

    quantity: Number(quantity),

    message: String(message || "").trim(),

    retailerId: retailerId || null,

    retailerName:
      retailerName || business,

    status: "New",

    date: new Date().toISOString(),
  };

  enquiries.push(enquiry);

  writeData(ENQUIRIES_FILE, enquiries);

  if (retailerId) {
    const index = retailers.findIndex(
      (item) =>
        String(item.id) ===
        String(retailerId)
    );

    if (index !== -1) {
      if (
        !Array.isArray(
          retailers[index].enquiries
        )
      ) {
        retailers[index].enquiries = [];
      }

      retailers[index].enquiries.push({
        id: enquiry.id,
        product: enquiry.product,
        quantity: enquiry.quantity,
        message: enquiry.message,
        status: enquiry.status,
        date: enquiry.date,
      });

      writeData(
        RETAILERS_FILE,
        retailers
      );
    }
  }

  res.status(201).json({
    success: true,
    message:
      "Enquiry submitted successfully",
    enquiry,
  });
});

app.put(
  "/api/enquiries/:id/status",
  (req, res) => {
    const enquiries = readData(
      ENQUIRIES_FILE
    );

    const { status } = req.body;

    const allowed = [
      "New",
      "Contacted",
      "Closed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const index = enquiries.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    enquiries[index].status = status;

    writeData(
      ENQUIRIES_FILE,
      enquiries
    );

    res.json({
      success: true,
      message:
        "Enquiry status updated",
      enquiry: enquiries[index],
    });
  }
);

app.delete(
  "/api/enquiries/:id",
  (req, res) => {
    const enquiries = readData(
      ENQUIRIES_FILE
    );

    const index = enquiries.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    const deleted = enquiries.splice(
      index,
      1
    )[0];

    writeData(
      ENQUIRIES_FILE,
      enquiries
    );

    res.json({
      success: true,
      message: "Enquiry deleted",
      enquiry: deleted,
    });
  }
);

/* =========================================
   OFFERS
========================================= */

app.get("/api/offers", (req, res) => {
  res.json(readData(OFFERS_FILE));
});

app.post("/api/offers", (req, res) => {
  const offers = readData(OFFERS_FILE);

  const {
    title,
    product,
    oldPrice,
    offerPrice,
    startDate,
    endDate,
    image,
    description,
  } = req.body;

  if (
    !title ||
    !product ||
    !offerPrice
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Offer title, product and offer price are required.",
    });
  }

  const offer = {
    id: createId("offer"),

    title: String(title).trim(),

    product: String(product).trim(),

    oldPrice: Number(oldPrice || 0),

    offerPrice: Number(offerPrice),

    startDate: startDate || null,

    endDate: endDate || null,

    image: image || "",

    description: description || "",

    createdAt: new Date().toISOString(),
  };

  offers.push(offer);

  writeData(OFFERS_FILE, offers);

  res.status(201).json({
    success: true,
    message:
      "Offer created successfully",
    offer,
  });
});

app.delete(
  "/api/offers/:id",
  (req, res) => {
    const offers = readData(OFFERS_FILE);

    const index = offers.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    const deleted = offers.splice(
      index,
      1
    )[0];

    writeData(OFFERS_FILE, offers);

    res.json({
      success: true,
      message: "Offer deleted",
      offer: deleted,
    });
  }
);

/* =========================================
   ORDERS
========================================= */

app.get("/api/orders", (req, res) => {
  console.log("GET /api/orders");

  const orders = readData(ORDERS_FILE);

  res.status(200).json(orders);
});

app.get("/api/orders/:id", (req, res) => {
  const orders = readData(ORDERS_FILE);

  const order = orders.find(
    (item) =>
      String(item.id) ===
      String(req.params.id)
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.json(order);
});

/* =========================================
   RETAILER ORDERS
========================================= */

app.get(
  "/api/orders/retailer/:retailerId",
  (req, res) => {
    const orders = readData(ORDERS_FILE);

    const retailerOrders =
      orders.filter(
        (order) =>
          String(order.retailerId) ===
          String(
            req.params.retailerId
          )
      );

    res.json(retailerOrders);
  }
);

/* =========================================
   CREATE ORDER
========================================= */

app.post("/api/orders", (req, res) => {
  const orders = readData(ORDERS_FILE);

  const retailers = readData(
    RETAILERS_FILE
  );

  const {
    retailerId,
    retailerName,
    name,
    phone,
    email,
    items,
    totalAmount,
    message,
  } = req.body;

  if (
    !name ||
    !phone ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Customer and order details are required.",
    });
  }

  const cleanItems = items.map(
    (item) => ({
      productId:
        item.productId ||
        item.id ||
        null,

      name: item.name || "Product",

      brand: item.brand || "",

      category: item.category || "",

      quantity: Number(
        item.quantity || 1
      ),

      price: Number(
        item.price ||
          item.wholesalePrice ||
          0
      ),

      image: item.image || "",
    })
  );

  const calculatedTotal =
    cleanItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

  const order = {
    id: createId("order"),

    retailerId: retailerId || null,

    retailerName:
      retailerName || name,

    name: String(name).trim(),

    phone: String(phone).trim(),

    email: String(email || "")
      .trim()
      .toLowerCase(),

    items: cleanItems,

    totalAmount: Number(
      totalAmount || calculatedTotal
    ),

    message: String(
      message || ""
    ).trim(),

    status: "New",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  orders.push(order);

  writeData(ORDERS_FILE, orders);

  if (retailerId) {
    const retailerIndex =
      retailers.findIndex(
        (item) =>
          String(item.id) ===
          String(retailerId)
      );

    if (retailerIndex !== -1) {
      if (
        !Array.isArray(
          retailers[retailerIndex]
            .orders
        )
      ) {
        retailers[retailerIndex].orders =
          [];
      }

      retailers[retailerIndex].orders.push(
        {
          id: order.id,

          totalAmount:
            order.totalAmount,

          status: order.status,

          items: order.items,

          createdAt: order.createdAt,
        }
      );

      writeData(
        RETAILERS_FILE,
        retailers
      );
    }
  }

  res.status(201).json({
    success: true,
    message:
      "Order created successfully",
    order,
  });
});

/* =========================================
   UPDATE ORDER STATUS
========================================= */

app.put(
  "/api/orders/:id/status",
  (req, res) => {
    const orders = readData(ORDERS_FILE);

    const { status } = req.body;

    const allowed = [
      "New",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status.",
      });
    }

    const index = orders.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    orders[index] = {
      ...orders[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    writeData(ORDERS_FILE, orders);

    res.json({
      success: true,
      message:
        "Order status updated.",
      order: orders[index],
    });
  }
);

/* =========================================
   DELETE ORDER
========================================= */

app.delete(
  "/api/orders/:id",
  (req, res) => {
    const orders = readData(ORDERS_FILE);

    const index = orders.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const deleted = orders.splice(
      index,
      1
    )[0];

    writeData(ORDERS_FILE, orders);

    res.json({
      success: true,
      message: "Order deleted.",
      order: deleted,
    });
  }
);

/* =========================================
   PRICE LIST DOWNLOADS
========================================= */

app.get(
  "/api/price-list-downloads",
  (req, res) => {
    const downloads = readData(
      PRICE_LIST_DOWNLOADS_FILE
    );

    res.json({
      success: true,
      downloads,
    });
  }
);

app.post(
  "/api/price-list-downloads",
  (req, res) => {
    const downloads = readData(
      PRICE_LIST_DOWNLOADS_FILE
    );

    const {
      retailerId,
      name,
      businessName,
      phone,
      email,
      language,
    } = req.body;

    const download = {
      id: createId("price-download"),

      retailerId:
        retailerId || null,

      name: String(name || "").trim(),

      businessName: String(
        businessName || ""
      ).trim(),

      phone: String(phone || "").trim(),

      email: String(email || "")
        .trim()
        .toLowerCase(),

      language: language || "EN",

      downloadedAt:
        new Date().toISOString(),
    };

    downloads.unshift(download);

    writeData(
      PRICE_LIST_DOWNLOADS_FILE,
      downloads
    );

    res.status(201).json({
      success: true,
      message:
        "Price list download recorded.",
      download,
    });
  }
);

/* =========================================
   AI CHAT
========================================= */

app.get("/api/ai-chats", (req, res) => {
  const chats = readData(AI_CHATS_FILE);

  res.json({
    success: true,
    chats,
  });
});

app.post("/api/ai-chats", (req, res) => {
  const chats = readData(AI_CHATS_FILE);

  const {
    retailerId,
    name,
    businessName,
    phone,
    email,
    message,
    reply,
    language,
  } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Chat message is required.",
    });
  }

  const chat = {
    id: createId("ai-chat"),

    retailerId: retailerId || null,

    name: String(name || "").trim(),

    businessName: String(
      businessName || ""
    ).trim(),

    phone: String(phone || "").trim(),

    email: String(email || "")
      .trim()
      .toLowerCase(),

    message: String(message).trim(),

    reply: String(reply || "").trim(),

    language: language || "EN",

    status: "New",

    createdAt: new Date().toISOString(),
  };

  chats.unshift(chat);

  writeData(AI_CHATS_FILE, chats);

  res.status(201).json({
    success: true,
    message: "AI chat saved.",
    chat,
  });
});

app.put(
  "/api/ai-chats/:id/status",
  (req, res) => {
    const chats = readData(AI_CHATS_FILE);

    const { status } = req.body;

    const allowed = [
      "New",
      "Read",
      "Contacted",
      "Closed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid chat status.",
      });
    }

    const index = chats.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    chats[index] = {
      ...chats[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    writeData(AI_CHATS_FILE, chats);

    res.json({
      success: true,
      message:
        "Chat status updated.",
      chat: chats[index],
    });
  }
);

app.delete(
  "/api/ai-chats/:id",
  (req, res) => {
    const chats = readData(AI_CHATS_FILE);

    const index = chats.findIndex(
      (item) =>
        String(item.id) ===
        String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const deleted = chats.splice(
      index,
      1
    )[0];

    writeData(AI_CHATS_FILE, chats);

    res.json({
      success: true,
      message: "Chat deleted.",
      chat: deleted,
    });
  }
);

/* =========================================
   ADMIN LOGIN
========================================= */

app.post(
  "/api/admin/login",
  (req, res) => {
    const {
      username,
      password,
    } = req.body;

    const adminUsername =
      process.env.ADMIN_USERNAME ||
      "admin";

    const adminPassword =
      process.env.ADMIN_PASSWORD ||
      "C24@2026";

    if (
      username === adminUsername &&
      password === adminPassword
    ) {
      return res.json({
        success: true,

        message:
          "Admin login successful",

        admin: {
          username: adminUsername,
          role: "admin",
        },
      });
    }

    res.status(401).json({
      success: false,
      message:
        "Invalid admin username or password.",
    });
  }
);

/* =========================================
   404
========================================= */

app.use((req, res) => {
  console.log(
    "404 ROUTE:",
    req.method,
    req.originalUrl
  );

  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

/* =========================================
   ERROR HANDLER
========================================= */

app.use(
  (error, req, res, next) => {
    console.error(
      "SERVER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

/* =========================================
   START SERVER
========================================= */

console.log("Starting C24 Backend...");

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      "===================================="
    );

    console.log(
      "C24 Backend running"
    );

    console.log(
      `Port: ${PORT}`
    );

    console.log(
      "===================================="
    );
  }
);