// src/app/edit-profile.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProfileForm from '../components/ProfileForm';

export default function EditProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser ();

            if (userError) {
                console.error('Error fetching user:', userError.message);
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user?.id)
                .single();

            if (error) console.error('Error fetching profile:', error.message);
            else setProfile(data);
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Edit Your Profile</h1>
            {profile ? <ProfileForm existingProfile={profile} /> : <p>Loading...</p>}
        </div>
    );
}