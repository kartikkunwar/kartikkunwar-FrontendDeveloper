import { Box, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export const Banner = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:7500/launc")
            .then(res => setData(res.data.kartik))
            .catch(err => console.log(err))
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };

    return (
        <Box w="100%" h='200px' display='flex'>
            <Slider {...settings} w="100%">
                {
                    data.length && data?.map((el, index) => {
                        return (
                            <Box w='100%' >
                            <Image src={el.links.mission_patch} alt="hi" className="image" key={index} w="100%"/>
                            </Box>
                        )
                    })
                }
            </Slider>
        </Box>
    )
}

