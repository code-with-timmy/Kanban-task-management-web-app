function Logo() {
  return (
    <div className="lg:w-[300px] md:w-[270px] md:border-r  border-border p-[1rem] pl-[1.5rem] flex items-center gap-2">
      <div className="flex gap-[0.2rem]">
        <div className="logo bg-main-purple"></div>
        <div className="logo bg-main-purple/75"></div>
        <div className="logo bg-main-purple/50"></div>
      </div>
      <h1 className="font-extrabold text-heading text-[24px] max-md:hidden">
        Kanban
      </h1>
    </div>
  );
}

export default Logo;
