import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useEffect, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
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
    <Container>
      <ContentContainer>
        <h1>커뮤니티 글 작성</h1>

        <WriteLayout
          profile={profile}
          isEdit={false}
          paramId=""
          setIsEditState={() => {}}
        />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  color: #f3f3f3;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1066px;
  width: 80%;
  & select {
    width: 100px;
    height: 40px;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--4-gray);
  }
`;

export default Write;
