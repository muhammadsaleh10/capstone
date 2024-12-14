// src/components/TemplateCard.tsx
"use client";

import React from "react";
import styles from "./TemplateCard.module.css";
import Image from "next/image";
import {
    FaUser,
    FaBirthdayCake,
    FaRuler,
    FaSuitcase,
    FaUniversity,
    FaFlag,
    FaMapMarkerAlt,
    FaPrayingHands,
    FaHeart,
    FaGlobe,
    FaBookOpen,
} from "react-icons/fa";

interface TemplateCardProps {
    template: {
        id: string;
        name: string;
        gender: string;
        dob: string;
        height: string;
        workplace: string;
        job_title: string;
        school: string;
        education_level: string;
        nationality: string;
        location: string;
        religion: string;
        marital_status: string;
        languages: string;
        interests: string;
        photo: string | null;
    };
    buttonLabel: string;
    buttonAction: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
    template,
    buttonLabel,
    buttonAction,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.name}>{template.name}</h2>
                <div className={styles.iconGroup}>
                    <FaUser className={styles.icon} />
                    <p>{template.gender}</p>
                    <FaBirthdayCake className={styles.icon} />
                    <p>{template.dob}</p>
                    <FaRuler className={styles.icon} />
                    <p>{template.height}</p>
                </div>
            </div>
            <div className={styles.photoWrapper}>
                <Image
                    src={template.photo || "/placeholder.png"}
                    alt={`${template.name}'s photo`}
                    width={200}
                    height={200}
                    className={styles.photo}
                />
            </div>
            <div className={styles.info}>
                <p>
                    <FaSuitcase className={styles.icon} />
                    <span className={styles.label}>Workplace:</span> {template.workplace || "N/A"}
                </p>
                <p>
                    <FaUniversity className={styles.icon} />
                    <span className={styles.label}>School:</span> {template.school || "N/A"}
                </p>
                <p>
                    <FaBookOpen className={styles.icon} />
                    <span className={styles.label}>Education Level:</span>{" "}
                    {template.education_level || "N/A"}
                </p>
                <p>
                    <FaFlag className={styles.icon} />
                    <span className={styles.label}>Nationality:</span> {template.nationality || "N/A"}
                </p>
                <p>
                    <FaMapMarkerAlt className={styles.icon} />
                    <span className={styles.label}>Location:</span> {template.location || "N/A"}
                </p>
                <p>
                    <FaPrayingHands className={styles.icon} />
                    <span className={styles.label}>Religion:</span> {template.religion || "N/A"}
                </p>
                <p>
                    <FaHeart className={styles.icon} />
                    <span className={styles.label}>Marital Status:</span>{" "}
                    {template.marital_status || "N/A"}
                </p>
                <p>
                    <FaGlobe className={styles.icon} />
                    <span className={styles.label}>Languages:</span> {template.languages || "N/A"}
                </p>
                <p>
                    <FaBookOpen className={styles.icon} />
                    <span className={styles.label}>Interests:</span> {template.interests || "N/A"}
                </p>
            </div>
            <button className={styles.actionButton} onClick={buttonAction}>
                {buttonLabel}
            </button>
        </div>
    );
};

export default TemplateCard;