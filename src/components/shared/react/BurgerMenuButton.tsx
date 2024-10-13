import "./BurgerMenuButton.scss";
import { isSideNavOpen } from "@stores/sidenav";

const BurgerMenuButton = () => {
  const toggleSideNav = () => {
    isSideNavOpen.set(!isSideNavOpen.get());
  }

  return (
    <button className="burgerMenu" onClick={toggleSideNav}>
      <div className="burgerMenu__bar"></div>
      <div className="burgerMenu__bar"></div>
      <div className="burgerMenu__bar"></div>
    </button>
  )
}

export default BurgerMenuButton;