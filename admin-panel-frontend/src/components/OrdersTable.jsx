const OrdersTable = () => {
  const orders = [
    { id: '#01092', customer: 'Amal K.', date: '07/28', status: 'Pending' },
    { id: '#01091', customer: 'Nirosha', date: '07/27', status: 'Shipped' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2">Product Orders</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Order ID</th><th>Customer</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-b">
              <td>{o.id}</td><td>{o.customer}</td><td>{o.date}</td><td>{o.status}</td>
              <td>🔍 View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
