import jsPDF from "jspdf";

export default function InvoicePDF({
  enquiry,
  retailer,
  product,
}) {

  const generateInvoice = () => {

    if (!enquiry) {
      alert("Enquiry details nahi mili.");
      return;
    }

    const doc = new jsPDF();

    /* =====================================
       DATA
    ===================================== */

    const invoiceNumber =
      `C24-${Date.now()}`;

    const invoiceDate =
      new Date().toLocaleDateString(
        "en-IN"
      );

    const quantity =
      Number(enquiry.quantity || 1);

    const mrp =
      Number(
        product?.mrp ||
        product?.price ||
        0
      );

    const wholesalePrice =
      Number(
        product?.wholesalePrice ||
        product?.price ||
        0
      );

    const subtotal =
      wholesalePrice * quantity;

    /*
      GST rate demo ke liye 18%.
      Product-wise GST baad mein admin
      panel se configurable bana sakte hain.
    */

    const gstRate = 18;

    const gstAmount =
      subtotal * gstRate / 100;

    const grandTotal =
      subtotal + gstAmount;


    /* =====================================
       HEADER
    ===================================== */

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(24);

    doc.text(
      "C24",
      20,
      22
    );


    doc.setFontSize(10);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "HOME APPLICATION WHOLESALE",
      20,
      29
    );


    doc.setFontSize(20);

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "TAX INVOICE",
      145,
      22
    );


    /* =====================================
       INVOICE DETAILS
    ===================================== */

    doc.setFontSize(10);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Invoice No: ${invoiceNumber}`,
      145,
      31
    );

    doc.text(
      `Date: ${invoiceDate}`,
      145,
      38
    );


    doc.line(
      20,
      45,
      190,
      45
    );


    /* =====================================
       SELLER
    ===================================== */

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "SELLER",
      20,
      55
    );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "C24 Home Application Wholesale",
      20,
      62
    );

    doc.text(
      "Wholesale Home Appliances & Electronics",
      20,
      69
    );

    doc.text(
      "GSTIN: ____________________",
      20,
      76
    );


    /* =====================================
       BUYER
    ===================================== */

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "BILL TO",
      110,
      55
    );


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `Name: ${
        retailer?.name ||
        enquiry?.name ||
        "-"
      }`,
      110,
      62
    );


    doc.text(
      `Business: ${
        retailer?.businessName ||
        enquiry?.business ||
        "-"
      }`,
      110,
      69
    );


    doc.text(
      `Phone: ${
        retailer?.phone ||
        enquiry?.phone ||
        "-"
      }`,
      110,
      76
    );


    doc.text(
      `GSTIN: ${
        retailer?.gstNumber ||
        "-"
      }`,
      110,
      83
    );


    /* =====================================
       TABLE HEADER
    ===================================== */

    const startY = 98;

    doc.setFillColor(
      10,
      15,
      20
    );

    doc.rect(
      20,
      startY,
      170,
      10,
      "F"
    );


    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(9);

    doc.text(
      "Product",
      24,
      startY + 6
    );

    doc.text(
      "Qty",
      105,
      startY + 6
    );

    doc.text(
      "Rate",
      125,
      startY + 6
    );

    doc.text(
      "GST",
      150,
      startY + 6
    );

    doc.text(
      "Total",
      172,
      startY + 6
    );


    /* =====================================
       TABLE ROW
    ===================================== */

    doc.setTextColor(
      0,
      0,
      0
    );

    doc.setFont(
      "helvetica",
      "normal"
    );


    const productName =
      product?.name ||
      enquiry?.product ||
      "Wholesale Product";


    doc.text(
      productName.substring(
        0,
        42
      ),
      24,
      startY + 20
    );


    doc.text(
      String(quantity),
      105,
      startY + 20
    );


    doc.text(
      `Rs. ${wholesalePrice.toLocaleString(
        "en-IN"
      )}`,
      122,
      startY + 20
    );


    doc.text(
      `${gstRate}%`,
      150,
      startY + 20
    );


    doc.text(
      `Rs. ${grandTotal.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`,
      170,
      startY + 20
    );


    doc.line(
      20,
      startY + 27,
      190,
      startY + 27
    );


    /* =====================================
       TOTALS
    ===================================== */

    const totalY =
      startY + 45;


    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "Subtotal:",
      130,
      totalY
    );


    doc.text(
      `Rs. ${subtotal.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`,
      170,
      totalY
    );


    doc.text(
      `GST (${gstRate}%):`,
      130,
      totalY + 8
    );


    doc.text(
      `Rs. ${gstAmount.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`,
      170,
      totalY + 8
    );


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.text(
      "Grand Total:",
      130,
      totalY + 20
    );


    doc.text(
      `Rs. ${grandTotal.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`,
      170,
      totalY + 20
    );


    /* =====================================
       ENQUIRY MESSAGE
    ===================================== */

    if (enquiry.message) {

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Customer Note",
        20,
        totalY + 45
      );


      doc.setFont(
        "helvetica",
        "normal"
      );

      const lines =
        doc.splitTextToSize(
          enquiry.message,
          165
        );

      doc.text(
        lines,
        20,
        totalY + 53
      );

    }


    /* =====================================
       FOOTER
    ===================================== */

    doc.setFontSize(9);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "Thank you for doing business with C24.",
      20,
      270
    );

    doc.text(
      "This is a computer-generated invoice.",
      20,
      277
    );


    /* =====================================
       DOWNLOAD
    ===================================== */

    doc.save(
      `${invoiceNumber}.pdf`
    );

  };


  return (

    <button
      type="button"
      className="invoice-download-button"
      onClick={generateInvoice}
    >
      📄 Download GST Invoice
    </button>

  );
}