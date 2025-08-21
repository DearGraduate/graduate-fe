import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginAPI } from '../../api/kakaoLogin';
import { useAuthStore } from '../../store/authStore';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('처리 중...');
  const hasProcessed = useRef(false);
  const { login } = useAuthStore();

  useEffect(() => {
    // URL에서 인가 코드 추출
    const code = new URLSearchParams(window.location.search).get("code");
    
    if (code && !hasProcessed.current) {
      console.log('받은 인가 코드:', code);
      hasProcessed.current = true; // 중복 처리 방지
      handleKakaoLogin(code);
    } else if (!code) {
      console.error('인가 코드가 없습니다.');
      setStatus('인가 코드를 받지 못했습니다.');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [navigate, login]);

  const handleKakaoLogin = async (code: string) => {
    try {
    const { data, tokens, hasAlbum, albumId } = await kakaoLoginAPI.loginWithCode(code);
      console.log('카카오 로그인 응답:', data);
      
      if (data.isSuccess) {
        setStatus('로그인 성공! 홈으로 이동합니다...');
        
        // Access Token만 로컬스토리지에 저장
        // Refresh Token은 HttpOnly 쿠키로 자동 저장됨
        if (tokens.accessToken) {
          // JWT에서 만료 시간 추출
          let expiresAt: number | undefined;
          try {
            const tokenParts = tokens.accessToken.replace('Bearer ', '').split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              expiresAt = payload.exp * 1000; // Unix timestamp를 밀리초로 변환
            }
          } catch (error) {
            console.error('토큰 파싱 실패:', error);
          }
          
          // authStore에 로그인 상태 업데이트
          login(tokens.accessToken, expiresAt);
        }
        
        setTimeout(() => {
          // albumId가 있으면 /home/:albumId로, 없으면 /making으로 이동
          if (hasAlbum && albumId) {
            navigate(`/home/${albumId}`, { replace: true });
          } else {
            navigate('/making', { replace: true });
          }
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