import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./Season.module.css";

export const Seasons = () => {

    const params  = useParams();
    const [tv, setTv] = useState({});
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getSeason = async () => {
            try {
                const season = await axios.get(`https://api.themoviedb.org/3/tv/${params.name}/season/${params.season}`, {
                    params: {
                        api_key: "9795c4abe32f9c4f2f45ab7a288f9aaa",
                    }
                })
                setTv(season.data);
                console.log(season.data);
            } catch (err) {
                console.error(err);
            }
        }
        getSeason();
    }, [])

    const navEpisode = (s,e) => {
        nav(`/unique/${params.name}/season/${s}/episode/${e}`, { state: { title : location.state , img : tv.poster_path } })
    }

    return (
        <div className={style.seasonContainer}>
            <h1 className={style.firstHeader}>{location.state ? location.state : ""} : {tv.name}</h1>
            <div className={style.season}>
                <div className={style.poster}>
                    <img src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="" />
                    <p className={style.seasonAvg}>{ tv.vote_average }</p>
                </div>
                <div className={style.seasonDetails}>
                    <h1 className={style.lastHeader}>{location.state ? location.state : ""} : {tv.name}</h1>
                    <div className={style.desc}>
                        <b className={style.key}>Description : </b>
                        <p>{tv.overview}</p>
                    </div>
                    <p className={style.date}>
                        <b className={style.key}>Released Date : </b>
                        <span className={style.value}>{tv.air_date}</span>
                    </p>
                    <p className={style.nbrEp}>
                        <b className={style.key}>Number of Episodes : </b>
                        <span className={style.value}>{tv.episodes ? `${tv.episodes.length} Episodes` : null } </span>
                    </p>
                </div>
            </div>
            <div className={style.episodesContainer}>
                <h1>All { tv.episodes ? tv.episodes.length : "" } Episodes</h1>
                <div className={style.episodes}>
                    {tv.episodes ? tv.episodes.map((e, i) => {
                        return (
                            <div key={i} className={style.episode} onClick={() => navEpisode(e.season_number, e.episode_number)}>
                                <img src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="" />
                                <b className={style.epNum}>Episode : {e.episode_number}</b>
                                <p className={style.epDate}>{e.air_date}</p>
                                <p className={style.epVote}>{ e.vote_average ? (e.vote_average).toFixed(1) : null }</p>
                            </div>
                        )
                    }) : <h3>No episodes for now...</h3>}
                </div>
            </div>
        </div>
    )
}