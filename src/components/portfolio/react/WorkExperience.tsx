import './WorkExperience.scss';

import React, { useEffect, useRef, useState } from "react";
import type { CollectionEntry } from 'astro:content'

import { Tabs } from "@components/shared/react/Tabs";
import { ContentExperienceCard } from "./ContentExperienceCard";

type Props = {
  experience: CollectionEntry<'experience'>[];
  tabs: string[];
  children?: any;
}


export const WorkExperience = ({ tabs, experience }: Props) => {

  const [activeTab, setActiveTab] = useState( tabs[0] );

  const handleActiveTab = ( value: string ) => {
    setActiveTab( value );
  }

  useEffect(() => {
    console.log( activeTab );
  }, [activeTab]);

  return (
    <div className="experience-container">
      <Tabs tabs={tabs} defaultActiveTab={activeTab} onTabChange={handleActiveTab}/>

        {
          experience.map(({ data, render }, key) => (
            data.company_name === activeTab && (
              <article className="experience-content" key={key}>
                <h5>{ data.company_name }</h5>
                {
                  data.positions.map( (position, key ) => (
                    <div className="experience-roles" key={key}>
                      <div className="experience-role">
                        <p className="title-role">{ position.role }</p>
                        <span className="date-role">{ position.start_date.toISOString() } - { position.end_date?.toISOString() }</span>
                      </div>
                    </div>
                  ))
                }

                {
                  data.content && (
                    <ContentExperienceCard content={data.content} />
                  )
                }
              </article>
            )
          ))
        }

    </div>
  )
};