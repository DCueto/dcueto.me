type Props = {
  tab: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Tab = ({ tab, activeTab, setActiveTab }: Props) => {
  
  return (
    <span
      className={`tab-rounded ${activeTab === tab && "active"}`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </span>
  );
}