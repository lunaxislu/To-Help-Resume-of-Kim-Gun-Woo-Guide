import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useEffect, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router';
import { supabase } from '../../api/supabase/supabaseClient';
import WriteLayout from '../../components/community/WriteLayout';
import * as St from '../../styles/community/CommunityWriteStyle';
import { ProfileObject } from './api/model';
export const CATEGORY_ARRAY = [
  '전체',
  '공구',
  '고민',
  '피드백',
  '수다',
  '구인'
];
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
  const navigate = useNavigate();
  const handleOnClickBack = () => {
    const confirm = window.confirm(
      '작성하신 글이 모두 지워집니다. 그래도 페이지를 떠나시겠습니까?'
    );
    if (confirm) {
      navigate(-1);
    }
  };
  return (
    <St.Container>
      <St.ContentContainer>
        <St.Topper>
          <St.BackBtnBox>
            <St.BackIcon onClick={handleOnClickBack} />
          </St.BackBtnBox>
          <h1>글쓰기</h1>
          <p>* 필수항목</p>
        </St.Topper>

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

export default React.memo(Write);
