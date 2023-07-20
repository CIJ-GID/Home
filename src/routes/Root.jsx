import { Outlet, NavLink, useNavigation } from "react-router-dom";

const links = [
  { name: "Ruta default", path: "/" },
  { name: "Ruta 2", path: "/ruta2" },
  //   { name: "Ruta 3", path: "/ruta3" },
];

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <div className="fixed z-50 flex h-16 w-full items-center bg-primary px-32 shadow-2xl">
        <ul className="flex h-full w-full">
          {links.map((l, index) => (
            <li key={index} className="mr-8 flex items-center justify-center">
              <NavLink
                to={l.path}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "border-b-2 p-2 text-base font-bold"
                    : isPending
                    ? "pending"
                    : "rounded-md border-b-2 border-transparent p-2 font-bold text-white"
                }
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}
