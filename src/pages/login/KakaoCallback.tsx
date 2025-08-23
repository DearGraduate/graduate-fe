import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginAPI } from '../../api/kakaoLogin';
import { useAuthStore } from '../../store/authStore';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  const { login } = useAuthStore();
  const [status, setStatus] = useState('처리 중...');

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
      setStatus('인가 코드를 받지 못했습니다.');
      setTimeout(() => navigate('/login', { replace: true }), 1500);
      return;
    }
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    (async () => {
      try {
        const { data, tokens, hasAlbum, albumId } = await kakaoLoginAPI.loginWithCode(code);
        // 1) 토큰이 있으면 로그인 상태 반영 (없어도 네비는 진행)
        if (tokens.accessToken) {
          let expiresAt: number | undefined;
          try {
            // tokens.accessToken은 이미 'Bearer ' 제거된 순수 JWT 라고 가정
            const parts = tokens.accessToken.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              if (payload?.exp) expiresAt = payload.exp * 1000;
            }
          } catch (e) {
            console.warn('액세스 토큰 파싱 실패(무시하고 진행):', e);
          }
          login(tokens.accessToken, expiresAt);
        } else {
          console.warn('Authorization 헤더가 없어도 서버 쿠키로 세션 유지될 수 있습니다.');
        }

        setStatus('로그인 성공! 이동 중...');

        // 2) 앨범 유무 분기: 최초 로그인(albumExists=false) → /making
        if (hasAlbum) {
          // 앨범이 있다고 응답하면 가능하면 ID로 이동(없으면 홈으로)
          if (albumId) {
            navigate(`/home/${albumId}`, { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        } else {
          navigate('/making', { replace: true }); // 최초 로그인 경로 
        }
      } catch (err: any) {
        console.error('로그인 처리 중 오류:', err);
        setStatus(`로그인 실패: ${err?.message ?? '알 수 없는 오류'}`);
        setTimeout(() => navigate('/login', { replace: true }), 1500);
      }
    })();
  }, [navigate, login]);

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
