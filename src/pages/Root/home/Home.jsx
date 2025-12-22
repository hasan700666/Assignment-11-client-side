import React from "react";
import Slider from "./Slider";
import HomeIssues from "./HomeIssues";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import ImpactStats from "./ImpactStats";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <HomeIssues></HomeIssues>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <ImpactStats></ImpactStats>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;
