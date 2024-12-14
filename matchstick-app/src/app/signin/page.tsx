// src/app/signin/page.tsx
'use client';

import { supabase } from '../../lib/supabaseClient';
import styles from './signin.module.css'; // Import CSS module

export default function SignIn() {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error logging in:', error.message);
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>MATCHSTICK</h1>
                <p className={styles.subtitle}>Please sign in or log in using your email</p>
                <button onClick={handleLogin} className={styles.button}>
                    Continue
                </button>
            </div>
        </div>
    );
}