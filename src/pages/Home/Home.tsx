import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";

const isLoggedIn = false; // 임시 로그인 상태

const Home = () => {
  return isLoggedIn ? <HomeUser /> : <HomeGuest />;
};

export default Home;
