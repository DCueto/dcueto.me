import { useEffect, useRef } from "react";

type Props = {
  content: string
}


export const ContentExperienceCard = ({ content }: Props) => {

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [contentRef]);

  return (
    <div ref={contentRef} className="experience-description>"></div>
  )
};