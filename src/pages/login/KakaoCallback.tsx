import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoAuth } from '../../api/auth';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('처리 중...');

  useEffect(() => {
    // URL에서 인가 코드 추출
    const code = new URL(window.location.href).searchParams.get("code");
    
    if (code) {
      console.log('받은 인가 코드:', code);
      handleKakaoLogin(code);
    } else {
      console.error('인가 코드가 없습니다.');
      setStatus('인가 코드를 받지 못했습니다.');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [navigate]);

  const handleKakaoLogin = async (code: string) => {
    try {
      const data = await kakaoAuth.loginWithCode(code);
      console.log('카카오 로그인 응답:', data);
      
      if (data.isSuccess) {
        setStatus('로그인 성공! 홈으로 이동합니다...');
        
        // 토큰이나 사용자 정보 저장 (result에서 추출)
        if (data.result) {
          localStorage.setItem('userInfo', JSON.stringify(data.result));
        }
        
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        console.error('로그인 실패:', data.message);
        setStatus(`로그인 실패: ${data.message}`);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      console.error('로그인 처리 중 에러:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setStatus(`로그인 처리 중 오류: ${errorMessage}`);
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-main)]">
      <div className="text-white text-center">
        <h2>카카오 로그인 {status}</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoCallback; 