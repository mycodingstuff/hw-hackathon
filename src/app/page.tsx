import { NextPage } from "next";
import { StatsCard } from "../components/StatsCards";
import { ChatBox } from "../components/ChatBox";
import { CookieSettings } from "../components/CookieSettings";
import { PaymentMethod } from "../components/PaymentMethod";
import { AlignBaselineIcon } from "@radix-ui/react-icons";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        title="Total Revenue"
        value="$15,231.89"
        trend="+20% from last month"
        icon={AlignBaselineIcon}
      />
      <StatsCard
        title="Subscriptions"
        value="+2350"
        trend="+10% from last month"
        icon={AlignBaselineIcon}
      />
      <ChatBox />
      <CookieSettings />
      <PaymentMethod />
      {/* Add more components to complete the layout */}
    </div>
  );
};

export default Home;
