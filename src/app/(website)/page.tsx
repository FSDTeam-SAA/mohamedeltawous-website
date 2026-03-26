import Banner from "@/features/Home/component/Banner";
import HowItWorks from "@/features/Home/component/HowItWorks";
import MeetSecondSight from "@/features/Home/component/MeetSecondSight";
import StartExploring from "@/features/Home/component/StartExploring";
import Strategic from "@/features/Home/component/Strategic";
import StrategicDecisions from "@/features/Home/component/StrategicDecisions";
export default function page() {
  return (
    <div className="">
      <Banner />
      <Strategic />
      <MeetSecondSight />
      <HowItWorks />
      <StrategicDecisions />
      <StartExploring />
    </div>
  );
}
