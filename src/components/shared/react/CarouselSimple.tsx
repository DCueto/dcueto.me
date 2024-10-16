import { useState } from "react";
import './CarouselSimple.scss';

type Image = {
  src: string;
  alt: string;
}

type Props = {
  images: Image[];
}


const CarouselSimple = ({ images }: Props) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const moveNextSlide = () => {
    if (currentSlide === images.length - 1) {
      setCurrentSlide(0);
      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  const movePrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1);
      return;
    }

    setCurrentSlide(currentSlide - 1);
  };


  return (
    <div className="carousel-simple">
      <button className="prev" onClick={ () => movePrevSlide() }><i className="fa-solid fa-angle-left"></i></button>
      <button className="next" onClick={() => moveNextSlide() }><i className="fa-solid fa-angle-right"></i></button>
      {
        images.map((image, i) => (
          <div className={`carousel-simple__slide ${ currentSlide === i && 'active' }`} data-id={i}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))
      }
    </div>
  );

}


export default CarouselSimple;