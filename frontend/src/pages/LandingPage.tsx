import Container from "../components/landing-page/Container";
import LandingHeader from "../components/landing-page/LandingHeader";
import LandingHero from "../components/landing-page/LandingHero";

const LandingPage = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <div>
          <Container>USPs</Container>
        </div>
        <div>
          <Container>3 col layout</Container>
        </div>
        <div>
          <Container>Carousel with posters</Container>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
