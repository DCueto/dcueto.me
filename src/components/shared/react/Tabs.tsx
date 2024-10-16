import { Tab } from '@components/shared/react/Tab';
import { useState, type PropsWithChildren } from 'react';

type Props = {
  tabs: string[];
  defaultActiveTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs = ({ tabs, defaultActiveTab, onTabChange }: Props) => {

  const [activeTab, setActiveTab] = useState( defaultActiveTab );

  const handleActiveTab = ( value: string ) => {
    setActiveTab( value );
    onTabChange( value );
  }

  return (
    <>
      <nav className="experience-nav">
        {tabs.map((tab: string, index) => (
          <Tab
            key={index}
            tab={tab}
            activeTab={activeTab}
            setActiveTab={() => handleActiveTab(tab)}
          />
        ))}
      </nav>
    </>
  )
};