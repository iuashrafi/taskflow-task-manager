const NavbarBrand = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <img src="/brandIcon.svg" alt="brandIcon" className="h-5" />
      <span className="text-sm xl:text-lg font-medium">Taskflow</span>
    </div>
  );
};

export default NavbarBrand;
