import type { MetaFunction } from "@remix-run/node";
import Explore from "./explore.$trailId";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Explore />
    </div>
  );
}
