"use client";

import React, { useState } from "react";
import styles from "./settings.module.css";
import { supabase } from "../../lib/supabaseClient";

export default function Settings() {
    const [formData, setFormData] = useState({
        name: "Anonymous",
        contact: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError) throw authError;

            const { error } = await supabase
                .from("profiles")
                .update({
                    name: formData.name,
                    contact: formData.contact,
                })
                .eq("id", user?.id);

            if (error) throw error;

            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Account Details</h1>
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Anonymous"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="contact">Phone Number or Email</label>
                    <input
                        id="contact"
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="(XXX) XXX-XXXX"
                    />
                </div>
                <button onClick={handleSave} className={styles.saveButton}>
                    Save
                </button>
            </div>
        </div>
    );
}