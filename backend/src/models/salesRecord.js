// models/salesRecord.js
// backend/src/models/salesRecord.js

// CSV row ko ek clean JS object me map karne ka kaam
export function mapCsvRowToSalesRecord(row) {
  return {
    // Customer Fields
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: row["Age"] ? Number(row["Age"]) : null,
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],

    // Product Fields
    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: row["Tags"]
      ? row["Tags"]
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],

    // Sales Fields
    quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
    pricePerUnit: row["Price per Unit"]
      ? Number(row["Price per Unit"])
      : 0,
    discountPercentage: row["Discount Percentage"]
      ? Number(row["Discount Percentage"])
      : 0,
    totalAmount: row["Total Amount"]
      ? Number(row["Total Amount"])
      : 0,
    finalAmount: row["Final Amount"]
      ? Number(row["Final Amount"])
      : 0,

    // Operational Fields
    date: row["Date"], // assume format YYYY-MM-DD (string compare works)
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"],

    // Useful for debugging
    raw: row
  };
}
