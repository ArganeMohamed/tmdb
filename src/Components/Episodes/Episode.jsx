import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import style from "./Episode.module.css";

export const Episode = () => {

    const [tv, setTv] = useState({});
    const { name, season, ep } = useParams();
    const location = useLocation();
    
    useEffect(() => {
        const getEpisode = async () => {
            const episode = await axios.get(`https://api.themoviedb.org/3/tv/${name}/season/${season}/episode/${ep}`, {
                params: {
                    api_key : "9795c4abe32f9c4f2f45ab7a288f9aaa"
                }
            })
            setTv(episode.data)
            console.log(episode.data)
        }
        getEpisode();
    }, [])

    return (
        <div className={style.allEpisode}>
            <h1 className={style.firstHeader}>{location.state.title} Season {tv.season_number} Episode {tv.episode_number}</h1>
            <div className={style.EpisodeContainer}>
                <div className={style.imgCon}>
                    <img src={`https://image.tmdb.org/t/p/original/${location.state.img}`} alt="" />
                    <p>{ tv.vote_average ? (tv.vote_average).toFixed(1) : "" }</p>
                </div>
                <div className={style.episodeDetails}>
                    <h1 className={style.lastHeader}>{location.state.title} Season {tv.season_number} Episode {tv.episode_number}</h1>
                    <div>
                        <b>Description</b>
                        <p>{tv.overview}</p>
                    </div>
                    <div>
                        <b>Episode Name : </b>
                        <span>{tv.name} min</span>
                    </div>
                    <div>
                        <b>Episode Time : </b>
                        <span>{tv.runtime} min</span>
                    </div>
                    <div>
                        <b>Released Date : </b>
                        <span>{tv.air_date}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}