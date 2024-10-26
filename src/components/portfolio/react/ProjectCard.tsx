import "./ProjectCard.scss";
import Modal from "@components/shared/react/Modal";
import Tag from '@components/shared/astro/Tag.astro';
import LinkButton from '@components/shared/astro/LinkButton.astro';
import CarouselSimple from '@components/shared/react/CarouselSimple';

import { useState } from "react";
import type { CollectionEntry } from 'astro:content';


type Props = {
  project: CollectionEntry<'projects'>;
}

type CarouselImage = {
  src: string;
  alt: string;
}

const ProjectCard = ({ project: {data}, project }: Props ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const carouselImages = project.data.images?.map((image) : CarouselImage => ({
    src: image.image.src,
    alt: image.alt || project.data.title
  }));


  return (
    <>
      <article className="project-card" onClick={handleCardClick}>
        <img className="project-img" src={data.image.src} alt={data.title} />
      </article>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="project-modal">
          { data.images && <CarouselSimple images={carouselImages as CarouselImage[]} /> }
          <div className="project-details">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div className="tags">
              {/* {data.tags?.map((tag) => (
                <Tag key={tag} text={tag} />
              ))} */}
            </div>
            <div className="buttons">
              {/* {data.demo && <LinkButton iconFont="fab fa-github" link={data.demo}>Demo</LinkButton>}
              {data.code_repo && <LinkButton iconFont="fas fa-external-link-alt" link={data.code_repo}>Code</LinkButton>} */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProjectCard;