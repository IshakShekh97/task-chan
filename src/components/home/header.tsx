import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  return (
    <div className="md:py-6 py-4 max-w-screen-2xl mx-auto border-b border-foreground flex items-center max-md:justify-between justify-center max-md:px-3">
      <div className="flex items-center justify-center gap-5">
        <img
          src="/task.png"
          alt="logo"
          className="lg:size-10 size-6 md:size-9"
        />
        <p className="text-2xl md:text-4xl font-extrabold">
          <span className="bg-gradient-to-bl from-emerald-600 to-yellow-600 bg-clip-text text-transparent">
            Task
          </span>
          Chan
        </p>
      </div>

      <div className="md:fixed block bottom-10 right-10">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
