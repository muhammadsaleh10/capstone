"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import TemplateCard from "../../components/TemplateCard";
import styles from "./proposals.module.css";

export default function Proposals() {
    const [activePosts, setActivePosts] = useState([]);
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                // Get the current logged-in user
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    console.error("No user is logged in");
                    return;
                }

                // Fetch active posts
                const { data: activeData, error: activeError } = await supabase
                    .from("proposals")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("is_active", true);

                if (activeError) {
                    console.error("Error fetching active posts:", activeError);
                } else {
                    setActivePosts(activeData || []);
                }

                // Fetch draft posts
                const { data: draftData, error: draftError } = await supabase
                    .from("proposals")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("is_active", false);

                if (draftError) {
                    console.error("Error fetching draft posts:", draftError);
                } else {
                    setDrafts(draftData || []);
                }
            } catch (error) {
                console.error("Error fetching proposals:", error);
            }
        };

        fetchTemplates();
    }, []);

    const handlePublish = async (id: string) => {
        try {
            const { error } = await supabase
                .from("proposals")
                .update({ is_active: true })
                .eq("id", id);

            if (error) throw error;

            // Move template from drafts to active
            setDrafts((prev) => prev.filter((post) => post.id !== id));
            setActivePosts((prev) => [
                ...prev,
                drafts.find((post) => post.id === id),
            ]);
        } catch (error) {
            console.error("Error publishing template:", error);
        }
    };

    const handleUnpublish = async (id: string) => {
        try {
            const { error } = await supabase
                .from("proposals")
                .update({ is_active: false })
                .eq("id", id);

            if (error) throw error;

            // Move template from active to drafts
            setActivePosts((prev) => prev.filter((post) => post.id !== id));
            setDrafts((prev) => [
                ...prev,
                activePosts.find((post) => post.id === id),
            ]);
        } catch (error) {
            console.error("Error unpublishing template:", error);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Proposals</h1>

            {/* Create Template Section */}
            <div className={styles.createTemplateWrapper}>
                <a href="/registration" className={styles.createTemplate}>
                    <div className={styles.createTemplateIcon}>
                        <img src="/icons/create-template.svg" alt="Create Template Icon" />
                    </div>
                    <h3>Create Template</h3>
                    <p>Or share a link with the client to create a profile</p>
                </a>
            </div>

            {/* Active Posts */}
            <h2 className={styles.activeHeader}>Active Posts</h2>
            <div className={styles.templateList}>
                {activePosts.length > 0 ? (
                    activePosts.map((post) => (
                        <TemplateCard
                            key={post.id}
                            template={post}
                            buttonLabel="Unpublish"
                            buttonAction={() => handleUnpublish(post.id)}
                        />
                    ))
                ) : (
                    <p className={styles.noPostsMessage}>No active posts</p>
                )}
            </div>

            {/* Drafts */}
            <h2 className={styles.draftsHeader}>Drafts</h2>
            <div className={styles.templateList}>
                {drafts.length > 0 ? (
                    drafts.map((post) => (
                        <TemplateCard
                            key={post.id}
                            template={post}
                            buttonLabel="Publish"
                            buttonAction={() => handlePublish(post.id)}
                        />
                    ))
                ) : (
                    <p className={styles.noPostsMessage}>No drafts</p>
                )}
            </div>
        </div>
    );
}