import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { t } = useTranslation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header className="sticky z-50 top-0 w-full border-b bg-card/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <Logo />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-8 font-medium">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-muted-foreground"
                }
              >
                {t("nav.tasks")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/settings"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-muted-foreground"
                }
              >
                {t("nav.settings")}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Avatar className="size-12 hidden md:block">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full"
          />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
        <div
          className="block md:hidden"
          onClick={() => setIsOpenMenu((prev) => !prev)}
        >
          {isOpenMenu ? <X className="size-6" /> : <Menu className="size-6" />}
        </div>
      </div>
      {isOpenMenu && (
        <nav className="md:hidden">
          <ul className="container mx-auto px-4 py-2 flex flex-col gap-4 font-medium">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-muted-foreground"
                }
                onClick={() => setIsOpenMenu(false)}
              >
                {t("nav.tasks")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/settings"}
                className={({ isActive }) =>
                  isActive ? "text-accent" : "text-muted-foreground"
                }
                onClick={() => setIsOpenMenu(false)}
              >
                {t("nav.settings")}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
export default Header;
