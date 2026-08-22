import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {
  /* =====================================================
     ENGLISH
  ===================================================== */

  EN: {
    /* NAVIGATION */

    home: "Home",
    about: "About Us",
    products: "Products",
    categories: "Categories",
    offers: "Daily Offers",
    priceList: "Price List",
    contact: "Contact",
    login: "Retailer Login",
    cart: "Cart",
    language: "Language",
    adminPanel: "Admin Panel",

    /* HOME */

    homeTitle: "Premium Electronics",
    homeTitle2: "Wholesale Store",

    homeDescription:
      "India's Premium Home Appliances Wholesale Platform",

    explore: "Explore Products",
    wholesaleQuote: "Get Wholesale Quote",

    /* PRODUCTS */

    productCollection:
      "C24 PRODUCT COLLECTION",

    productsAvailable:
      "Products Available",

    search:
      "Search products...",

    allBrands:
      "All Brands",

    allCategories:
      "All Categories",

    sortProducts:
      "Sort Products",

    lowToHigh:
      "Price: Low to High",

    highToLow:
      "Price: High to Low",

    newest:
      "Newest",

    inStock:
      "In Stock Only",

    clearFilters:
      "Clear Filters",

    noProducts:
      "No Products Found",

    tryFilters:
      "Try changing your search or filters.",

    addToCart:
      "Add to Cart",

    viewProduct:
      "View Product",

    viewProducts:
      "View Products",

    viewAllProducts:
      "View All Products",

    buyNow:
      "Buy Now",

    /* PRICES */

    price:
      "Price",

    mrp:
      "MRP",

    wholesale:
      "Wholesale",

    wholesalePrice:
      "Wholesale Price",

    originalPrice:
      "Original Price",

    offerPrice:
      "Offer Price",

    discount:
      "Discount",

    /* STOCK */

    stock:
      "Stock",

    available:
      "Available",

    inStockText:
      "In Stock",

    outOfStock:
      "Out of Stock",

    /* RETAILER */

    retailerAccess:
      "Retailer Access",

    welcome:
      "Welcome",

    wholesalePricing:
      "Wholesale Pricing",

    retailerLoginRequired:
      "Retailer login required",

    loginWholesale:
      "Login to view exclusive wholesale prices.",

    logout:
      "Logout",

    /* CART */

    cartItems:
      "Cart Items",

    cartEmpty:
      "Your cart is empty.",

    quantity:
      "Quantity",

    subtotal:
      "Subtotal",

    total:
      "Total",

    remove:
      "Remove",

    updateCart:
      "Update Cart",

    proceedCheckout:
      "Proceed to Checkout",

    continueShopping:
      "Continue Shopping",

    cartUpdated:
      "Cart updated successfully.",

    itemAdded:
      "Product added to cart.",

    itemRemoved:
      "Product removed from cart.",

    clearCart:
      "Clear Cart",

    cartSummary:
      "Cart Summary",

    /* CHECKOUT */

    checkout:
      "Checkout",

    checkoutDetails:
      "Checkout Details",

    customerDetails:
      "Customer Details",

    orderDetails:
      "Order Details",

    placeOrder:
      "Place Order",

    orderNow:
      "Order Now",

    orderPlaced:
      "Order placed successfully.",

    orderFailed:
      "Order could not be placed.",

    orderConfirmation:
      "Order Confirmation",

    orderNumber:
      "Order Number",

    orderStatus:
      "Order Status",

    /* CATEGORIES */

    shopByCategory:
      "Shop by Category",

    categoryDescription:
      "Explore our premium home appliances and electronics categories.",

    categoryProducts:
      "Category Products",

    selectCategory:
      "Select Category",

    noCategories:
      "No Categories Found",

    smartTV:
      "Smart TV",

    airConditioner:
      "Air Conditioner",

    washingMachine:
      "Washing Machine",

    refrigerator:
      "Refrigerator",

    mixerGrinder:
      "Mixer Grinder",

    ceilingFan:
      "Ceiling Fan",

    waterHeater:
      "Water Heater",

    kitchenAppliances:
      "Kitchen Appliances",

    television:
      "Television",

    fan:
      "Fan",

    microwave:
      "Microwave",

    cooler:
      "Cooler",

    homeAppliances:
      "Home Appliances",

    /* DAILY OFFERS */

    dailyDeals:
      "C24 WHOLESALE DEALS",

    dailyOffers:
      "Daily Offers",

    limitedOffers:
      "Limited-time wholesale offers for retailers and bulk buyers.",

    offer:
      "OFFER",

    limitedTime:
      "Limited Time Offer",

    getOffer:
      "Get Offer",

    enquireNow:
      "Enquire Now",

    /* CONTACT */

    contactUs:
      "Contact Us",

    contactTitle:
      "Let's Connect",

    contactDescription:
      "Have questions about products, wholesale pricing or bulk orders? Contact our C24 team.",

    sendMessage:
      "Send Message",

    phone:
      "Phone Number",

    email:
      "Email",

    message:
      "Message",

    address:
      "Address",

    businessHours:
      "Business Hours",

    callNow:
      "Call Now",

    emailUs:
      "Email Us",

    whatsappUs:
      "WhatsApp Us",

    getInTouch:
      "Get in Touch",

    /* ENQUIRY */

    enquiry:
      "Enquiry",

    wholesaleEnquiry:
      "Wholesale Enquiry",

    enquiryTitle:
      "Send Wholesale Enquiry",

    enquiryDescription:
      "Tell us what products and quantities you need. Our team will contact you shortly.",

    yourName:
      "Your Name",

    businessName:
      "Business Name",

    product:
      "Product",

    productName:
      "Product Name",

    quantityRequired:
      "Required Quantity",

    submitEnquiry:
      "Submit Wholesale Enquiry",

    enquirySubmitted:
      "Enquiry submitted successfully.",

    enquiryFailed:
      "Enquiry could not be submitted.",

    enquiryHistory:
      "Enquiry History",

    /* WHATSAPP */

    whatsapp:
      "WhatsApp",

    whatsappMessage:
      "Hello C24 Wholesale 👋",

    shareWholesaleDetails:
      "Please share wholesale details.",

    /* LIVE AI CHAT */

    liveAiChat:
      "Live AI Chat",

    aiChat:
      "AI Chat",

    chatWithUs:
      "Chat with C24 AI",

    aiWelcome:
      "Hello! Welcome to C24 Wholesale.",

    aiDescription:
      "Ask me about products, prices, stock, wholesale orders or enquiries.",

    typeMessage:
      "Type your message...",

    send:
      "Send",

    aiThinking:
      "AI is thinking...",

    aiUnavailable:
      "AI chat is currently unavailable.",

    /* SCANNER */

    scanner:
      "Scanner",

    scanProduct:
      "Scan Product",

    scanQRCode:
      "Scan QR Code",

    scannerTitle:
      "Product Scanner",

    scannerDescription:
      "Scan a product QR code to view product details.",

    startScanner:
      "Start Scanner",

    stopScanner:
      "Stop Scanner",

    scannerPermission:
      "Camera permission is required.",

    scannerNotSupported:
      "Scanner is not supported on this device.",

    scanResult:
      "Scan Result",

    /* ADMIN */

    admin:
      "Admin",

    adminLogin:
      "Admin Login",

    adminDashboard:
      "Admin Dashboard",

    manageProducts:
      "Manage Products",

    manageOrders:
      "Manage Orders",

    manageRetailers:
      "Manage Retailers",

    manageEnquiries:
      "Manage Enquiries",

    manageOffers:
      "Manage Offers",

    /* ORDERS */

    wholesaleOrders:
      "WHOLESALE ORDERS",

    orders:
      "Orders",

    orderHistory:
      "Order History",

    yourOrders:
      "Your Orders",

    noOrders:
      "No Orders Yet",

    browseProducts:
      "Browse Products",

    newOrder:
      "New Order",

    pending:
      "Pending",

    confirmed:
      "Confirmed",

    processing:
      "Processing",

    shipped:
      "Shipped",

    delivered:
      "Delivered",

    cancelled:
      "Cancelled",

    /* BUSINESS */

    trustedWholesale:
      "Trusted Wholesale Partner",

    trustedDescription:
      "Reliable wholesale products, competitive pricing and professional retailer support.",

    businessTrust:
      "BUSINESS TRUST",

    growBusiness:
      "Grow Your Business With C24",

    businessDescription:
      "Get quality home appliances at competitive wholesale prices.",

    retailerSupport:
      "Retailer Support",

    /* GENERAL */

    loading:
      "Loading...",

    close:
      "Close",

    back:
      "Back",

    cancel:
      "Cancel",

    submit:
      "Submit",

    save:
      "Save",

    edit:
      "Edit",

    delete:
      "Delete",

    confirm:
      "Confirm",

    yes:
      "Yes",

    no:
      "No",

    bulkQuantity:
      "bulk quantity?",

    required:
      "Required",

    optional:
      "Optional",

    success:
      "Success",

    error:
      "Error",

    refresh:
      "Refresh",

    details:
      "Details",

    description:
      "Description",

    specifications:
      "Specifications",

    backToStore:
      "Back to Store",
  },


  /* =====================================================
     HINDI
  ===================================================== */

  HI: {
    home: "होम",
    about: "हमारे बारे में",
    products: "प्रोडक्ट्स",
    categories: "कैटेगरी",
    offers: "डेली ऑफर्स",
    priceList: "प्राइस लिस्ट",
    contact: "संपर्क",
    login: "रिटेलर लॉगिन",
    cart: "कार्ट",
    language: "भाषा",
    adminPanel: "एडमिन पैनल",

    homeTitle:
      "प्रीमियम इलेक्ट्रॉनिक्स",

    homeTitle2:
      "थोक स्टोर",

    homeDescription:
      "भारत का प्रीमियम होम अप्लायंसेज थोक प्लेटफॉर्म",

    explore:
      "प्रोडक्ट देखें",

    wholesaleQuote:
      "थोक भाव पूछें",

    productCollection:
      "C24 प्रोडक्ट कलेक्शन",

    productsAvailable:
      "प्रोडक्ट उपलब्ध",

    search:
      "प्रोडक्ट खोजें...",

    allBrands:
      "सभी ब्रांड",

    allCategories:
      "सभी कैटेगरी",

    sortProducts:
      "प्रोडक्ट सॉर्ट करें",

    lowToHigh:
      "कीमत: कम से ज्यादा",

    highToLow:
      "कीमत: ज्यादा से कम",

    newest:
      "नए प्रोडक्ट",

    inStock:
      "सिर्फ स्टॉक में",

    clearFilters:
      "फिल्टर हटाएं",

    noProducts:
      "कोई प्रोडक्ट नहीं मिला",

    tryFilters:
      "सर्च या फिल्टर बदलकर देखें।",

    addToCart:
      "कार्ट में जोड़ें",

    viewProduct:
      "प्रोडक्ट देखें",

    viewProducts:
      "प्रोडक्ट देखें",

    viewAllProducts:
      "सभी प्रोडक्ट देखें",

    buyNow:
      "अभी खरीदें",

    price:
      "कीमत",

    mrp:
      "एमआरपी",

    wholesale:
      "थोक",

    wholesalePrice:
      "थोक कीमत",

    originalPrice:
      "मूल कीमत",

    offerPrice:
      "ऑफर कीमत",

    discount:
      "छूट",

    stock:
      "स्टॉक",

    available:
      "उपलब्ध",

    inStockText:
      "स्टॉक में",

    outOfStock:
      "स्टॉक खत्म",

    retailerAccess:
      "रिटेलर एक्सेस",

    welcome:
      "स्वागत है",

    wholesalePricing:
      "थोक मूल्य",

    retailerLoginRequired:
      "रिटेलर लॉगिन जरूरी है",

    loginWholesale:
      "विशेष थोक कीमत देखने के लिए लॉगिन करें।",

    logout:
      "लॉगआउट",

    cartItems:
      "कार्ट आइटम",

    cartEmpty:
      "आपका कार्ट खाली है।",

    quantity:
      "मात्रा",

    subtotal:
      "उप-योग",

    total:
      "कुल",

    remove:
      "हटाएं",

    updateCart:
      "कार्ट अपडेट करें",

    proceedCheckout:
      "चेकआउट करें",

    continueShopping:
      "शॉपिंग जारी रखें",

    cartUpdated:
      "कार्ट सफलतापूर्वक अपडेट हुआ।",

    itemAdded:
      "प्रोडक्ट कार्ट में जोड़ दिया गया।",

    itemRemoved:
      "प्रोडक्ट कार्ट से हटा दिया गया।",

    clearCart:
      "कार्ट खाली करें",

    cartSummary:
      "कार्ट सारांश",

    checkout:
      "चेकआउट",

    checkoutDetails:
      "चेकआउट विवरण",

    customerDetails:
      "ग्राहक विवरण",

    orderDetails:
      "ऑर्डर विवरण",

    placeOrder:
      "ऑर्डर करें",

    orderNow:
      "अभी ऑर्डर करें",

    orderPlaced:
      "ऑर्डर सफलतापूर्वक हो गया।",

    orderFailed:
      "ऑर्डर नहीं हो सका।",

    orderConfirmation:
      "ऑर्डर की पुष्टि",

    orderNumber:
      "ऑर्डर नंबर",

    orderStatus:
      "ऑर्डर स्थिति",

    shopByCategory:
      "कैटेगरी के अनुसार खरीदें",

    categoryDescription:
      "प्रीमियम होम अप्लायंसेज और इलेक्ट्रॉनिक्स की कैटेगरी देखें।",

    categoryProducts:
      "कैटेगरी के प्रोडक्ट",

    selectCategory:
      "कैटेगरी चुनें",

    noCategories:
      "कोई कैटेगरी नहीं मिली",

    smartTV:
      "स्मार्ट टीवी",

    airConditioner:
      "एयर कंडीशनर",

    washingMachine:
      "वॉशिंग मशीन",

    refrigerator:
      "फ्रिज",

    mixerGrinder:
      "मिक्सर ग्राइंडर",

    ceilingFan:
      "सीलिंग फैन",

    waterHeater:
      "वॉटर हीटर",

    kitchenAppliances:
      "किचन अप्लायंसेज",

    television:
      "टेलीविजन",

    fan:
      "पंखा",

    microwave:
      "माइक्रोवेव",

    cooler:
      "कूलर",

    homeAppliances:
      "होम अप्लायंसेज",

    dailyDeals:
      "C24 थोक ऑफर्स",

    dailyOffers:
      "डेली ऑफर्स",

    limitedOffers:
      "रिटेलर्स और बल्क खरीदारों के लिए सीमित समय के थोक ऑफर्स।",

    offer:
      "ऑफर",

    limitedTime:
      "सीमित समय का ऑफर",

    getOffer:
      "ऑफर पाएं",

    enquireNow:
      "अभी पूछताछ करें",

    contactUs:
      "हमसे संपर्क करें",

    contactTitle:
      "हमसे जुड़ें",

    contactDescription:
      "प्रोडक्ट, थोक कीमत या बल्क ऑर्डर से जुड़े सवालों के लिए C24 टीम से संपर्क करें।",

    sendMessage:
      "मैसेज भेजें",

    phone:
      "फोन नंबर",

    email:
      "ईमेल",

    message:
      "मैसेज",

    address:
      "पता",

    businessHours:
      "बिजनेस समय",

    callNow:
      "अभी कॉल करें",

    emailUs:
      "ईमेल करें",

    whatsappUs:
      "व्हाट्सऐप करें",

    getInTouch:
      "संपर्क करें",

    enquiry:
      "पूछताछ",

    wholesaleEnquiry:
      "थोक पूछताछ",

    enquiryTitle:
      "थोक पूछताछ भेजें",

    enquiryDescription:
      "आपको कौन से प्रोडक्ट और कितनी मात्रा चाहिए, बताएं। हमारी टीम जल्द आपसे संपर्क करेगी।",

    yourName:
      "आपका नाम",

    businessName:
      "बिजनेस का नाम",

    product:
      "प्रोडक्ट",

    productName:
      "प्रोडक्ट का नाम",

    quantityRequired:
      "जरूरी मात्रा",

    submitEnquiry:
      "थोक पूछताछ भेजें",

    enquirySubmitted:
      "पूछताछ सफलतापूर्वक भेज दी गई।",

    enquiryFailed:
      "पूछताछ भेजी नहीं जा सकी।",

    enquiryHistory:
      "पूछताछ इतिहास",

    whatsapp:
      "व्हाट्सऐप",

    whatsappMessage:
      "नमस्ते C24 Wholesale 👋",

    shareWholesaleDetails:
      "कृपया थोक की जानकारी साझा करें।",

    liveAiChat:
      "लाइव AI चैट",

    aiChat:
      "AI चैट",

    chatWithUs:
      "C24 AI से चैट करें",

    aiWelcome:
      "नमस्ते! C24 Wholesale में आपका स्वागत है।",

    aiDescription:
      "प्रोडक्ट, कीमत, स्टॉक, थोक ऑर्डर या पूछताछ के बारे में पूछें।",

    typeMessage:
      "अपना मैसेज लिखें...",

    send:
      "भेजें",

    aiThinking:
      "AI जवाब तैयार कर रहा है...",

    aiUnavailable:
      "AI चैट अभी उपलब्ध नहीं है।",

    scanner:
      "स्कैनर",

    scanProduct:
      "प्रोडक्ट स्कैन करें",

    scanQRCode:
      "QR कोड स्कैन करें",

    scannerTitle:
      "प्रोडक्ट स्कैनर",

    scannerDescription:
      "प्रोडक्ट की जानकारी देखने के लिए QR कोड स्कैन करें।",

    startScanner:
      "स्कैनर शुरू करें",

    stopScanner:
      "स्कैनर बंद करें",

    scannerPermission:
      "कैमरा की अनुमति जरूरी है।",

    scannerNotSupported:
      "इस डिवाइस पर स्कैनर उपलब्ध नहीं है।",

    scanResult:
      "स्कैन परिणाम",

    admin:
      "एडमिन",

    adminLogin:
      "एडमिन लॉगिन",

    adminDashboard:
      "एडमिन डैशबोर्ड",

    manageProducts:
      "प्रोडक्ट मैनेज करें",

    manageOrders:
      "ऑर्डर मैनेज करें",

    manageRetailers:
      "रिटेलर्स मैनेज करें",

    manageEnquiries:
      "पूछताछ मैनेज करें",

    manageOffers:
      "ऑफर्स मैनेज करें",

    wholesaleOrders:
      "थोक ऑर्डर्स",

    orders:
      "ऑर्डर्स",

    orderHistory:
      "ऑर्डर इतिहास",

    yourOrders:
      "आपके ऑर्डर्स",

    noOrders:
      "अभी कोई ऑर्डर नहीं है",

    browseProducts:
      "प्रोडक्ट देखें",

    newOrder:
      "नया ऑर्डर",

    pending:
      "पेंडिंग",

    confirmed:
      "कन्फर्म",

    processing:
      "प्रोसेसिंग",

    shipped:
      "भेज दिया गया",

    delivered:
      "डिलीवर हो गया",

    cancelled:
      "रद्द",

    trustedWholesale:
      "भरोसेमंद थोक पार्टनर",

    trustedDescription:
      "भरोसेमंद थोक प्रोडक्ट्स, बेहतर कीमत और रिटेलर्स के लिए प्रोफेशनल सपोर्ट।",

    businessTrust:
      "बिजनेस ट्रस्ट",

    growBusiness:
      "C24 के साथ अपना बिजनेस बढ़ाएं",

    businessDescription:
      "बेहतर थोक कीमतों पर क्वालिटी होम अप्लायंसेज प्राप्त करें।",

    retailerSupport:
      "रिटेलर सपोर्ट",

    loading:
      "लोड हो रहा है...",

    close:
      "बंद करें",

    back:
      "वापस",

    cancel:
      "रद्द करें",

    submit:
      "सबमिट करें",

    save:
      "सेव करें",

    edit:
      "एडिट करें",

    delete:
      "डिलीट करें",

    confirm:
      "कन्फर्म करें",

    yes:
      "हां",

    no:
      "नहीं",

    bulkQuantity:
      "बल्क मात्रा?",

    required:
      "जरूरी",

    optional:
      "वैकल्पिक",

    success:
      "सफल",

    error:
      "त्रुटि",

    refresh:
      "रिफ्रेश",

    details:
      "विवरण",

    description:
      "विवरण",

    specifications:
      "स्पेसिफिकेशन",

    backToStore:
      "स्टोर पर वापस जाएं",
  },


  /* =====================================================
     GUJARATI
  ===================================================== */

  GU: {
    home: "હોમ",
    about: "અમારા વિશે",
    products: "પ્રોડક્ટ્સ",
    categories: "કેટેગરીઝ",
    offers: "ડેઇલી ઓફર્સ",
    priceList: "પ્રાઇસ લિસ્ટ",
    contact: "સંપર્ક",
    login: "રિટેલર લોગિન",
    cart: "કાર્ટ",
    language: "ભાષા",
    adminPanel: "એડમિન પેનલ",

    homeTitle:
      "પ્રીમિયમ ઇલેક્ટ્રોનિક્સ",

    homeTitle2:
      "હોલસેલ સ્ટોર",

    homeDescription:
      "ભારતનું પ્રીમિયમ હોમ એપ્લાયન્સ હોલસેલ પ્લેટફોર્મ",

    explore:
      "પ્રોડક્ટ્સ જુઓ",

    wholesaleQuote:
      "હોલસેલ ભાવ મેળવો",

    productCollection:
      "C24 પ્રોડક્ટ કલેક્શન",

    productsAvailable:
      "પ્રોડક્ટ્સ ઉપલબ્ધ",

    search:
      "પ્રોડક્ટ શોધો...",

    allBrands:
      "બધા બ્રાન્ડ્સ",

    allCategories:
      "બધી કેટેગરીઝ",

    sortProducts:
      "પ્રોડક્ટ સોર્ટ કરો",

    lowToHigh:
      "કિંમત: ઓછીથી વધુ",

    highToLow:
      "કિંમત: વધુથી ઓછી",

    newest:
      "નવા પ્રોડક્ટ્સ",

    inStock:
      "ફક્ત સ્ટોકમાં",

    clearFilters:
      "ફિલ્ટર સાફ કરો",

    noProducts:
      "કોઈ પ્રોડક્ટ મળ્યો નથી",

    tryFilters:
      "તમારી સર્ચ અથવા ફિલ્ટર બદલીને જુઓ.",

    addToCart:
      "કાર્ટમાં ઉમેરો",

    viewProduct:
      "પ્રોડક્ટ જુઓ",

    viewProducts:
      "પ્રોડક્ટ્સ જુઓ",

    viewAllProducts:
      "બધા પ્રોડક્ટ્સ જુઓ",

    buyNow:
      "હમણાં ખરીદો",

    price:
      "કિંમત",

    mrp:
      "MRP",

    wholesale:
      "હોલસેલ",

    wholesalePrice:
      "હોલસેલ કિંમત",

    originalPrice:
      "મૂળ કિંમત",

    offerPrice:
      "ઓફર કિંમત",

    discount:
      "ડિસ્કાઉન્ટ",

    stock:
      "સ્ટોક",

    available:
      "ઉપલબ્ધ",

    inStockText:
      "સ્ટોકમાં",

    outOfStock:
      "સ્ટોકમાં નથી",

    retailerAccess:
      "રિટેલર એક્સેસ",

    welcome:
      "સ્વાગત છે",

    wholesalePricing:
      "હોલસેલ કિંમત",

    retailerLoginRequired:
      "રિટેલર લોગિન જરૂરી છે",

    loginWholesale:
      "ખાસ હોલસેલ કિંમત જોવા માટે લોગિન કરો.",

    logout:
      "લોગઆઉટ",

    cartItems:
      "કાર્ટ આઇટમ્સ",

    cartEmpty:
      "તમારું કાર્ટ ખાલી છે.",

    quantity:
      "જથ્થો",

    subtotal:
      "પેટા કુલ",

    total:
      "કુલ",

    remove:
      "દૂર કરો",

    updateCart:
      "કાર્ટ અપડેટ કરો",

    proceedCheckout:
      "ચેકઆઉટ કરો",

    continueShopping:
      "શોપિંગ ચાલુ રાખો",

    cartUpdated:
      "કાર્ટ સફળતાપૂર્વક અપડેટ થયું.",

    itemAdded:
      "પ્રોડક્ટ કાર્ટમાં ઉમેરવામાં આવ્યું.",

    itemRemoved:
      "પ્રોડક્ટ કાર્ટમાંથી દૂર કરવામાં આવ્યું.",

    clearCart:
      "કાર્ટ ખાલી કરો",

    cartSummary:
      "કાર્ટ સારાંશ",

    checkout:
      "ચેકઆઉટ",

    checkoutDetails:
      "ચેકઆઉટ વિગતો",

    customerDetails:
      "ગ્રાહક વિગતો",

    orderDetails:
      "ઓર્ડર વિગતો",

    placeOrder:
      "ઓર્ડર કરો",

    orderNow:
      "હમણાં ઓર્ડર કરો",

    orderPlaced:
      "ઓર્ડર સફળતાપૂર્વક કરવામાં આવ્યો.",

    orderFailed:
      "ઓર્ડર થઈ શક્યો નથી.",

    orderConfirmation:
      "ઓર્ડર કન્ફર્મેશન",

    orderNumber:
      "ઓર્ડર નંબર",

    orderStatus:
      "ઓર્ડર સ્થિતિ",

    shopByCategory:
      "કેટેગરી પ્રમાણે ખરીદો",

    categoryDescription:
      "પ્રીમિયમ હોમ એપ્લાયન્સ અને ઇલેક્ટ્રોનિક્સની કેટેગરી જુઓ.",

    categoryProducts:
      "કેટેગરીના પ્રોડક્ટ્સ",

    selectCategory:
      "કેટેગરી પસંદ કરો",

    noCategories:
      "કોઈ કેટેગરી મળી નથી",

    smartTV:
      "સ્માર્ટ ટીવી",

    airConditioner:
      "એર કન્ડિશનર",

    washingMachine:
      "વોશિંગ મશીન",

    refrigerator:
      "ફ્રિજ",

    mixerGrinder:
      "મિક્સર ગ્રાઇન્ડર",

    ceilingFan:
      "સીલિંગ ફેન",

    waterHeater:
      "વોટર હીટર",

    kitchenAppliances:
      "કિચન એપ્લાયન્સ",

    television:
      "ટેલિવિઝન",

    fan:
      "પંખો",

    microwave:
      "માઇક્રોવેવ",

    cooler:
      "કૂલર",

    homeAppliances:
      "હોમ એપ્લાયન્સ",

    dailyDeals:
      "C24 હોલસેલ ડીલ્સ",

    dailyOffers:
      "ડેઇલી ઓફર્સ",

    limitedOffers:
      "રિટેલર્સ અને બલ્ક ખરીદદારો માટે મર્યાદિત સમયના હોલસેલ ઓફર્સ.",

    offer:
      "ઓફર",

    limitedTime:
      "મર્યાદિત સમયની ઓફર",

    getOffer:
      "ઓફર મેળવો",

    enquireNow:
      "હમણાં પૂછપરછ કરો",

    contactUs:
      "અમારો સંપર્ક કરો",

    contactTitle:
      "અમારી સાથે જોડાઓ",

    contactDescription:
      "પ્રોડક્ટ, હોલસેલ કિંમત અથવા બલ્ક ઓર્ડર વિશે કોઈ પ્રશ્ન હોય તો C24 ટીમનો સંપર્ક કરો.",

    sendMessage:
      "મેસેજ મોકલો",

    phone:
      "ફોન નંબર",

    email:
      "ઈમેલ",

    message:
      "મેસેજ",

    address:
      "સરનામું",

    businessHours:
      "બિઝનેસ સમય",

    callNow:
      "હમણાં કૉલ કરો",

    emailUs:
      "ઈમેલ કરો",

    whatsappUs:
      "વોટ્સએપ કરો",

    getInTouch:
      "સંપર્ક કરો",

    enquiry:
      "પૂછપરછ",

    wholesaleEnquiry:
      "હોલસેલ પૂછપરછ",

    enquiryTitle:
      "હોલસેલ પૂછપરછ મોકલો",

    enquiryDescription:
      "તમને કયા પ્રોડક્ટ્સ અને કેટલી માત્રા જોઈએ છે તે જણાવો. અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે.",

    yourName:
      "તમારું નામ",

    businessName:
      "બિઝનેસનું નામ",

    product:
      "પ્રોડક્ટ",

    productName:
      "પ્રોડક્ટનું નામ",

    quantityRequired:
      "જરૂરી જથ્થો",

    submitEnquiry:
      "હોલસેલ પૂછપરછ મોકલો",

    enquirySubmitted:
      "પૂછપરછ સફળતાપૂર્વક મોકલવામાં આવી.",

    enquiryFailed:
      "પૂછપરછ મોકલી શકાઈ નથી.",

    enquiryHistory:
      "પૂછપરછ ઇતિહાસ",

    whatsapp:
      "વોટ્સએપ",

    whatsappMessage:
      "નમસ્તે C24 Wholesale 👋",

    shareWholesaleDetails:
      "કૃપા કરીને હોલસેલ વિગતો શેર કરો.",

    liveAiChat:
      "લાઇવ AI ચેટ",

    aiChat:
      "AI ચેટ",

    chatWithUs:
      "C24 AI સાથે ચેટ કરો",

    aiWelcome:
      "નમસ્તે! C24 Wholesale માં તમારું સ્વાગત છે.",

    aiDescription:
      "પ્રોડક્ટ, કિંમત, સ્ટોક, હોલસેલ ઓર્ડર અથવા પૂછપરછ વિશે પૂછો.",

    typeMessage:
      "તમારો મેસેજ લખો...",

    send:
      "મોકલો",

    aiThinking:
      "AI જવાબ તૈયાર કરી રહ્યું છે...",

    aiUnavailable:
      "AI ચેટ હાલમાં ઉપલબ્ધ નથી.",

    scanner:
      "સ્કેનર",

    scanProduct:
      "પ્રોડક્ટ સ્કેન કરો",

    scanQRCode:
      "QR કોડ સ્કેન કરો",

    scannerTitle:
      "પ્રોડક્ટ સ્કેનર",

    scannerDescription:
      "પ્રોડક્ટની વિગતો જોવા માટે QR કોડ સ્કેન કરો.",

    startScanner:
      "સ્કેનર શરૂ કરો",

    stopScanner:
      "સ્કેનર બંધ કરો",

    scannerPermission:
      "કેમેરાની પરવાનગી જરૂરી છે.",

    scannerNotSupported:
      "આ ડિવાઇસ પર સ્કેનર સપોર્ટેડ નથી.",

    scanResult:
      "સ્કેન પરિણામ",

    admin:
      "એડમિન",

    adminLogin:
      "એડમિન લોગિન",

    adminDashboard:
      "એડમિન ડેશબોર્ડ",

    manageProducts:
      "પ્રોડક્ટ મેનેજ કરો",

    manageOrders:
      "ઓર્ડર મેનેજ કરો",

    manageRetailers:
      "રિટેલર્સ મેનેજ કરો",

    manageEnquiries:
      "પૂછપરછ મેનેજ કરો",

    manageOffers:
      "ઓફર્સ મેનેજ કરો",

    wholesaleOrders:
      "હોલસેલ ઓર્ડર્સ",

    orders:
      "ઓર્ડર્સ",

    orderHistory:
      "ઓર્ડર ઇતિહાસ",

    yourOrders:
      "તમારા ઓર્ડર્સ",

    noOrders:
      "હજુ કોઈ ઓર્ડર નથી",

    browseProducts:
      "પ્રોડક્ટ્સ જુઓ",

    newOrder:
      "નવો ઓર્ડર",

    pending:
      "પેન્ડિંગ",

    confirmed:
      "કન્ફર્મ",

    processing:
      "પ્રોસેસિંગ",

    shipped:
      "મોકલવામાં આવ્યું",

    delivered:
      "ડિલિવર થયું",

    cancelled:
      "રદ",

    trustedWholesale:
      "વિશ્વસનીય હોલસેલ પાર્ટનર",

    trustedDescription:
      "વિશ્વસનીય હોલસેલ પ્રોડક્ટ્સ, યોગ્ય કિંમત અને રિટેલર્સ માટે પ્રોફેશનલ સપોર્ટ.",

    businessTrust:
      "બિઝનેસ ટ્રસ્ટ",

    growBusiness:
      "C24 સાથે તમારો બિઝનેસ વધારો",

    businessDescription:
      "યોગ્ય હોલસેલ કિંમતે ગુણવત્તાયુક્ત હોમ એપ્લાયન્સ મેળવો.",

    retailerSupport:
      "રિટેલર સપોર્ટ",

    loading:
      "લોડ થઈ રહ્યું છે...",

    close:
      "બંધ કરો",

    back:
      "પાછળ",

    cancel:
      "રદ કરો",

    submit:
      "સબમિટ કરો",

    save:
      "સેવ કરો",

    edit:
      "એડિટ કરો",

    delete:
      "ડિલીટ કરો",

    confirm:
      "કન્ફર્મ કરો",

    yes:
      "હા",

    no:
      "ના",

    bulkQuantity:
      "બલ્ક જથ્થો?",

    required:
      "જરૂરી",

    optional:
      "વૈકલ્પિક",

    success:
      "સફળ",

    error:
      "ભૂલ",

    refresh:
      "રિફ્રેશ",

    details:
      "વિગતો",

    description:
      "વર્ણન",

    specifications:
      "સ્પેસિફિકેશન",

    backToStore:
      "સ્ટોર પર પાછા જાઓ",
  },
};


/* =====================================================
   LANGUAGE PROVIDER
===================================================== */

export function LanguageProvider({
  children,
}) {
  const [language, setLanguageState] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "c24Language"
        );

      return translations[saved]
        ? saved
        : "EN";
    });


  /* ===================================================
     SAVE LANGUAGE
  =================================================== */

  useEffect(() => {
    localStorage.setItem(
      "c24Language",
      language
    );

    document.documentElement.lang =
      language === "HI"
        ? "hi"
        : language === "GU"
        ? "gu"
        : "en";
  }, [language]);


  /* ===================================================
     CHANGE LANGUAGE
  =================================================== */

  const setLanguage = (
    newLanguage
  ) => {
    if (!translations[newLanguage]) {
      return;
    }

    setLanguageState(
      newLanguage
    );
  };


  /* ===================================================
     TRANSLATION FUNCTION
  =================================================== */

  const t = (key) => {
    return (
      translations[
        language
      ]?.[key] ??
      translations.EN?.[key] ??
      key
    );
  };


  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}


/* =====================================================
   HOOK
===================================================== */

export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}