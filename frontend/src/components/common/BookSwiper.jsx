import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../components/common/swiperStyles.css';
import { useState } from 'react';

import tw, { styled } from 'twin.macro';

const ImgWrapper = styled.div`
  ${tw`w-fit h-fit`}
`;

// SwiperCore.use([Navigation, Pagination]);

export default function BookSwiper({ width, height }) {
  const [books, setBooks] = useState([]);

  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((response) => response.json())
    .then((json) => {
      setBooks(json.slice(0, 50));
    });
  return (
    <Swiper
      effect={'coverflow'}
      centeredSlides={true}
      grabCursor={true}
      slidesPerView={3}
      scrollbar={{ draggable: true }}
      modules={[Autoplay, EffectCoverflow, Navigation]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 10, // 회전각도
        stretch: 0,
        depth: 100, // 깊이감도
        modifier: 2, //
        slideShadows: true, //선택한 부분 밝게 나머지는 그늘지게 해준다.
      }}
      style={{
        width: '80%',
      }}
    >
      <div>
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <ImgWrapper>
              <img
                src={book.url}
                alt=""
                style={{
                  borderRadius: 10,
                }}
              />
            </ImgWrapper>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}
