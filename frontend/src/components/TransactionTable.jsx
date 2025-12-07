// src/components/TransactionTable.jsx
export default function TransactionTable({ items }) {
  if (!items.length) {
    return <div className="no-results">No results found.</div>;
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Product</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.transactionId}>
            <td>{r.transactionId}</td>
            <td>{r.date}</td>
            <td>{r.customerName}</td>
            <td>{r.phoneNumber}</td>
            <td>{r.customerRegion}</td>
            <td>{r.productName}</td>
            <td>{r.productCategory}</td>
            <td>{r.quantity}</td>
            <td>{r.finalAmount}</td>
            <td>{r.paymentMethod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
