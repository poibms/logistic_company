import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button/Button";
import Container from "../common/Container/Container";
import ImageSliderItem from "../common/ImageSliderItem/ImageSliderItem";
// import News from '../common/News/News';
import NewsList from "../common/NewsList/NewsList";
import Slider from "../common/Slider/Slider";
import TextSliderItem from "../common/TextSliderItem/TextSliderItem";
import text from "../../assets/text/textSlider.json";
import cargoType from "../../assets/imageSlider/cargoTypes.json";
import trucksType from "../../assets/imageSlider/trucksTypes.json";
import sertificatesData from "../../assets/imageSlider/sertificates.json";
import { SliderType } from "../../types/slider";
import SearchOrder from "../common/SearchOrder/SearchOrder";
import DynamicTabs from "../ui/TabsContainer/TabsContainer";
import CalculateOrder from "../common/CalculateOrder/CalculateOrder";
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

const MainPage = () => {
  const [cities, setCities] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://mainapi.nrg-tk.ru/v3/cities?lang=ru", {
        headers: {
          "NrgApi-DevToken":
            "MMGPa7NQ2HwhiHCwDnuQqIWZFJnPYrbX8vBap8StkkrMChvLHiv7OEttx5QFy2kK",
        },
      })
      .then((data) => citiesHandler(data.data.cityList));
  }, []);

  const citiesHandler = (cityList: any) => {
    const filteredArray = cityList.filter((obj: any) =>
      obj.name.includes("BY")
    );
    // const citiesName = cityList.filter((item: any) => item.parentId === -1);
    setCities(filteredArray);
    setIsLoading(false);
  };

  const SliderGen = (sliderData: any, sliderType: SliderType) => {
    if (sliderType === "text") {
      return (
        <Slider className={"main_slider"}>
          {sliderData.data.map((item: any) => (
            <TextSliderItem title={item.title} subtitle={item.subtitle} />
          ))}
        </Slider>
      );
    } else {
      return (
        <Slider className={"main_slider"}>
          {sliderData.data.map((item: any) => (
            <ImageSliderItem image={item.image} text={item.text} />
          ))}
        </Slider>
      );
    }
  };

  const TextSlider = SliderGen(text, SliderType.TEXT);
  const ImageSlider = SliderGen(cargoType, SliderType.IMAGE);
  const TrucksSloder = SliderGen(trucksType, SliderType.IMAGE);
  const SertificatesSlider = SliderGen(sertificatesData, SliderType.IMAGE);
  return (
    <main className="main">
      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <>
          <section className="main_wrapper mg-btm-70">
            <img
              className="main_wrapper-img"
              src="https://jenty-spedition.ru/wp-content/uploads/2021/04/panorama_bez_nazvaniya-2-scaled.jpg"
              alt="a"
            />
          </section>
          <Container className="mg-btm-70">
            <DynamicTabs
              tabNames={["Get by Track Code", "Calculator"]}
              tabComponents={[
                <SearchOrder />,
                <CalculateOrder cities={cities} />,
              ]}
            />
          </Container>
          <Container className={"mg-btm-70"}>
            <h1 className="main_title">Transportation Types</h1>
            {ImageSlider}
          </Container>
          <Container>
            <h1 className="main_title">Advantages</h1>
          </Container>
          <section className="main_wrapper h-500 mg-btm-70">
            <img
              className="main_wrapper-img"
              src="https://www.iveco.com/netherlands/PublishingImages/Jost%20Group_IVECO%20fleet%20(1600x1115)%20-%20kopie.jpg"
              alt="a"
            />
          </section>

          <Container className={"mg-btm-70"}>{TextSlider}</Container>

          <Container>
            <h1 className="main_title">Our fleet</h1>
          </Container>
          <section className="main_wrapper h-500 mg-btm-70">
            <img
              className="main_wrapper-img"
              src="https://jenty-spedition.ru/wp-content/uploads/2020/11/2.jpg"
              alt="a"
            />
            ƒ
          </section>

          <Container className={"mg-btm-70"}>{TrucksSloder}</Container>
          <Container className={"mg-btm-70"}>
            <h1 className="main_title">Сertificates</h1>

            {SertificatesSlider}
          </Container>
        </>
      )}
    </main>
  );
};

export default MainPage;
