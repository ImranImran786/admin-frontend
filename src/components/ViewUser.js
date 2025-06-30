// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './ClientDetails.css';


// const ViewUser = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [clientData, setClientData] = useState(null);

//   const [selectedClientId, setSelectedClientId] = useState("");
//   const [selectedDriverId, setSelectedDriverId] = useState("");
//   const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         setError("Authorization token missing");
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data } = await axios.get("https://mongo-db-backend-production.up.railway.app/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const fetchClientData = async (clientId) => {
//     try {
//       const { data } = await axios.get(
//         `https://mongo-db-backend-production.up.railway.app/api/users/${clientId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       setClientData(data);
//     } catch {
//       setError("Failed to fetch client data");
//     }
//   };

// const handleAssign = async () => {
//   setError("");
//   setSuccessMessage("");

//   if (!selectedClientId || !selectedDriverId) {
//     setError("Please select both client and driver.");
//     return;
//   }

//   if (slots.some((s) => !s.startTime || !s.endTime)) {
//     setError("All time slots must be filled.");
//     return;
//   }

//   // Check if any slot has startTime >= endTime (invalid slot)
//   if (slots.some((slot) => new Date(slot.startTime) >= new Date(slot.endTime))) {
//     setError("Start time and end time cannot be same.");
//     return;
//   }

//   const now = new Date();

//   // 2. Check for duplicate or overlapping slots
//   const hasDuplicates = slots.some((slot, index) => 
//     slots.some((other, otherIndex) => {
//       if (index === otherIndex) return false;

//       const slotStart = new Date(slot.startTime);
//       const slotEnd = new Date(slot.endTime);
//       const otherStart = new Date(other.startTime);
//       const otherEnd = new Date(other.endTime);

//       // Check exact same slot
//       if (slotStart.getTime() === otherStart.getTime() && slotEnd.getTime() === otherEnd.getTime()) {
//         return true;
//       }

//       // Check overlapping slots (startA < endB && endA > startB)
//       if (slotStart < otherEnd && slotEnd > otherStart) {
//         return true;
//       }

//       return false;
//     })
//   );

//   if (hasDuplicates) {
//     setError("Duplicate or overlapping time slots found. Please revise.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("userToken");
//     await axios.post(
//       "https://mongo-db-backend-production.up.railway.app/api/assignments/assign-driver",
//       {
//         clientId: selectedClientId,
//         driverId: selectedDriverId,
//         slots,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setSelectedClientId("");
//     setSelectedDriverId("");
//     setSuccessMessage("Driver assigned successfully!");
//     setSlots([{ startTime: "", endTime: "" }]);
//   } catch (err) {
//     setError(err.response?.data?.message || "Assignment failed.");
//   }
// };



//   const addSlot = () => {
//     setSlots([...slots, { startTime: "", endTime: "" }]);
//   };

//   const updateSlot = (index, field, value) => {
//     const updated = [...slots];
//     updated[index][field] = value;
//     setSlots(updated);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>All Users</h2>

//       {loading && <p>Loading users...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

//       <table className="user-table">
//   <thead>
//     <tr>
//       <th>ID</th>
//       <th>Name</th>
//       <th>Email</th>
//       <th>Role</th>
//       <th>Status</th>
//       <th>Connected Client</th>
//     </tr>
//   </thead>
//   <tbody>
//     {users.map((user) => {
//       const isDriver = user.role?.toLowerCase() === "driver";
//       return (
//         <tr key={user._id}>
//           <td>{user._id}</td>
//           <td>{user.name}</td>
//           <td>{user.email}</td>
//           <td>{user.role}</td>
//           <td>{isDriver ? user.status || "Offline" : "N/A"}</td>
//           <td>
//              {isDriver && user.status?.toLowerCase() === "connected" && user.connectedClientId ? (
//     <button className="view-client-btn" onClick={() => fetchClientData(user.connectedClientId)}>
//       View Client
//     </button>
//   ) : (
//     "N/A"
//   )}
//           </td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>


//       {clientData && (
//         <div className="client-details-card">
//   <h3 className="client-title">Client Details</h3>
//   <div className="client-detail-row">
//     <span className="label">Name:</span>
//     <span className="value">{clientData.name}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Father Name:</span>
//     <span className="value">{clientData.fatherName}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">CNIC:</span>
//     <span className="value">{clientData.cnic}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Phone:</span>
//     <span className="value">{clientData.phone}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Email:</span>
//     <span className="value">{clientData.email}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Other Phone:</span>
//     <span className="value">{clientData.otherPhone}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Home Address:</span>
//     <span className="value">{clientData.homeAddress}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">License Number:</span>
//     <span className="value">{clientData.licenseNumber}</span>
//   </div>
//   <div className="client-detail-row">
//     <span className="label">Role:</span>
//     <span className="value">{clientData.role}</span>
//   </div>
// </div>

//       )}

//       <div className="assign-driver-card">
//   <h3 className="assign-title">Assign Driver to Client</h3>

//   <div className="form-group">
//     <label className="form-label">Select Client:</label>
//     <select
//       className="form-select"
//       value={selectedClientId}
//       onChange={(e) => setSelectedClientId(e.target.value)}
//     >
//       <option value="">-- Select Client --</option>
//       {users
//         .filter((user) => user.role === "client")
//         .map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.name} ({user.email})
//           </option>
//         ))}
//     </select>
//   </div>

//   <div className="form-group">
//     <label className="form-label">Select Driver:</label>
//     <select
//       className="form-select"
//       value={selectedDriverId}
//       onChange={(e) => setSelectedDriverId(e.target.value)}
//     >
//       <option value="">-- Select Driver --</option>
//       {users
//         .filter((user) => user.role === "driver")
//         .map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.name} ({user.email})
//           </option>
//         ))}
//     </select>
//   </div>

//   <h4 className="slot-heading">Time Slots</h4>
//   {slots.map((slot, index) => (
//     <div className="slot-group" key={index}>
//       <label className="form-label">
//         Start:
//         <input
//           className="form-input"
//           type="datetime-local"
//           value={slot.startTime}
//           onChange={(e) => updateSlot(index, "startTime", e.target.value)}
//         />
//       </label>

//       <label className="form-label">
//         End:
//         <input
//           className="form-input"
//           type="datetime-local"
//           value={slot.endTime}
//           onChange={(e) => updateSlot(index, "endTime", e.target.value)}
//         />
//       </label>
//     </div>
//   ))}

//   <button className="action-button" onClick={addSlot}>Add New Slot</button>
//   <button className="assign-button" onClick={handleAssign}>Assign Driver</button>
// </div>

//     </div>
//   );
// };

// export default ViewUser;





// code after remove endtime related code 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './ClientDetails.css';

// const ViewUser = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [clientData, setClientData] = useState(null);

//   const [selectedClientId, setSelectedClientId] = useState("");
//   const [selectedDriverId, setSelectedDriverId] = useState("");
//   const [slots, setSlots] = useState([{ startTime: "" }]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         setError("Authorization token missing");
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data } = await axios.get("https://mongo-db-backend-production.up.railway.app/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const fetchClientData = async (clientId) => {
//     try {
//       const { data } = await axios.get(
//         `https://mongo-db-backend-production.up.railway.app/api/users/${clientId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       setClientData(data);
//     } catch {
//       setError("Failed to fetch client data");
//     }
//   };

//   const handleAssign = async () => {
//     setError("");
//     setSuccessMessage("");

//     if (!selectedClientId || !selectedDriverId) {
//       setError("Please select both client and driver.");
//       return;
//     }

//     if (slots.some((s) => !s.startTime)) {
//       setError("All time slots must be filled.");
//       return;
//     }

//     const hasDuplicates = slots.some((slot, index) => 
//       slots.some((other, otherIndex) => {
//         if (index === otherIndex) return false;

//         const slotStart = new Date(slot.startTime).getTime();
//         const otherStart = new Date(other.startTime).getTime();

//         // Duplicate start times
//         return slotStart === otherStart;
//       })
//     );

//     if (hasDuplicates) {
//       setError("Duplicate time slots found. Please revise.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("userToken");
//       await axios.post(
//         "https://mongo-db-backend-production.up.railway.app/api/assignments/assign-driver",
//         {
//           clientId: selectedClientId,
//           driverId: selectedDriverId,
//           slots,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSelectedClientId("");
//       setSelectedDriverId("");
//       setSuccessMessage("Driver assigned successfully!");
//       setSlots([{ startTime: "" }]);
//     } catch (err) {
//       setError(err.response?.data?.message || "Assignment failed.");
//     }
//   };

//   const addSlot = () => {
//     setSlots([...slots, { startTime: "" }]);
//   };

//   const updateSlot = (index, field, value) => {
//     const updated = [...slots];
//     updated[index][field] = value;
//     setSlots(updated);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>All Users</h2>

//       {loading && <p>Loading users...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Connected Client</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => {
//             const isDriver = user.role?.toLowerCase() === "driver";
//             return (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>{isDriver ? user.status || "Offline" : "N/A"}</td>
//                 <td>
//                   {isDriver &&
//                   user.status?.toLowerCase() === "connected" &&
//                   user.connectedClientId ? (
//                     <button
//                       className="view-client-btn"
//                       onClick={() =>
//                         fetchClientData(user.connectedClientId)
//                       }
//                     >
//                       View Client
//                     </button>
//                   ) : (
//                     "N/A"
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {clientData && (
//         <div className="client-details-card">
//           <h3 className="client-title">Client Details</h3>
//           <div className="client-detail-row">
//             <span className="label">Name:</span>
//             <span className="value">{clientData.name}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Father Name:</span>
//             <span className="value">{clientData.fatherName}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">CNIC:</span>
//             <span className="value">{clientData.cnic}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Phone:</span>
//             <span className="value">{clientData.phone}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Email:</span>
//             <span className="value">{clientData.email}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Other Phone:</span>
//             <span className="value">{clientData.otherPhone}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Home Address:</span>
//             <span className="value">{clientData.homeAddress}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">License Number:</span>
//             <span className="value">{clientData.licenseNumber}</span>
//           </div>
//           <div className="client-detail-row">
//             <span className="label">Role:</span>
//             <span className="value">{clientData.role}</span>
//           </div>
//         </div>
//       )}

//       <div className="assign-driver-card">
//         <h3 className="assign-title">Assign Driver to Client</h3>

//         <div className="form-group">
//           <label className="form-label">Select Client:</label>
//           <select
//             className="form-select"
//             value={selectedClientId}
//             onChange={(e) => setSelectedClientId(e.target.value)}
//           >
//             <option value="">-- Select Client --</option>
//             {users
//               .filter((user) => user.role === "client")
//               .map((user) => (
//                 <option key={user._id} value={user._id}>
//                   {user.name} ({user.email})
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Select Driver:</label>
//           <select
//             className="form-select"
//             value={selectedDriverId}
//             onChange={(e) => setSelectedDriverId(e.target.value)}
//           >
//             <option value="">-- Select Driver --</option>
//             {users
//               .filter((user) => user.role === "driver")
//               .map((user) => (
//                 <option key={user._id} value={user._id}>
//                   {user.name} ({user.email})
//                 </option>
//               ))}
//           </select>
//         </div>

//         <h4 className="slot-heading">Time Slots</h4>
//         {slots.map((slot, index) => (
//           <div className="slot-group" key={index}>
//             <label className="form-label">
//               Start:
//               <input
//                 className="form-input"
//                 type="datetime-local"
//                 value={slot.startTime}
//                 onChange={(e) =>
//                   updateSlot(index, "startTime", e.target.value)
//                 }
//               />
//             </label>
//           </div>
//         ))}

//         <button className="action-button" onClick={addSlot}>
//           Add New Slot
//         </button>
//         <button className="assign-button" onClick={handleAssign}>
//           Assign Driver
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewUser;



















import React, { useEffect, useState } from "react";
import axios from "axios";
import './ClientDetails.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clientData, setClientData] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [slots, setSlots] = useState([{ startTime: "" }]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Authorization token missing");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("https://e5f4-103-198-154-141.ngrok-free.app//api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const currentTime = now.toISOString().slice(0, 16);

      const token = localStorage.getItem("userToken");
      if (!token || users.length === 0) return;

      for (const user of users) {
        if (user.role === "driver" && user.status !== "Connected") {
          try {
            const res = await axios.get(
              `https://e5f4-103-198-154-141.ngrok-free.app//api/assignments/driver-assignments/${user._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            const data = res.data || [];

            const shouldBeConnected = data.some((assignment) =>
              assignment.slots.some((slot) => {
                const slotStart = new Date(slot.startTime).toISOString().slice(0, 16);
                return slotStart === currentTime && !slot.endTime;
              })
            );

            if (shouldBeConnected) {
              await axios.put(
                `https://e5f4-103-198-154-141.ngrok-free.app//api/users/update-status/${user._id}`,
                { status: "Connected" },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
            }
          } catch (err) {
            console.error(`Error updating status for driver ${user._id}:`, err.message);
          }
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [users]);

  const fetchClientData = async (clientId) => {
    try {
      const { data } = await axios.get(
        `https://e5f4-103-198-154-141.ngrok-free.app//api/users/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setClientData(data);
    } catch {
      setError("Failed to fetch client data");
    }
  };

  const handleAssign = async () => {
    setError("");
    setSuccessMessage("");

    if (!selectedClientId || !selectedDriverId) {
      setError("Please select both client and driver.");
      return;
    }

    if (slots.some((s) => !s.startTime)) {
      setError("All time slots must be filled.");
      return;
    }

    const hasDuplicates = slots.some((slot, index) =>
      slots.some((other, otherIndex) => {
        if (index === otherIndex) return false;
        return new Date(slot.startTime).getTime() === new Date(other.startTime).getTime();
      })
    );

    if (hasDuplicates) {
      setError("Duplicate time slots found. Please revise.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        "https://e5f4-103-198-154-141.ngrok-free.app//api/assignments/assign-driver",
        {
          clientId: selectedClientId,
          driverId: selectedDriverId,
          slots,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSelectedClientId("");
      setSelectedDriverId("");
      setSuccessMessage("Driver assigned successfully!");
      setSlots([{ startTime: "" }]);
    } catch (err) {
      setError(err.response?.data?.message || "Assignment failed.");
    }
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: "" }]);
  };

  const updateSlot = (index, field, value) => {
    const updated = [...slots];
    updated[index][field] = value;
    setSlots(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Connected Client</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isDriver = user.role?.toLowerCase() === "driver";
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{isDriver ? user.status || "Offline" : "N/A"}</td>
                <td>
                  {isDriver && user.status?.toLowerCase() === "connected" && user.connectedClientId ? (
                    <button
                      className="view-client-btn"
                      onClick={() => fetchClientData(user.connectedClientId)}
                    >
                      View Client
                    </button>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {clientData && (
        <div className="client-details-card">
          <h3 className="client-title">Client Details</h3>
          <div className="client-detail-row"><span className="label">Name:</span><span className="value">{clientData.name}</span></div>
          <div className="client-detail-row"><span className="label">Father Name:</span><span className="value">{clientData.fatherName}</span></div>
          <div className="client-detail-row"><span className="label">CNIC:</span><span className="value">{clientData.cnic}</span></div>
          <div className="client-detail-row"><span className="label">Phone:</span><span className="value">{clientData.phone}</span></div>
          <div className="client-detail-row"><span className="label">Email:</span><span className="value">{clientData.email}</span></div>
          <div className="client-detail-row"><span className="label">Other Phone:</span><span className="value">{clientData.otherPhone}</span></div>
          <div className="client-detail-row"><span className="label">Home Address:</span><span className="value">{clientData.homeAddress}</span></div>
          <div className="client-detail-row"><span className="label">License Number:</span><span className="value">{clientData.licenseNumber}</span></div>
          <div className="client-detail-row"><span className="label">Role:</span><span className="value">{clientData.role}</span></div>
        </div>
      )}

      <div className="assign-driver-card">
        <h3 className="assign-title">Assign Driver to Client</h3>

        <div className="form-group">
          <label className="form-label">Select Client:</label>
          <select
            className="form-select"
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            <option value="">-- Select Client --</option>
            {users.filter((user) => user.role === "client").map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Select Driver:</label>
          <select
            className="form-select"
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
          >
            <option value="">-- Select Driver --</option>
            {users.filter((user) => user.role === "driver").map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <h4 className="slot-heading">Time Slots</h4>
        {slots.map((slot, index) => (
          <div className="slot-group" key={index}>
            <label className="form-label">
              Start:
              <input
                className="form-input"
                type="datetime-local"
                value={slot.startTime}
                onChange={(e) => updateSlot(index, "startTime", e.target.value)}
              />
            </label>
          </div>
        ))}

        <button className="action-button" onClick={addSlot}>Add New Slot</button>
        <button className="assign-button" onClick={handleAssign}>Assign Driver</button>
      </div>
    </div>
  );
};

export default ViewUser;
