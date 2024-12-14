"use client";

import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js'; // Import User type
import { FaHome, FaUserPlus, FaBell, FaCog, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Updated icons

const Navbar = () => {
    const [user, setUser] = useState<User | null | undefined>(null);
    const pathname = usePathname(); // Get the current path
    const router = useRouter(); // For navigation

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error.message);
                return;
            }
            setUser(session?.user);
        };

        fetchSession();
    }, []);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            router.push('/signin'); // Redirect to the sign-in page
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    // Don't render the Navbar on the '/signin' page
    if (pathname === '/signin') {
        return null;
    }

    return (
        <nav className="navbar">
            <Link href="/" className="nav-link">
                <FaHome className="nav-icon" />
                <span>Home</span>
            </Link>
            <Link href="/proposals" className="nav-link">
                <FaUserPlus className="nav-icon" />
                <span>Proposals</span>
            </Link>
            <Link href="/notifications" className="nav-link">
                <FaBell className="nav-icon" />
                <span>Notifications</span>
            </Link>
            <Link href="/settings" className="nav-link">
                <FaCog className="nav-icon" />
                <span>Settings</span>
            </Link>
            {user ? (
                <button onClick={handleLogout} className="nav-link nav-button">
                    <FaSignOutAlt className="nav-icon" />
                    <span>Logout</span>
                </button>
            ) : (
                <Link href="/signin" className="nav-link">
                    <FaSignInAlt className="nav-icon" />
                    <span>Sign In</span>
                </Link>
            )}
        </nav>
    );
};

export default Navbar;