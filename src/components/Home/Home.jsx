import React, { useEffect, useState } from "react";
import MainBanner from "./MainBanner";
import SliderContainer from "./ProductTagSlider/SliderContainer";
import CategorySlider from "./CategorySlider";
import BestOffer from "./BestOffer";
import DealOfTheDay from "./DealOfTheDay";
import OurProduct from "./OurProduct";
import OfferBanner from "./OfferBanner";
import TryNewProductBanner from "./TryNewProductBanner";
import TopProduct from "./TopProduct";
import Blogs from "./Blogs";
import NewsLetter from "./NewsLetter";
import QuickViewModel from "./QuickViewModal";

const Home = () => {

  //********** Modal Popup code start *************
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showQuickView = (productId) => {
    setSelectedProductId(productId);
  };
  //********** Modal Popup code End *************

  useEffect(() => {
    document.title = "Home Page | Zordik";
  }, []);

  return (
    <>
      <MainBanner/>
      <CategorySlider/>
    <BestOffer/>
        <DealOfTheDay/>
      <OurProduct showQuickView={showQuickView} />
      <OfferBanner/>
       <SliderContainer showQuickView={showQuickView}/>
      <TryNewProductBanner/>
      <TopProduct showQuickView={showQuickView} /> 
      <Blogs/>
      <NewsLetter/>
      <QuickViewModel selectedProductId={selectedProductId} />
    </>
  );
};

export default Home;
