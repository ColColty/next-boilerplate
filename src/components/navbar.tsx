import Image from "next/image";
import { type ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  links: Array<
    { label: string; link: string } | { label: string; component: ReactElement }
  >;
  logo: string;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-0 top-0">
      <div className="bg-navbar container flex min-h-[80px] items-center justify-between py-2 md:py-4">
        <Image src={props.logo} alt={t("brand")} width={60} height={60} />
        <ul className="flex items-center gap-4">
          {props.links.map((link) => (
            <li key={link.label}>
              {"component" in link ? link.component : <a href={link.link}>{link.label}</a>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
