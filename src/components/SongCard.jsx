import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch=useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true))
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 backdrop-blur-none cursor-pointer animate-slideup bg-opacity-80 rounded-lg">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 justify-center items-center group-hover:flex ${
            activeSong.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song?.images?.coverart} alt="cover_Image" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg truncate">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className="mt-1 text-sm truncate">
          <Link
            to={
              song.artists
                ? `/artists/${song.artists[0].adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
