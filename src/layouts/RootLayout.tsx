import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <main className="flex flex-col">
        <Outlet/>
        </main>
    )
}

export default RootLayout;