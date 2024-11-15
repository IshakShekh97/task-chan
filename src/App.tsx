import Header from "./components/home/header";
import Hero from "./components/home/Hero";

const App = () => {
  return (
    <div>
      <div className="px-2 mx-auto max-w-screen-2xl sm:px-4 md:px-6 lg:px-9 xl:px-10">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default App;
