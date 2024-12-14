// src/components/Auth.tsx
'use client';

import { supabase } from '../lib/supabaseClient';

const Auth = () => {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error logging in:', error.message);
    };

    return (
        <div className="auth-form">
            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" placeholder="(XXX) XXX-XXXX" disabled />
            </div>
            <p className="or-divider">OR</p>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="name@mail.com" disabled />
            </div>
            <button onClick={handleLogin} className="auth-button">
                Continue
            </button>
        </div>
    );
};

export default Auth;