const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;


/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(cors());

app.use(express.json());


/* =====================================================
   DATA FOLDER
===================================================== */

const dataDir = path.join(
  __dirname,
  "data"
);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}


/* =====================================================
   DATA FILES
===================================================== */

const productsFile = path.join(
  dataDir,
  "products.json"
);

const offersFile = path.join(
  dataDir,
  "offers.json"
);

const enquiriesFile = path.join(
  dataDir,
  "enquiries.json"
);


/* =====================================================
   JSON FUNCTIONS
===================================================== */

function createFile(file, data) {

  if (!fs.existsSync(file)) {

    fs.writeFileSync(
      file,
      JSON.stringify(data, null, 2)
    );

  }

}


function readJSON(file) {

  try {

    return JSON.parse(
      fs.readFileSync(file, "utf8")
    );

  } catch {

    return [];

  }

}


function writeJSON(file, data) {

  fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2)
  );

}


/* =====================================================
   DEFAULT PRODUCTS
===================================================== */

createFile(productsFile, [

  {
    id: 1,
    name: "C24 Smart 4K TV",
    category: "Television",
    price: 24999,
    stock: 20,
    image: "/images/products/smart-tv.jpg"
  },

  {
    id: 2,
    name: "Premium Washing Machine",
    category: "Washing Machine",
    price: 19999,
    stock: 15,
    image: "/images/products/washing-machine.jpg"
  },

  {
    id: 3,
    name: "Double Door Refrigerator",
    category: "Refrigerator",
    price: 32999,
    stock: 12,
    image: "/images/products/refrigerator.jpg"
  }

]);


/* =====================================================
   DEFAULT OFFERS
===================================================== */

createFile(offersFile, [

  {
    id: 1,
    title: "Smart TV Wholesale Offer",
    product: "C24 Smart 4K TV",
    oldPrice: 24999,
    offerPrice: 21999,
    image: "/images/products/smart-tv.jpg"
  }

]);


/* =====================================================
   DEFAULT ENQUIRIES
===================================================== */

createFile(
  enquiriesFile,
  []
);


/* =====================================================
   HEALTH CHECK
===================================================== */

app.get(
  "/api/health",
  (req, res) => {

    res.json({
      success: true,
      message: "C24 Backend is running"
    });

  }
);


/* =====================================================
   ADMIN LOGIN
===================================================== */

app.post(
  "/api/admin/login",
  (req, res) => {

    const username =
      String(req.body.username || "").trim();

    const password =
      String(req.body.password || "").trim();


    if (
      username === "admin" &&
      password === "c24admin"
    ) {

      return res.json({

        success: true,

        message:
          "Admin login successful"

      });

    }


    return res.status(401).json({

      success: false,

      message:
        "Wrong username or password"

    });

  }
);


/* =====================================================
   GET PRODUCTS
===================================================== */

app.get(
  "/api/products",
  (req, res) => {

    const products =
      readJSON(productsFile);

    res.json(products);

  }
);


/* =====================================================
   ADD PRODUCT
===================================================== */

app.post(
  "/api/products",
  (req, res) => {

    const products =
      readJSON(productsFile);


    const product = {

      id: Date.now(),

      name:
        String(req.body.name || ""),

      category:
        String(req.body.category || ""),

      price:
        Number(req.body.price || 0),

      stock:
        Number(req.body.stock || 0),

      image:
        String(req.body.image || "")

    };


    if (!product.name) {

      return res.status(400).json({

        success: false,

        message:
          "Product name is required"

      });

    }


    products.push(product);


    writeJSON(
      productsFile,
      products
    );


    res.json({

      success: true,

      message:
        "Product added successfully",

      product

    });

  }
);


/* =====================================================
   UPDATE PRODUCT
===================================================== */

app.put(
  "/api/products/:id",
  (req, res) => {

    const products =
      readJSON(productsFile);

    const id =
      Number(req.params.id);


    const index =
      products.findIndex(
        product =>
          product.id === id
      );


    if (index === -1) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found"

      });

    }


    products[index] = {

      ...products[index],

      ...req.body,

      price:
        req.body.price !== undefined
          ? Number(req.body.price)
          : products[index].price,

      stock:
        req.body.stock !== undefined
          ? Number(req.body.stock)
          : products[index].stock

    };


    writeJSON(
      productsFile,
      products
    );


    res.json({

      success: true,

      message:
        "Product updated",

      product:
        products[index]

    });

  }
);


/* =====================================================
   DELETE PRODUCT
===================================================== */

app.delete(
  "/api/products/:id",
  (req, res) => {

    const products =
      readJSON(productsFile);

    const id =
      Number(req.params.id);


    const newProducts =
      products.filter(
        product =>
          product.id !== id
      );


    writeJSON(
      productsFile,
      newProducts
    );


    res.json({

      success: true,

      message:
        "Product deleted"

    });

  }
);


/* =====================================================
   GET OFFERS
===================================================== */

app.get(
  "/api/offers",
  (req, res) => {

    const offers =
      readJSON(offersFile);

    res.json(offers);

  }
);


/* =====================================================
   ADD OFFER
===================================================== */

app.post(
  "/api/offers",
  (req, res) => {

    const offers =
      readJSON(offersFile);


    const offer = {

      id: Date.now(),

      title:
        String(req.body.title || ""),

      product:
        String(req.body.product || ""),

      oldPrice:
        Number(req.body.oldPrice || 0),

      offerPrice:
        Number(req.body.offerPrice || 0),

      image:
        String(req.body.image || "")

    };


    offers.push(offer);


    writeJSON(
      offersFile,
      offers
    );


    res.json({

      success: true,

      message:
        "Offer added successfully",

      offer

    });

  }
);


/* =====================================================
   CREATE ENQUIRY
===================================================== */

app.post(
  "/api/enquiries",
  (req, res) => {

    const enquiries =
      readJSON(
        enquiriesFile
      );


    const enquiry = {

      id: Date.now(),

      name:
        String(req.body.name || ""),

      phone:
        String(req.body.phone || ""),

      email:
        String(req.body.email || ""),

      product:
        String(req.body.product || ""),

      quantity:
        String(req.body.quantity || ""),

      message:
        String(req.body.message || ""),

      createdAt:
        new Date().toISOString()

    };


    if (
      !enquiry.name ||
      !enquiry.phone
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Name and phone are required"

      });

    }


    enquiries.push(enquiry);


    writeJSON(
      enquiriesFile,
      enquiries
    );


    res.json({

      success: true,

      message:
        "Wholesale enquiry submitted",

      enquiry

    });

  }
);


/* =====================================================
   GET ENQUIRIES
===================================================== */

app.get(
  "/api/enquiries",
  (req, res) => {

    const enquiries =
      readJSON(
        enquiriesFile
      );

    res.json(enquiries);

  }
);


/* =====================================================
   AI CHAT
===================================================== */

app.post(
  "/api/ai-chat",
  (req, res) => {

    const message =
      String(
        req.body.message || ""
      ).trim();


    if (!message) {

      return res.status(400).json({

        success: false,

        reply:
          "Please enter your question."

      });

    }


    const products =
      readJSON(productsFile);

    const offers =
      readJSON(offersFile);


    const text =
      message.toLowerCase();


    /* PRODUCTS */

    if (
      text.includes("product") ||
      text.includes("products") ||
      text.includes("प्रोडक्ट")
    ) {

      const list =
        products
          .slice(0, 10)
          .map(
            product =>
              `${product.name} - ₹${product.price}`
          )
          .join("\n");


      return res.json({

        success: true,

        reply:
          `Available products:\n${list}`

      });

    }


    /* OFFERS */

    if (
      text.includes("offer") ||
      text.includes("offers") ||
      text.includes("ऑफर")
    ) {

      if (!offers.length) {

        return res.json({

          success: true,

          reply:
            "Currently there are no active offers."

        });

      }


      const list =
        offers
          .map(
            offer =>
              `${offer.title} - ₹${offer.offerPrice}`
          )
          .join("\n");


      return res.json({

        success: true,

        reply:
          `Today's offers:\n${list}`

      });

    }


    /* WHOLESALE */

    if (
      text.includes("wholesale") ||
      text.includes("bulk") ||
      text.includes("bulk order") ||
      text.includes("थोक")
    ) {

      return res.json({

        success: true,

        reply:
          "Sure! Please tell me the product name and required quantity. Our wholesale team will help you with the best quotation."

      });

    }


    /* PRICE */

    if (
      text.includes("price") ||
      text.includes("cost") ||
      text.includes("कीमत")
    ) {

      return res.json({

        success: true,

        reply:
          "Please tell me the product name whose price you want to know."

      });

    }


    /* DEFAULT */

    return res.json({

      success: true,

      reply:
        "👋 Welcome to C24 Wholesale! I can help you with products, prices, daily offers and wholesale enquiries."

    });

  }
);


/* =====================================================
   START SERVER
===================================================== */

app.listen(
  PORT,
  () => {

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "       C24 WHOLESALE BACKEND"
    );
    console.log(
      "========================================"
    );
    console.log(
      `Server: http://localhost:${PORT}`
    );
    console.log(
      `Health: http://localhost:${PORT}/api/health`
    );
    console.log(
      "Admin Username: admin"
    );
    console.log(
      "Admin Password: c24admin"
    );
    console.log(
      "========================================"
    );
    console.log("");

  }
);