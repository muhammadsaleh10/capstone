"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import styles from "./registration.module.css";

export default function Registration() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        gender: "",
        dob: "",
        height: "",
        workplace: "",
        job_title: "",
        school: "",
        education_level: "",
        nationality: "",
        location: "",
        religion: "",
        marital_status: "",
        languages: "",
        interests: "",
    });
    const [photo, setPhoto] = useState<File | null>(null); // File state
    const [photoUrl, setPhotoUrl] = useState<string | null>(null); // Public URL
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
    
            try {
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) throw userError;
    
                const userId = userData?.user?.id;
                if (!userId) throw new Error("User ID is missing.");
    
                const filePath = `${userId}/photos/${Date.now()}_${file.name}`;
    
                console.log("Uploading photo to:", filePath);
    
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("user-photos")
                    .upload(filePath, file);
    
                if (uploadError) {
                    console.error("Upload error details:", uploadError);
                    throw uploadError;
                }
    
                console.log("Upload data:", uploadData);
    
                const { data: publicUrlData, error: urlError } = supabase.storage
                    .from("user-photos")
                    .getPublicUrl(uploadData.path);
    
                if (urlError) {
                    console.error("Public URL error:", urlError);
                    throw urlError;
                }
    
                console.log("Photo uploaded successfully:", publicUrlData.publicUrl);
                setPhotoUrl(publicUrlData.publicUrl);
            } catch (error) {
                console.error("Error uploading photo:", error);
                setMessage("Error uploading photo. Please try again.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!photoUrl) {
            setMessage("Please upload a photo before submitting.");
            return;
        }
    
        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();
    
            if (authError) throw authError;
    
            const payload = {
                ...form,
                photo: photoUrl,
                user_id: user?.id,
                is_active: false, // Start as a draft
            };
    
            const { data, error } = await supabase.from("proposals").insert([payload]).select("id").single();
    
            if (error) throw error;
    
            setMessage("Profile created successfully!");
            setTimeout(() => {
                // Pass the template ID to the Template screen
                router.push(`/template?id=${data.id}`);
            }, 1000);
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage("Error saving profile. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Profile</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className={styles.input}
                    />
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className={styles.select}
                    >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={styles.row}>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        placeholder="Height"
                        className={styles.input}
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className={styles.input}
                />
                {photoUrl && (
                    <div>
                        <img src={photoUrl} alt="Uploaded" className={styles.photoPreview} />
                    </div>
                )}
                <input
                    type="text"
                    name="workplace"
                    value={form.workplace}
                    onChange={handleChange}
                    placeholder="Workplace"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="job_title"
                    value={form.job_title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="school"
                    value={form.school}
                    onChange={handleChange}
                    placeholder="School"
                    className={styles.input}
                />
                <select
                    name="education_level"
                    value={form.education_level}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">Education Level</option>
                    <option value="bachelors">Bachelors</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                </select>
                <input
                    type="text"
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    placeholder="Nationality"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="religion"
                    value={form.religion}
                    onChange={handleChange}
                    placeholder="Religion"
                    className={styles.input}
                />
                <select
                    name="marital_status"
                    value={form.marital_status}
                    onChange={handleChange}
                    className={styles.select}
                >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>
                <input
                    type="text"
                    name="languages"
                    value={form.languages}
                    onChange={handleChange}
                    placeholder="Languages"
                    className={styles.input}
                />
                <textarea
                    name="interests"
                    value={form.interests}
                    onChange={handleChange}
                    placeholder="Personal Interests"
                    className={styles.textarea}
                ></textarea>
                <button type="submit" className={styles.button}>
                    Save
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
}