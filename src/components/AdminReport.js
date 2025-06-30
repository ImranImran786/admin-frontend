// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import * as XLSX from 'xlsx';

// const AdminReport = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://localhost:5005/api/reports/driver-slots');
//       setData(res.data || []);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const exportToExcel = () => {
//     const rows = data.flatMap((entry) =>
//       entry.slots.map((slot) => ({
//         Driver: entry.driver?.name,
//         'Driver Phone': entry.driver?.phone,
//         'Driver Email': entry.driver?.email,
//         Client: entry.client?.name,
//         'Client Address': entry.client?.address,
//         'Client Phone': entry.client?.phone,
//         'Start Time': dayjs(slot.startTime).format('YYYY-MM-DD HH:mm'),
//         'End Time': dayjs(slot.endTime).format('HH:mm'),
//         'Total Extensions (mins)': slot.extensions?.reduce((acc, ext) => acc + ext.extendedByMinutes, 0) || 0,
//         'Extension Details': slot.extensions?.map(ext => `${ext.extendedByMinutes}m - ${ext.reason}`).join('; ') || 'None'
//       }))
//     );

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
//     XLSX.writeFile(workbook, 'driver_slot_report.xlsx');
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold mb-4">All Driver-Client-Slot Records</h2>
//         <button
//           onClick={exportToExcel}
//           className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
//         >
//           Export to Excel
//         </button>
//       </div>
//       {loading ? <p>Loading...</p> : <DriverList data={data} />}
//     </div>
//   );
// };

// const DriverList = ({ data }) => {
//   return (
//     <div className="space-y-4">
//       {data.map((entry, idx) => (
//         <div key={idx} className="border p-4 rounded shadow bg-white mb-3">
//           <h4 className="font-bold text-blue-700 text-lg mb-2">Driver: {entry.driver?.name}</h4>
//           <p className="text-sm text-gray-600">
//             📞 {entry.driver?.phone} | 📧 {entry.driver?.email}
//           </p>

//           <p className="mt-2 text-md text-gray-800 font-semibold">Client: {entry.client?.name}</p>
//           <p className="text-sm text-gray-600">
//             📍 {entry.client?.address} | 📞 {entry.client?.phone}
//           </p>

//           <ul className="mt-4 space-y-3">
//             {entry.slots.map((slot) => {
//               const baseStart = dayjs(slot.startTime);
//               const baseEnd = dayjs(slot.endTime);
//               const totalExtension = slot.extensions?.reduce((acc, ext) => acc + ext.extendedByMinutes, 0) || 0;
//               const finalEnd = baseEnd.add(totalExtension, 'minute');

//               return (
//                 <li key={slot._id || baseStart.toISOString()} className="bg-gray-100 p-3 rounded shadow-sm">
//                   <p className="font-medium">
//                     ⏰ Start: {baseStart.format('YYYY-MM-DD HH:mm')} — Original End: {baseEnd.format('HH:mm')}
//                   </p>

//                   {slot.extensions?.length > 0 ? (
//                     <div className="ml-4 mt-2 text-sm text-gray-700">
//                       <p className="font-semibold">Extensions:</p>
//                       <ul className="list-disc list-inside">
//                         {slot.extensions.map((ext) => (
//                           <li key={ext._id}>
//                             ➕ {ext.extendedByMinutes} mins — <i>{ext.reason}</i> @ {dayjs(ext.createdAt).format('HH:mm')}
//                           </li>
//                         ))}
//                       </ul>
//                       <p className="mt-1 font-semibold">
//                         Final End Time: {finalEnd.format('HH:mm')} | Total Extra Time: {totalExtension} mins
//                       </p>
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-500 ml-4 mt-1">No extensions</p>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminReport;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

const AdminReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ driverName: '', clientName: '', date: '' });
  const [editingSlot, setEditingSlot] = useState(null);
  const [updatedSlot, setUpdatedSlot] = useState({ startTime: '', endTime: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5005/api/reports/driver-slots');
      setData(res.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSlot = async (slotId) => {
    try {
      await axios.put(`http://localhost:5005/api/slots/update/${slotId}`, updatedSlot);
      setEditingSlot(null);
      fetchData();
    } catch (err) {
      console.error('Error updating slot:', err);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this slot?")) return;
      await axios.delete(`http://localhost:5005/api/slots/delete/${slotId}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting slot:', err);
    }
  };

  const exportToExcel = () => {
    const rows = data.flatMap((entry) =>
      entry.slots.map((slot) => ({
        Driver: entry.driver?.name,
        'Driver Phone': entry.driver?.phone,
        'Driver Email': entry.driver?.email,
        Client: entry.client?.name,
        'Client Address': entry.client?.address,
        'Client Phone': entry.client?.phone,
        'Start Time': dayjs(slot.startTime).format('YYYY-MM-DD HH:mm'),
        'End Time': dayjs(slot.endTime).format('HH:mm'),
        'Total Extensions (mins)': slot.extensions?.reduce((acc, ext) => acc + ext.extendedByMinutes, 0) || 0,
        'Extension Details': slot.extensions?.map(ext => `${ext.extendedByMinutes}m - ${ext.reason}`).join('; ') || 'None'
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'driver_slot_report.xlsx');
  };

  const filteredData = data.filter((entry) => {
    const matchDriver = filters.driverName === '' || entry.driver?.name?.toLowerCase().includes(filters.driverName.toLowerCase());
    const matchClient = filters.clientName === '' || entry.client?.name?.toLowerCase().includes(filters.clientName.toLowerCase());
    const matchDate = filters.date === '' || entry.slots.some(slot => dayjs(slot.startTime).format('YYYY-MM-DD') === filters.date);
    return matchDriver && matchClient && matchDate;
  });

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">All Driver-Client-Slot Records</h2>
        <button onClick={exportToExcel} className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700">
          Download
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Driver Name"
          value={filters.driverName}
          onChange={(e) => setFilters({ ...filters, driverName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Client Name"
          value={filters.clientName}
          onChange={(e) => setFilters({ ...filters, clientName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {loading ? <p>Loading...</p> : (
        <DriverList
          data={filteredData}
          onEdit={(slotId, startTime, endTime) => {
            setEditingSlot(slotId);
            setUpdatedSlot({ startTime: dayjs(startTime).format('YYYY-MM-DDTHH:mm'), endTime: dayjs(endTime).format('YYYY-MM-DDTHH:mm') });
          }}
          onDelete={handleDeleteSlot}
        />
      )}

      {editingSlot && (
        <div className="bg-white shadow p-4 rounded mt-6">
          <h3 className="font-bold mb-2">Edit Slot</h3>
          <label className="block mb-2">
            Start Time:
            <input
              type="datetime-local"
              value={updatedSlot.startTime}
              onChange={(e) => setUpdatedSlot({ ...updatedSlot, startTime: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="datetime-local"
              value={updatedSlot.endTime}
              onChange={(e) => setUpdatedSlot({ ...updatedSlot, endTime: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </label>
          <button
            onClick={() => handleUpdateSlot(editingSlot)}
            className="bg-blue-500 text-black px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button onClick={() => setEditingSlot(null)} className="ml-2 text-red-500">Cancel</button>
        </div>
      )}
    </div>
  );
};

const DriverList = ({ data, onEdit, onDelete }) => (
  <div className="space-y-4">
    {data.map((entry, idx) => (
      <div key={idx} className="border p-4 rounded shadow bg-white mb-3">
        <h4 className="font-bold text-blue-700 text-lg mb-2">Driver: {entry.driver?.name}</h4>
        <p className="text-sm text-gray-600">📞 {entry.driver?.phone} | 📧 {entry.driver?.email}</p>

        <p className="mt-2 text-md text-gray-800 font-semibold">Client: {entry.client?.name}</p>
        <p className="text-sm text-gray-600">📍 {entry.client?.address} | 📞 {entry.client?.phone}</p>

        <ul className="mt-4 space-y-3">
          {entry.slots.map((slot) => {
            const baseStart = dayjs(slot.startTime);
            const baseEnd = dayjs(slot.endTime);
            const totalExtension = slot.extensions?.reduce((acc, ext) => acc + ext.extendedByMinutes, 0) || 0;
            const finalEnd = baseEnd.add(totalExtension, 'minute');

            return (
              <li key={slot._id} className="bg-gray-100 p-3 rounded shadow-sm">
                <p className="font-medium">
                  ⏰ Start: {baseStart.format('YYYY-MM-DD HH:mm')} — Original End: {baseEnd.format('HH:mm')}
                </p>
                {slot.extensions?.length > 0 ? (
                  <div className="ml-4 mt-2 text-sm text-gray-700">
                    <p className="font-semibold">Extensions:</p>
                    <ul className="list-disc list-inside">
                      {slot.extensions.map((ext) => (
                        <li key={ext._id}>
                          ➕ {ext.extendedByMinutes} mins — <i>{ext.reason}</i> @ {dayjs(ext.extendedAt).format('HH:mm')}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 font-semibold">
                      Final End Time: {finalEnd.format('HH:mm')} | Total Extra Time: {totalExtension} mins
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 ml-4 mt-1">No extensions</p>
                )}
                <div className="mt-2 space-x-4">
                  {/* <button
                    onClick={() => onEdit(slot._id, slot.startTime, slot.endTime)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit Slot
                  </button>
                  <button
                    onClick={() => onDelete(slot._id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Delete Slot
                  </button> */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
);

export default AdminReport;
