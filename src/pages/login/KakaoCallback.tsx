import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginAPI } from '../../api/kakaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('처리 중...');

  useEffect(() => {
    // URL에서 인가 코드 추출
    const code = new URLSearchParams(window.location.search).get("code");
    
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
      const { data, tokens } = await kakaoLoginAPI.loginWithCode(code);
      console.log('카카오 로그인 응답:', data);
      
      if (data.isSuccess) {
        setStatus('로그인 성공! 홈으로 이동합니다...');
        
        // 토큰 저장
        if (tokens.accessToken) {
          localStorage.setItem('accessToken', tokens.accessToken);
        }
        if (tokens.refreshToken) {
          localStorage.setItem('refreshToken', tokens.refreshToken);
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
        <h2 className="text-xl font-bold mb-4">카카오 로그인</h2>
        <p className="text-lg mb-2">{status}</p>
        <p className="text-sm opacity-80">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default KakaoCallback; 