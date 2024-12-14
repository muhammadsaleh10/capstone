"use client";

import React from "react";
import styles from "./TemplateCard.module.css";

interface HomeTemplateCardProps {
    template: {
        id: string;
        name: string;
        gender: string;
        dob: string;
        height: string;
    };
    onInterested: (templateId: string) => void;
}

const HomeTemplateCard: React.FC<HomeTemplateCardProps> = ({
    template,
    onInterested,
}) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.name}>{template.name}</h2>
            <p>Gender: {template.gender}</p>
            <p>Date of Birth: {template.dob}</p>
            <p>Height: {template.height}</p>
            <button
                className={styles.interestedButton}
                onClick={() => onInterested(template.id)}
            >
                I'm Interested
            </button>
        </div>
    );
};

export default HomeTemplateCard;