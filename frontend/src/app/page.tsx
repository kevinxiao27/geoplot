import { MapView } from "@/components/MapComponent/Map";
import fetchBackend from "@/utils/fetchData";
import Auth from "@/components/Auth/Auth";

export default async function Page() {
  const { data: geocaches, count, error } = await fetchBackend({ method: "GET", collection: "geocache" });
  return (
    <>
      <Auth>
        <div className='flex flex-row items-center justify-center text-white p-3 font-700 text-3xl'>GeoPlots</div>
        <MapView geocaches={geocaches} count={count} error={error} />
      </Auth>
    </>
  );
}
