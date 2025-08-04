import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";
import { useAuthStore } from "../../store/authStore";

const Home = () => {
  const { isLoggedIn } = useAuthStore();
  
  return isLoggedIn ? <HomeUser /> : <HomeGuest />;
};

export default Home;
