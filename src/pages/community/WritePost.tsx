import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useEffect, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../styles/community/CommunityWriteStyle';
import WriteLayout from './WriteLayout';
import { ProfileObject } from './model';
export const categoryArray = ['전체', '고민', '꿀팁', '일상', '구인', '공구'];
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const Write: React.FC = () => {
  const [profile, setProfile] = useState<ProfileObject[]>();
  const [userId, setUserId] = useState('');
  console.log('write이에요');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setUserId(user!.id);

        const { data: profiles, error } = await supabase
          .from('user')
          .select('*')
          .eq('id', user!.id);

        if (error) {
          console.log(error);
        }

        if (profiles != null) {
          setProfile(profiles);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <St.Container>
      <St.ContentContainer>
        <h1>커뮤니티 글 작성</h1>

        <WriteLayout
          profile={profile}
          isEdit={false}
          paramId=""
          setIsEditState={() => {}}
        />
      </St.ContentContainer>
    </St.Container>
  );
};

export default Write;
