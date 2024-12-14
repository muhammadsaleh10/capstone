"use client";

import React from "react";
import styles from "./TemplateCard.module.css";

interface ProposalTemplateCardProps {
    template: {
        id: string;
        name: string;
        gender: string;
        dob: string;
        height: string;
        is_active: boolean;
    };
    onPublish: (templateId: string) => void;
    onUnpublish: (templateId: string) => void;
}

const ProposalTemplateCard: React.FC<ProposalTemplateCardProps> = ({
    template,
    onPublish,
    onUnpublish,
}) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.name}>{template.name}</h2>
            <p>Gender: {template.gender}</p>
            <p>Date of Birth: {template.dob}</p>
            <p>Height: {template.height}</p>
            {template.is_active ? (
                <button
                    className={styles.unpublishButton}
                    onClick={() => onUnpublish(template.id)}
                >
                    Unpublish
                </button>
            ) : (
                <button
                    className={styles.publishButton}
                    onClick={() => onPublish(template.id)}
                >
                    Publish
                </button>
            )}
        </div>
    );
};

export default ProposalTemplateCard;