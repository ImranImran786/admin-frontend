// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./TotalUsers.css";

// const TotalUsers = () => {
//   const [stats, setStats] = useState({
//     totalDrivers: 0,
//     totalClients: 0,
//     totalAdmins: 0,
//     offlineDrivers: 0,
//     availableDrivers: 0,
//     connectedDrivers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("userToken");
//         const { data } = await axios.get("http://localhost:5005/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const drivers = data.filter(user => user.role?.toLowerCase() === "driver");
//         const clients = data.filter(user => user.role?.toLowerCase() === "client");
//         const admins = data.filter(user => user.role?.toLowerCase() === "admin");

//         const offline = drivers.filter(driver => driver.status === "Offline").length;
//         const available = drivers.filter(driver => driver.status === "Available").length;
//         const connected = drivers.filter(driver => driver.status === "Connected").length;

//         setStats({
//           totalDrivers: drivers.length,
//           totalClients: clients.length,
//           totalAdmins: admins.length,
//           offlineDrivers: offline,
//           availableDrivers: available,
//           connectedDrivers: connected,
//         });
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch user stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading user stats...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <div className="dashboard-header">
//   <h1>Welcome to the Admin Dashboard</h1>
//   <p>Select an option from the sidebar to manage users and content.</p>
// </div>


//       <div className="user-summary-container">
//         {/* Main Counts */}
//         <Card title="Total Drivers" value={stats.totalDrivers} image="/images/image1.jpeg" />
//         <Card title="Total Clients" value={stats.totalClients} image="/images/image2.jpeg" />
//         <Card title="Total Admins" value={stats.totalAdmins} image="/images/image3.jpeg" />

//         {/* Driver Status */}
//         <Card title="Offline Drivers" value={stats.offlineDrivers} image="/images/image4.jpeg" />
//         <Card title="Available Drivers" value={stats.availableDrivers} image="/images/image5.jpeg" />
//         <Card title="Connected Drivers" value={stats.connectedDrivers} image="/images/image6.jpeg" />
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value, image }) => (
//   <div className="user-card">
//     <img src={image} alt={title} className="user-icon" />
//     <div className="user-info">
//       <h4>{title}</h4>
//       <p>{value}</p>
//     </div>
//   </div>
// );

// export default TotalUsers;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./TotalUsers.css";

// const TotalUsers = () => {
//   const [stats, setStats] = useState({
//     totalDrivers: 0,
//     totalClients: 0,
//     totalAdmins: 0,
//     offlineDrivers: 0,
//     availableDrivers: 0,
//     connectedDrivers: 0,
//   });
//   const [userList, setUserList] = useState([]);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("userToken");
//       const { data } = await axios.get("http://localhost:5005/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const drivers = data.filter((user) => user.role?.toLowerCase() === "driver");
//       const clients = data.filter((user) => user.role?.toLowerCase() === "client");
//       const admins = data.filter((user) => user.role?.toLowerCase() === "admin");

//       const offline = drivers.filter((driver) => driver.status === "Offline").length;
//       const available = drivers.filter((driver) => driver.status === "Available").length;
//       const connected = drivers.filter((driver) => driver.status === "Connected").length;

//       setStats({
//         totalDrivers: drivers.length,
//         totalClients: clients.length,
//         totalAdmins: admins.length,
//         offlineDrivers: offline,
//         availableDrivers: available,
//         connectedDrivers: connected,
//       });

//       setUserList(data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch user stats");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleCardClick = (type) => {
//     let filtered = [];
//     if (type === "Total Drivers") filtered = userList.filter((u) => u.role === "driver");
//     if (type === "Total Clients") filtered = userList.filter((u) => u.role === "client");
//     if (type === "Total Admins") filtered = userList.filter((u) => u.role === "admin");
//     if (type === "Offline Drivers") filtered = userList.filter((u) => u.role === "driver" && u.status === "Offline");
//     if (type === "Available Drivers") filtered = userList.filter((u) => u.role === "driver" && u.status === "Available");
//     if (type === "Connected Drivers") filtered = userList.filter((u) => u.role === "driver" && u.status === "Connected");

//     setPopupTitle(type);
//     setUserList(filtered);
//     setShowPopup(true);
//   };

//   if (loading) return <p>Loading user stats...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <div className="dashboard-header">
//         <h1>Welcome to the Admin Dashboard</h1>
//         <p>Select an option from the sidebar to manage users and content.</p>
//       </div>

//       <div className="user-summary-container">
//         <Card title="Total Drivers" value={stats.totalDrivers} image="/images/image1.jpeg" onClick={handleCardClick} />
//         <Card title="Total Clients" value={stats.totalClients} image="/images/image2.jpeg" onClick={handleCardClick} />
//         <Card title="Total Admins" value={stats.totalAdmins} image="/images/image3.jpeg" onClick={handleCardClick} />
//         <Card title="Offline Drivers" value={stats.offlineDrivers} image="/images/image4.jpeg" onClick={handleCardClick} />
//         <Card title="Available Drivers" value={stats.availableDrivers} image="/images/image5.jpeg" onClick={handleCardClick} />
//         <Card title="Connected Drivers" value={stats.connectedDrivers} image="/images/image6.jpeg" onClick={handleCardClick} />
//       </div>

//       {showPopup && (
//         <div className="popup-overlay" onClick={() => setShowPopup(false)}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <h2>{popupTitle} Details</h2>
//             <div className="user-details-list">
//               {userList.map((user) => (
//                 <div key={user._id} className="user-box">
//                   <p><strong>Name:</strong> {user.name}</p>
//                   <p><strong>Email:</strong> {user.email}</p>
//                   <p><strong>Phone:</strong> {user.phone}</p>
//                   <p><strong>Status:</strong> {user.status}</p>
//                 </div>
//               ))}
//             </div>
//             <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value, image, onClick }) => (
//   <div className="user-card" onClick={() => onClick(title)}>
//     <img src={image} alt={title} className="user-icon" />
//     <div className="user-info">
//       <h4>{title}</h4>
//       <p>{value}</p>
//     </div>
//   </div>
// );

// export default TotalUsers;























import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./TotalUsers.css";

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalDrivers: 0,
    totalClients: 0,
    totalAdmins: 0,
    offlineDrivers: 0,
    availableDrivers: 0,
    connectedDrivers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState("name");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get("http://localhost:5005/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const drivers = data.filter(user => user.role?.toLowerCase() === "driver");
        const clients = data.filter(user => user.role?.toLowerCase() === "client");
        const admins = data.filter(user => user.role?.toLowerCase() === "admin");

        const offline = drivers.filter(driver => driver.status === "Offline").length;
        const available = drivers.filter(driver => driver.status === "Available").length;
        const connected = drivers.filter(driver => driver.status === "Connected").length;

        setUsers(data);
        setStats({
          totalDrivers: drivers.length,
          totalClients: clients.length,
          totalAdmins: admins.length,
          offlineDrivers: offline,
          availableDrivers: available,
          connectedDrivers: connected,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user stats");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    if (category.includes("Driver")) {
      const statusMap = {
        "Offline Drivers": "Offline",
        "Available Drivers": "Available",
        "Connected Drivers": "Connected",
      };
      if (statusMap[category]) {
        setFilteredUsers(users.filter(user => user.role === "driver" && user.status === statusMap[category]));
      } else {
        setFilteredUsers(users.filter(user => user.role === "driver"));
      }
    } else if (category === "Total Clients") {
      setFilteredUsers(users.filter(user => user.role === "client"));
    } else if (category === "Total Admins") {
      setFilteredUsers(users.filter(user => user.role === "admin"));
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "user-report.xlsx");
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    if (value) {
      const filtered = users.filter(user => user[filterType] === value);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  if (loading) return <p>Loading user stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Select a category to view user details.</p>
      </div>

      <div className="user-summary-container">
        <Card title="Total Drivers" value={stats.totalDrivers} image="/images/image1.jpeg" onClick={() => handleCardClick("Total Drivers")} />
        <Card title="Total Clients" value={stats.totalClients} image="/images/image2.jpeg" onClick={() => handleCardClick("Total Clients")} />
        <Card title="Total Admins" value={stats.totalAdmins} image="/images/image3.jpeg" onClick={() => handleCardClick("Total Admins")} />
        <Card title="Offline Drivers" value={stats.offlineDrivers} image="/images/image4.jpeg" onClick={() => handleCardClick("Offline Drivers")} />
        <Card title="Available Drivers" value={stats.availableDrivers} image="/images/image5.jpeg" onClick={() => handleCardClick("Available Drivers")} />
        <Card title="Connected Drivers" value={stats.connectedDrivers} image="/images/image6.jpeg" onClick={() => handleCardClick("Connected Drivers")} />
      </div>

      <div className="filter-controls">
        <div>
          <label>
            <input type="radio" name="filterType" value="name" checked={filterType === "name"} onChange={() => setFilterType("name")} />
            Name
          </label>
          <label>
            <input type="radio" name="filterType" value="email" checked={filterType === "email"} onChange={() => setFilterType("email")} />
            Email
          </label>
        </div>
        <select onChange={handleFilter} value={selectedFilter}>
          <option value="">Select {filterType}</option>
          {[...new Set(users.map(user => user[filterType]))].map((val, i) => (
            <option key={i} value={val}>{val}</option>
          ))}
        </select>
      </div>

      <div className="export-controls">
        <button onClick={handleExportExcel}>Download</button>
      </div>

      {selectedCategory && filteredUsers.length > 0 && (
        <div className="filtered-user-list">
          <h2>{selectedCategory} Details</h2>

          {/* {selectedCategory !== "Total Clients" && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )} */}

          {selectedCategory !== "Total Clients" && filteredUsers.map((user, idx) => (
  <div key={idx} className="client-details">
    <h3>{user.role === "driver" ? "Driver Detail" : "Admin Detail"}</h3>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    {user.status && <p><strong>Status:</strong> {user.status}</p>}
    <p><strong>Phone:</strong> {user.phone}</p>
    <p><strong>CNIC:</strong> {user.cnic}</p>
    <p><strong>License Number:</strong> {user.licenseNumber}</p>
    <p><strong>Role:</strong> {user.role}</p>
    <p><strong>Address:</strong> {user.address}</p>
  </div>
))}


          {selectedCategory === "Total Clients" && filteredUsers.map((user, idx) => (
            <div key={idx} className="client-details">
              <h3>Client Detail</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Father Name:</strong> {user.fatherName}</p>
              <p><strong>CNIC:</strong> {user.cnic}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Other Phone:</strong> {user.otherPhone}</p>
              <p><strong>Home Address:</strong> {user.address}</p>
              <p><strong>License Number:</strong> {user.licenseNumber}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value, image, onClick }) => (
  <div className="user-card" onClick={onClick}>
    <img src={image} alt={title} className="user-icon" />
    <div className="user-info">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  </div>
);

export default TotalUsers;
