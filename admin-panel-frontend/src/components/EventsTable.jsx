const EventsTable = () => {
  const events = [
    { time: '9:42 AM', camera: 'CAM-002', type: 'Fire', status: 'Unreviewed' },
    { time: '8:31 AM', camera: 'CAM-011', type: 'Violence', status: 'Reviewed' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="text-lg font-bold mb-2">Recent Abnormal Events</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Time</th><th>Camera ID</th><th>Event Type</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i} className="border-b">
              <td>{e.time}</td><td>{e.camera}</td><td>{e.type}</td><td>{e.status}</td>
              <td>{e.status === 'Unreviewed' ? '✅ Mark Reviewed' : '🔍 View Details'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
