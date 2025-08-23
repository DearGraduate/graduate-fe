// components/AuthBridge.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGuestAlbumStore } from '../store/guestAlbumStore';
import { useAlbumStore } from '../store/albumStore';

export default function AuthBridge() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const payload = useGuestAlbumStore.getState().consume();
    if (payload) {
      const { albumId, albumName, albumType, description, pendingRedirect } = payload;

      if (albumId != null) {
        // ✅ 게스트 전용 세터: 락을 걸면서 강제 세팅
        useAlbumStore.getState().setFromAlbumFromGuest({
          id: albumId,
          albumName: albumName ?? '',
          albumType: albumType ?? '',
          description: description ?? '',
        });
      }

      navigate(pendingRedirect ?? '/writing', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return null;
}
