import React, { useEffect } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';

const Login = () => {
  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });
    console.log(data);
  };

  const facebookLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook'
    });
    console.log(data);
  };

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>로그인/회원가입</h1>
      <button onClick={kakaoLogin}>카카오</button>
      <button onClick={googleLogin}>구글</button>
      <button onClick={facebookLogin}>페북</button>
      <button>애플</button>
    </div>
  );
};

export default Login;
