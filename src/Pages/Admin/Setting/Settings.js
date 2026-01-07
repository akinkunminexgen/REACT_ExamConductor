import React, { useState } from "react";

export default function Settings() {
    const [form, setForm] = useState({
        timezone: "UTC",
        autosave: true,
        passMark: 50,
        notifications: true,
    });

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Settings</h1>

            {/* GLOBAL SETTINGS */}
            <section style={sectionStyle}>
                <h2 style={titleStyle}>Global Settings</h2>

                <label style={labelStyle}>Time Zone</label>
                <input
                    type="text"
                    style={inputStyle}
                    value={form.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                />

                <div style={rowStyle}>
                    <span>Enable Auto Save</span>
                    <input
                        type="checkbox"
                        checked={form.autosave}
                        onChange={(e) => update("autosave", e.target.checked)}
                    />
                </div>
            </section>

            {/* EXAM SETTINGS */}
            <section style={sectionStyle}>
                <h2 style={titleStyle}>Exam Defaults</h2>

                <label style={labelStyle}>Pass Mark (%)</label>
                <input
                    type="number"
                    style={inputStyle}
                    value={form.passMark}
                    onChange={(e) => update("passMark", e.target.value)}
                />
            </section>

            {/* NOTIFICATIONS SETTINGS */}
            <section style={sectionStyle}>
                <h2 style={titleStyle}>Notifications</h2>

                <div style={rowStyle}>
                    <span>Enable Notifications</span>
                    <input
                        type="checkbox"
                        checked={form.notifications}
                        onChange={(e) => update("notifications", e.target.checked)}
                    />
                </div>
            </section>

            <button style={buttonStyle}>Save All Settings</button>
        </div>
    );
}

// Inline styles
const sectionStyle = {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    background: "#fafafa",
};

const titleStyle = {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
};

const labelStyle = {
    display: "block",
    marginBottom: "6px",
    marginTop: "12px",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
};

const buttonStyle = {
    padding: "12px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
};
