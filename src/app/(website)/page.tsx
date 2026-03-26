import Banner from "@/features/Home/component/Banner";
import HowItWorks from "@/features/Home/component/HowItWorks";
import MeetSecondSight from "@/features/Home/component/MeetSecondSight";
import Strategic from "@/features/Home/component/Strategic";
export default function page() {
  return (
    <div className="">
      <Banner />
      <Strategic />
      <MeetSecondSight />
      <HowItWorks />
    </div>
  );
}
