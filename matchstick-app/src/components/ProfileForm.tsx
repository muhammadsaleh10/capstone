// src/components/ProfileForm.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ProfileFormProps {
    existingProfile?: { name: string; gender: string };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ existingProfile }) => {
    const [name, setName] = useState(existingProfile?.name || '');
    const [gender, setGender] = useState(existingProfile?.gender || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser ();

        if (existingProfile) {
            // Update existing profile
            const { error } = await supabase
                .from('profiles')
                .update({ name, gender })
                .eq('user_id', user?.id);
            if (error) console.error('Error updating profile:', error.message);
        } else {
            // Create new profile
            const { error } = await supabase
                .from('profiles')
                .insert([{ user_id: user?.id, name, gender }]);
            if (error) console.error('Error creating profile:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <button type="submit">{existingProfile ? 'Update' : 'Create'} Profile</button>
        </form>
    );
};

export default ProfileForm;