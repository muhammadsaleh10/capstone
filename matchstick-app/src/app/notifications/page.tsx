"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./notifications.module.css";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();

                if (error) {
                    console.error("Error fetching user ID:", error.message);
                    return;
                }

                if (user) {
                    setUserId(user.id); // Set the authenticated user's ID
                } else {
                    console.error("User not authenticated.");
                }
            } catch (error) {
                console.error("Error fetching user ID:", error.message || error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) {
                console.error("User ID is not available. Cannot fetch notifications.");
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("notifications")
                    .select("id, message, created_at")
                    .eq("profile_id", userId)
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching notifications:", error.message);
                    return;
                }

                setNotifications(data || []);
            } catch (error) {
                console.error("Error fetching notifications:", error.message || error);
            }
        };

        fetchNotifications();
    }, [userId]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Notifications</h1>
            <div className={styles.notificationsWrapper}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification.id} className={styles.notificationCard}>
                            <div className={styles.notificationInfo}>
                                <div className={styles.iconWrapper}>
                                    <div className={styles.userIcon}>👤</div>
                                </div>
                                <p>{notification.message}</p>
                            </div>
                            <div className={styles.contactButtonWrapper}>
                                <button className={styles.contactButton}>Contact</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noNotifications}>No notifications available.</p>
                )}
            </div>
        </div>
    );
}