import Header from "@/components/home/Header";
import MeetingList from "@/components/meeting/MettingList";

const Home = () => {
  return (
    <div className="commonLayoutContainer">
      <Header />
      <MeetingList />
    </div>
  );
};

export default Home;
