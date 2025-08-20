import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";
import { useAuthStore } from "../../store/authStore";
import { useParams } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useAuthStore();
  const { albumId } = useParams<{ albumId: string }>();
  
  return isLoggedIn ? <HomeUser albumId={albumId ? parseInt(albumId) : undefined} /> : <HomeGuest />;
};

export default Home;
