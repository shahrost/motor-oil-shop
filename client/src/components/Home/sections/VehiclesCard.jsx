import homeOrbitBrands from "../../../data/homeOrbitBrands";
import useLogoOrbit from "../hooks/useLogoOrbit";
import { dropEllipse } from "../helpers/logoOrbit";
import CarArt from "./CarArt";
import EntryCard from "./EntryCard";
import WheelTitle from "./WheelTitle";
import VehicleTrackDescription from "./VehicleTrackDescription";
import useVehicleWheels from "../hooks/useVehicleWheels";

// کارت ورودی «خودروهای من»: ماشین ثابت وسط و لوگوی برندها دورش می‌چرخن
// قالب و مدار با کارت روغن مشترک است.
function VehiclesCard({ to, title, shortDescription, cta }) {
  const artRef = useLogoOrbit(homeOrbitBrands, dropEllipse);
  const wheelsRef = useVehicleWheels();

  return (
    <EntryCard
      to={to}
      cardRef={wheelsRef}
      title={title}
      description={shortDescription}
      cta={cta}
      titleArt={<WheelTitle title={title} />}
      descriptionArt={<VehicleTrackDescription description={shortDescription} />}
      artRef={artRef}
      art={
        <div data-entry="center" className="relative z-[2] flex h-24 sm:h-40 items-center justify-center">
          <CarArt />
        </div>
      }
    />
  );
}

export default VehiclesCard;
