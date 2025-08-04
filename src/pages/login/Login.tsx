import KAKAOMINI from '../../assets/icons/KAKAOMini.png';
import LoginLogo from '../../assets/images/LoginLogo.png';
import { useKakaoLogin } from '../../hooks/useKakaoLogin';

const Login = () => {
    const { handleKakaoLogin } = useKakaoLogin();

    return (
        <div className="w-screen min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
            <div className="w-full max-w-[189px] max-h-[197px] opacity-100 flex items-center justify-center gap-2.5 mt-[15vh] short:hidden">
                <img src={LoginLogo} alt="로그인 로고" className="w-full h-full" />
            </div>
            
            <div className="w-full max-w-[227px] min-h-[44px] flex flex-col items-center justify-center gap-2.5 mt-[2vh]">
                <div className="font-pretendard font-medium text-[14px] leading-[100%] tracking-[0] text-center text-[var(--color-text-white)]">
                    나만을 위한 친구의 편지를 간직할 수 있는
                </div>
                <div className="font-pretendard font-medium text-[14px] leading-[100%] tracking-[0] text-center text-[var(--color-text-white)]">
                    편지 앨범 서비스, 포토:리
                </div>
            </div>
            
            <div className="w-full max-w-[127px] min-h-[24px] flex items-center justify-center font-pretendard text-[10px] text-white opacity-100 text-center mt-[20vh]">
                150개의 앨범이 제작 되었어요<br />2654개의 편지가 작성 되었어요
            </div>
            
            <button 
                className="w-full max-w-[290px] h-10 flex items-center justify-center gap-2.5 rounded-[25px] bg-[#FAE100] border-none cursor-pointer opacity-100 mx-auto mt-[4vh]"
                onClick={handleKakaoLogin}
            >
                <div className="w-full max-w-[177px] h-[26px] flex flex-row items-center gap-[21px] opacity-100">
                    <div className="w-[30px] h-[14px] flex items-center justify-center opacity-100">
                        <img src={KAKAOMINI} alt="카카오톡" className="w-[26px] h-[26px]" />
                    </div>
                    <div className="w-full max-w-[126px] h-[17px] flex items-center justify-center opacity-100">
                        <span className="font-pretendard text-[14px] font-medium text-[var(--color-text-black)] leading-[100%] tracking-[0] text-center">
                            KAKAO로 로그인 하기
                        </span>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Login;