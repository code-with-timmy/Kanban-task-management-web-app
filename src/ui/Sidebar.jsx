import MainNav from "./MainNav";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="z-10 md:hidden fixed inset-0 w-full h-full bg-black/50"
        ></div>
      )}
      <aside
        className={`area-sidebar ${
          isSidebarOpen
            ? "lg:w-[300px] md:w-[270px] w-[300px]"
            : "w-0 max-sm:hidden"
        } flex flex-col md:transition-all md:duration-75 z-20 md:ease-in-out md:border-r border-border justify-between h-full gap-10 py-5 overflow-hidden max-sm:fixed max-sm:top-[5.5rem] max-sm:max-w-[700px] max-sm:transform max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:rounded-xl  max-sm:h-fit`}
      >
        <MainNav setisSidebarOpen={setIsSidebarOpen} />
      </aside>
    </>
  );
}

export default Sidebar;
