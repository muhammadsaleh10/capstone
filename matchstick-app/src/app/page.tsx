"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import TemplateCard from "../components/TemplateCard";
import styles from "./home/home.module.css";

export default function Home() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const { data, error } = await supabase
                    .from("proposals")
                    .select("*")
                    .eq("is_active", true);

                if (error) {
                    console.error("Error fetching templates:", error.message);
                } else {
                    setTemplates(data || []);
                }
            } catch (error) {
                console.error("Error fetching templates:", error.message || error);
            }
        };

        fetchTemplates();
    }, []);

    const handleInterested = async (template) => {
        try {
            // Fetch the authenticated user's details
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();
    
            if (authError) {
                throw new Error("Failed to fetch authenticated user.");
            }
    
            if (!user) {
                throw new Error("User is not authenticated.");
            }
    
            // Insert the notification
            const { error } = await supabase
                .from("notifications")
                .insert([
                    {
                        profile_id: template.user_id, // The user ID associated with the template (receiver)
                        sender_id: user.id, // Current user's ID (sender)
                        message: `${user.email} is interested in your profile`, // Notification message
                        post_id: template.id, // The post ID
                    },
                ]);
    
            if (error) {
                throw error; // Throw the error to be caught below
            }
    
            console.log("Notification sent successfully.");
        } catch (error) {
            console.error("Error creating notification:", error.message || error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Home</h1>
            <div className={styles.templates}>
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            buttonLabel="I'm Interested"
                            buttonAction={() => handleInterested(template)}
                        />
                    ))
                ) : (
                    <p>No templates available.</p>
                )}
            </div>
        </div>
    );
}