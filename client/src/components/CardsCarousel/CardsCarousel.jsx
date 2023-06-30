import { useGetProductsQuery } from '@/src/redux/services/productApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import Card from '../Card/Card';


export default function CardsCarousel() {
    const { data, error, isLoading, isFetching, refetch } =
    useGetProductsQuery();
    const apiProductos = data || [];
    const items = [ ...apiProductos ];

    useEffect(() => {
		refetch();
	}, []);

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

    const cardsShow = 10;
    const cards = items.slice(0, cardsShow);

    const sliderSettings = {
        arrows: true,
        dots: true,
        centerMode: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true
      };

    return(
        <Slider {...sliderSettings}>
            {cards.map((item) => (
                <div key={item.id || item._id}>
                    <Card item={item} />
                </div>
            ))}
        </Slider>
    )
}
