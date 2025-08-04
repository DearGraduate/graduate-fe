import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Notfound from "../pages/NotFound";
import CustomButton from "../components/common/button";
import CustomLottie from "../components/Lotties/CustomLottie";
import AlbumMakingPage from "../pages/AlbumMakingPage";
import SharePage from "../pages/SharePage";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import ModalTest from "../pages/ModalTest";
import ErrorPage from "../pages/error/ErrorStatusPage"
import GraduationMessagePage from "../pages/graduation-message";

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
                element: <div style={{ fontFamily: 'Ydestreet', fontWeight: 'normal' }}>
                    홈페이지
                    <CustomButton bgColor="bg-button-default"
                    className="w-80"
                    onClick={() => console.log('앨범 만들기 클릭!')}
                    >앨범 만들기</CustomButton>
                    <CustomLottie
                        loop={true}
                        autoplay={true}
                        style={{ width: 300, height: 300 }}
                    />
                </div> // 임시로 div 추가

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
                element: <ErrorPage />,
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
