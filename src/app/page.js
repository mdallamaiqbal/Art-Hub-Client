
import { getAllArts } from "@/lib/api/arts";
import ArtShowcase from "./components/ArtShowcase";
import HeroBanner from "./components/HeroBanner";
import TopArtists from "./components/TopArtist";
import { getTopArtists } from "@/lib/api/topArtist";

export default async function Home() {
  const arts = await getAllArts();
  
  // const artists = await getTopArtists()
  // console.log(artists)
  return (
    <div>
     <HeroBanner />
     <ArtShowcase arts={arts} />
     {/* <TopArtists artists={artists} /> */}
    </div>
  );
}
