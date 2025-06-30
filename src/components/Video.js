import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Video = ({ adminEmail }) => {
  const videoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  // const [adminId] = useState("admin123");
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    socket.current = io("https://database-production-3a68.up.railway.app/");

    socket.current.emit("register_admin", adminEmail);
    console.log(`📌 Admin registered: ${adminEmail}`);

    socket.current.on("receive_offer", async ({ signal, driverSocket }) => {
      console.log(`📡 Received WebRTC offer from Driver: ${driverSocket}`);

      peerConnection.current = new RTCPeerConnection();

      peerConnection.current.ontrack = (event) => {
        console.log("🎥 Receiving video stream...");
        videoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("📡 Sending ICE candidate to Driver...");
          socket.current.emit("send_ice_candidate", { candidate: event.candidate, driverSocket });
        }
      };

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
      
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      console.log("📡 Sending WebRTC answer to Driver...");
      socket.current.emit("send_answer", { signal: answer, driverSocket });
    });

    socket.current.on("receive_ice_candidate", ({ candidate }) => {
      console.log("📡 Received ICE candidate from Driver.");
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("❌ Admin disconnected.");
      }
    };
  }, [adminEmail]);

  const requestVideo = () => {
    if (!driverId) {
      alert("Enter Driver ID");
      return;
    }
    console.log(`📡 Requesting video from Driver ${adminEmail}`);
    socket.current.emit("request_video", { clientEmail: adminEmail, driverId });
    
  };

  return (
    <div>
      <h2>Admin Video Viewer</h2>
      <p>Logged in as: {adminEmail}</p>
      <input
        type="text"
        placeholder="Enter Driver ID"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
      />
      <button onClick={requestVideo}>Request Video</button>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", border: "1px solid black" }} />
    </div>
  );
};

export default Video;




// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// // import "./VideoVerification.css"; // Import the CSS file

// const Video = ({ userEmail }) => {
//   const videoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const socket = useRef(null);
//   const [driverId, setDriverId] = useState("");

//   useEffect(() => {
//     socket.current = io("https://database-production-3a68.up.railway.app/", { transports: ["websocket", "polling"] });
//     socket.current.emit("register_client", userEmail);
//     console.log(`📌 Client registered: ${userEmail}`);

//     socket.current.on("receive_offer", async ({ signal, driverSocket }) => {
//       console.log(`📡 Received WebRTC offer from Driver: ${driverSocket}`);

//       peerConnection.current = new RTCPeerConnection();
//       peerConnection.current.ontrack = (event) => {
//         console.log("🎥 Receiving video stream...");
//         videoRef.current.srcObject = event.streams[0];
//       };

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           console.log("📡 Sending ICE candidate to Driver...");
//           socket.current.emit("send_ice_candidate", { candidate: event.candidate, driverSocket });
//         }
//       };

//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);

//       console.log("📡 Sending WebRTC answer to Driver...");
//       socket.current.emit("send_answer", { signal: answer, driverSocket });
//     });

//     socket.current.on("receive_ice_candidate", ({ candidate }) => {
//       console.log("📡 Received ICE candidate from Driver.");
//       if (peerConnection.current) {
//         peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//     });

//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//         console.log("❌ Client disconnected.");
//       }
//       if (peerConnection.current) {
//         peerConnection.current.close();
//       }
//     };
//   }, [userEmail]);

//   const requestVideo = () => {
//     if (!driverId) {
//       alert("Enter Driver ID");
//       return;
//     }
//     console.log(`📡 Requesting video from Driver ${driverId} with email ${userEmail}`);
//     socket.current.emit("request_video", { clientEmail: userEmail, driverId });
//   };

//   return (
//     <div className="video-container">
//       <h2>Client Video Viewer</h2>
//       <p>Logged in as: {userEmail}</p>
//       <input
//         type="text"
//         placeholder="Enter Driver ID"
//         value={driverId}
//         onChange={(e) => setDriverId(e.target.value)}
//       />
//       <button onClick={requestVideo}>Request Video</button>
//       <div className="video-box">
//         <video ref={videoRef} autoPlay playsInline />
//       </div>
//       <ul>
//         <li>Ensure stable internet connection</li>
//         <li>Enable camera permissions</li>
//       </ul>
//     </div>
//   );
// };

// export default Video;
