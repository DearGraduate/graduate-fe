import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Notfound from "../pages/NotFound";
import CustomButton from "../components/common/button";
import CustomLottie from "../components/Lotties/CustomLottie";
import AlbumMakingPage from "../pages/album/AlbumMakingPage";
import SharePage from "../pages/SharePage";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import KakaoCallback from "../pages/login/KakaoCallback";
import ModalTest from "../pages/ModalTest";
import ErrorPage from "../pages/error/ErrorStatusPage"
import GraduationMessagePage from "../pages/graduation-message";
import HomeSetting from "../pages/Home/HomeSetting";
const router = createBrowserRouter([
    {
        //루트 레이아웃
        //개발 완료 시 element: 이 뒤에 페이지 연결해주세요! 
        path: '/',
        element: <RootLayout />,
        errorElement: <Notfound />,
        children: [
            {
                //홈페이지
                index: true,
                element: <Home />

            },
            {
                //홈페이지
                path: '/home',
                element: <Home />
            },
            {
                //로그인페이지
                path: '/login',
                element: <Login />
            },
            {
                //카카오 로그인 콜백 페이지
                path: '/login/kakao/callback',
                element: <KakaoCallback />
            },
            {
                //회원가입페이지
                path: '/signup',
                //element:
            },
            {   //메이킹페이지
                path: '/making',
                element: <AlbumMakingPage />
            },
            {
                //마이앨범페이지
                path: '/myalbum',
                //element:
                
            },
            {
                //쉐어링페이지
                path: '/sharing',
                element: <SharePage />
            },
            {
                //다운로딩페이지
                path: '/downloading',
                //element:
            },
            {
                //라이팅페이지
                path: '/writing',
                element: <GraduationMessagePage />
            },
            {
                //라이팅페이지
                path: '/modaltest',
                element: <ModalTest />
            },
            {
                path: "*",
                element: <ErrorPage />
            },
            {
                //홈세틴페이지
                path: '/setting',
                element: <HomeSetting />
            },
            // 아래 주석처리한 양식 참고해서 필요한 페이지 만들 때 추가하면 됩니다. 
            // {
            //     path: '/movies',
            //     children: [
            //         {
            //             path: ':category',
            //             element: <MoviePage />
            //         },
            //     ]
            // },

        ]
    },
])

export default router;
