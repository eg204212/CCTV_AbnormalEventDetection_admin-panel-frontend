const DashboardCards = () => {
  const cards = [
    { label: 'Total Users', icon: '👤', count: 120 },
    { label: 'Cameras Online', icon: '📷', count: 28 },
    { label: 'Events Detected', icon: '⚠️', count: 15 },
    { label: 'Orders This Month', icon: '🛒', count: 8 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow text-center">
          <div className="text-2xl">{card.icon}</div>
          <div className="font-semibold">{card.label}</div>
          <div className="text-xl">{card.count}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
