import React, { useEffect, useState } from "react";

function TestConnection() {
    const [backendMessage, setBackendMessage] = useState("Checking backend...");
    const [mongoStatus, setMongoStatus] = useState("Checking MongoDB...");
    const [saveStatus, setSaveStatus] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/test")
            .then((res) => res.json())
            .then((data) => {
                setBackendMessage(data.message);
                setMongoStatus(data.mongo);
            })
            .catch(() => {
                setBackendMessage("❌ Could not connect to backend");
                setMongoStatus("❌ MongoDB status unknown");
            });
    }, []);

    const handleSaveTest = () => {
        fetch("http://localhost:5000/api/v1/save-test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Hello from frontend!",
                show:"hello from gintama"
               
            })

        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSaveStatus(`✅ ${data.message}`);
                } else {
                    setSaveStatus(`❌ ${data.message}`);
                }
            })
            .catch(() => {
                setSaveStatus("❌ Could not send data to backend");
            });
    };

    return (
        <div style={{ padding: "20px", fontSize: "18px" }}>
            <p>{backendMessage}</p>
            <p>{mongoStatus}</p>

            <button
                onClick={handleSaveTest}
                style={{ padding: "10px", marginTop: "10px", cursor: "pointer", backgroundColor: "#4caf50", color: "white", border: "none" }}
            >
                Send Test Data to Backend & MongoDB
            </button>

            {saveStatus && <p style={{ marginTop: "10px" }}>{saveStatus}</p>}
        </div>
    );
}

export default TestConnection;
