import { useStore } from "@nanostores/react";
import { isSideNavOpen } from "@stores/sidenav";
import "./SideNav.scss";

type Props = {
  children: React.ReactNode;
}

const SideNav = ({children}: Props) => {

  const isNavOpen = useStore(isSideNavOpen);

  return (
    <div className={`sideNav__container`}>
        <div className={`sideNav__background ${isNavOpen ? 'open' : ''}`} onClick={ () => isSideNavOpen.set(false) }></div>
        <div className={`sideNav ${isNavOpen ? 'open' : ''}`}>
          {children}
        </div>
    </div>
  )
}

export default SideNav;