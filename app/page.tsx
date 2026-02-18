import HomeClient from "./utils/HomeClient";
import { getProfiles } from "@/app/lib/profile";

export default async function Home() {
  const data = await getProfiles();

  return (
    <HomeClient
      initialUsers={data.users}
      totalUsers={data.total}
    />
  );
}
