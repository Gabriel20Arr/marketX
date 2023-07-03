import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { useEffect } from 'react';
import '../Carousel/styles.css';

const slides = [
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687913749/Carousel/1413018-am5-ryzen-1260x709_cg6ope.webp",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687913765/Carousel/primary-16-9-i9-image2-1920x1080.png.rendition.intel.web.1648.927_ruwshm.png",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687917053/Carousel/nvidia-4k-uhd-z5b46qgjllvoaaak_igakl5.webp",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687917255/Carousel/wallpaperflare.com_wallpaper_2_nf1a8y.jpg",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687917404/Carousel/1191501_srtnxv.jpg",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687917581/Carousel/550_qjybmp.jpg",
  "https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687917875/Carousel/1184332_frnvfq.png",
  // "https://i.postimg.cc/JhK81QJw/marcus-p-o-UBjd22g-F6w-unsplash.jpg",
];

const Carousel = () => {
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      swiper.slideNext();
    }, 3000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, []);

  let swiper;

  return (
    <div className='containerSwiper'>
      <Swiper
        grabCursor
        centeredSlides
        slidesPerView='auto'
        effect='coverflow'
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        onSwiper={(s) => (swiper = s)}
      >
        <div className='swiper-wrapper'>
          {slides.map((slide) => (
            <SwiperSlide
              key={slide}
              style={{
                backgroundImage: `url(${slide})`,
              }}
            />
          ))}
        </div>
        <div className='swiper-pagination'></div>
      </Swiper>
    </div>
  );
};

export default Carousel;
