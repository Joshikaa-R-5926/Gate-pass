import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: string | null;
  updated_at: string | null;
  [key: string]: any;
}

export const useUserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        showError("You must be logged in to view this page.");
        navigate('/login');
        setLoading(false);
        return;
      }
      
      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        showError("Failed to fetch user profile.");
        console.error(profileError);
        await supabase.auth.signOut();
        navigate('/login');
      } else {
        setProfile(profileData);
      }
      
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  return { user, profile, loading };
};