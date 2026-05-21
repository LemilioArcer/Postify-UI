import { Link, useLocation } from "react-router";
import { IoHomeSharp } from "react-icons/io5";
import { RxVideo } from "react-icons/rx";
import { CiPaperplane } from "react-icons/ci";
import { TbZoom } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const navItems = [
  { to: "/home", icon: IoHomeSharp, label: "Inicio" },
  { to: "/videos", icon: RxVideo, label: "Videos" },
  { to: "/messages", icon: CiPaperplane, label: "Mensajes" },
  { to: "/search", icon: TbZoom, label: "Buscar" },
];

export default function Bottoms({ userId }) {
  const location = useLocation();
  const profilePath = userId ? `/profile/${userId}` : "/home";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-3">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <Link
              key={label}
              to={to}
              className={`flex flex-col items-center gap-1 transition ${
                isActive 
                  ? "text-indigo-600" 
                  : "text-slate-400 hover:text-indigo-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}

        <Link
          to={profilePath}
          className={`flex flex-col items-center gap-1 transition ${
            location.pathname.startsWith("/profile")
              ? "text-indigo-600"
              : "text-slate-400 hover:text-indigo-600"
          }`}
        >
          <CgProfile className="h-6 w-6" />
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </nav>
  );
}