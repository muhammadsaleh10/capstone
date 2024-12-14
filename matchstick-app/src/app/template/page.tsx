"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./template.module.css";
import Image from "next/image";

import {
    FaUser,
    FaBirthdayCake,
    FaRuler,
    FaBuilding,
    FaSuitcase,
    FaUniversity,
    FaFlag,
    FaMapMarkerAlt,
    FaPrayingHands,
    FaHeart,
    FaGlobe,
    FaBookOpen,
} from "react-icons/fa";

export default function Template() {
    const [templateData, setTemplateData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams(); // Get query parameters
    const templateId = searchParams.get("id"); // Extract the `id` from the query

    useEffect(() => {
        const fetchTemplateData = async () => {
            try {
                if (!templateId) {
                    throw new Error("No template ID provided.");
                }

                const { data, error } = await supabase
                    .from("proposals")
                    .select("*")
                    .eq("id", templateId)
                    .single();

                if (error) throw error;

                setTemplateData(data);
            } catch (error) {
                console.error("Error fetching template data:", error);
                router.push("/registration");
            } finally {
                setLoading(false);
            }
        };

        fetchTemplateData();
    }, [router, templateId]);

    if (loading) return <div>Loading...</div>;

    if (!templateData) return <div>No template data found.</div>;

    const handleBack = () => {
        router.push("/registration");
    };

    const handleSubmit = async () => {
        try {
            const { error } = await supabase
                .from("proposals")
                .update({ is_active: false }) // Save as draft
                .eq("id", templateId);

            if (error) throw error;

            router.push("/proposals");
        } catch (error) {
            console.error("Error submitting template:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <button onClick={handleBack} className={styles.backButton}>
                    Back
                </button>
                <button onClick={handleSubmit} className={styles.submitButton}>
                    Submit
                </button>
            </div>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.name}>{templateData.name}</h1>
                    <div className={styles.iconGroup}>
                        <FaUser className={styles.icon} />
                        <p>{templateData.gender}</p>
                        <FaBirthdayCake className={styles.icon} />
                        <p>{templateData.dob}</p>
                        <FaRuler className={styles.icon} />
                        <p>{templateData.height}</p>
                    </div>
                </div>
                <div className={styles.photoWrapper}>
                    <Image
                        src={templateData.photo || "/placeholder.png"}
                        alt={`${templateData.name}'s photo`}
                        className={styles.photo}
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.info}>
                    <p>
                        <FaSuitcase className={styles.icon} />
                        <span className={styles.label}>Workplace:</span> {templateData.workplace || "N/A"}
                    </p>
                    <p>
                        <FaBuilding className={styles.icon} />
                        <span className={styles.label}>Job Title:</span> {templateData.job_title || "N/A"}
                    </p>
                    <p>
                        <FaUniversity className={styles.icon} />
                        <span className={styles.label}>School:</span> {templateData.school || "N/A"}
                    </p>
                    <p>
                        <FaBookOpen className={styles.icon} />
                        <span className={styles.label}>Education Level:</span>{" "}
                        {templateData.education_level || "N/A"}
                    </p>
                    <p>
                        <FaFlag className={styles.icon} />
                        <span className={styles.label}>Nationality:</span> {templateData.nationality || "N/A"}
                    </p>
                    <p>
                        <FaMapMarkerAlt className={styles.icon} />
                        <span className={styles.label}>Location:</span> {templateData.location || "N/A"}
                    </p>
                    <p>
                        <FaPrayingHands className={styles.icon} />
                        <span className={styles.label}>Religion:</span> {templateData.religion || "N/A"}
                    </p>
                    <p>
                        <FaHeart className={styles.icon} />
                        <span className={styles.label}>Marital Status:</span>{" "}
                        {templateData.marital_status || "N/A"}
                    </p>
                    <p>
                        <FaGlobe className={styles.icon} />
                        <span className={styles.label}>Languages:</span> {templateData.languages || "N/A"}
                    </p>
                    <p>
                        <FaBookOpen className={styles.icon} />
                        <span className={styles.label}>Interests:</span> {templateData.interests || "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}