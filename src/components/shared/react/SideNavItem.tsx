import './SideNavItem.scss';

type Props = {
  iconClass?: string;
  // title: string;
  children: React.ReactNode;
  href: string;
  // onClick?: () => void;
  // active: boolean;
}


const SideNavItem = ({ iconClass, children, href }: Props) => {
  return (
    <a className="side-nav__item" href={href}>
      { iconClass && <i className={`item__icon ${iconClass}`}></i> }
      { children }
    </a>
  )
}

export default SideNavItem;