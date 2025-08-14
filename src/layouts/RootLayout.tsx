import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const RootLayout = () => {
    const isWindow = useMediaQuery({ query: "(min-width: 1025px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1024px) , (max-height:1024px)" });
    return (
        <main className={`
        ${isWindow 
        ? 'max-w-[360px] mx-auto' 
        : isTablet
        ? 'width-screen' : 
        isMobile
        ? 'w-screen' : ''}`}>
        <Outlet/>
        </main>
    )
}

export default RootLayout;