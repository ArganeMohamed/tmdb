import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noPhoto from "../../Img/noPhoto.jpg";
import style from "./Single.module.css";



export const Single = () => {

    const [tv, setTv] = useState({});
    const [video, setVideo] = useState([]);
    const [link, setLink] = useState(null);
    const params = useParams();
    const nav = useNavigate();
    
    useEffect(() => {
        const id = params.name;
        const getSingleTv = async () => {
            try {
                
                const getTvShow = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                    params: {
                        api_key: "9795c4abe32f9c4f2f45ab7a288f9aaa",
                    }
                })
                setTv(getTvShow.data);

                const getVideo = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, {
                    params: {
                        api_key: "9795c4abe32f9c4f2f45ab7a288f9aaa",
                    }
                });
                setVideo(getVideo.data.results);
            } catch (err) {
                console.log(err);
            }
        }
        getSingleTv();
    }, [params.name]);

    useEffect(() => {

        if (video && video.length > 0) {

            const site = video[0].site;
            const key = video[0].key;
            
            if (site === "YouTube" && key) {
                const vLink = `https://www.youtube.com/embed/${key}`;
                setLink(vLink);
            } else if (site === "Vimeo" && key) {
                const vLink = `https://player.vimeo.com/video/${key}`;
                setLink(vLink);
            } else if (site === "Dailymotion" && key) {
                const vLink = `https://www.dailymotion.com/embed/video/${key}`;
                setLink(vLink);
            } else if (site === "Twitch" && key) {
                const vLink = `https://player.twitch.tv/?video=${key}&autoplay=false`;
                setLink(vLink);
            } else if (site === "Facebook" && key) {
                const vLink = `https://www.facebook.com/v2.0/plugins/video.php?href=https://www.facebook.com/${key}`;
                setLink(vLink);
            } else if (site === "Vevo" && key) {
                const vLink = `https://www.vevo.com/watch/${key}`;
                setLink(vLink);
            } else if (site === "Spike" && key) {
                const vLink = `https://www.spike.com/video/${key}`;
                setLink(vLink);
            } else if (site === "Yahoo" && key) {
                const vLink = `https://video.yahoo.com/${key}`;
                setLink(vLink);
            } else if (site === "Metacafe" && key) {
                const vLink = `https://www.metacafe.com/embed/${key}`;
                setLink(vLink);
            } else if (site === "Roku" && key) {
                const vLink = `https://www.roku.com/video/${key}`;
                setLink(vLink);
            } else if (site === "Vudu" && key) {
                const vLink = `https://www.vudu.com/content/movies/details/${key}`;
                setLink(vLink);
            } else if (site === "FandangoNOW" && key) {
                const vLink = `https://www.fandangonow.com/details/movie/${key}`;
                setLink(vLink);
            } else {
                setLink(null);
            }

        }
    }, [video]);

    const navSeason = (id, season) => {
        nav(`/unique/${id}/season/${season}`, { state : tv.name ? tv.name : null  });
    }

    return (
        <div className={style.tvDetails}>
            {
                tv ? <div>
                <div className={style.singleTV}> 
                    <div className={style.imgCon}>
                        <img className={style.poster} src={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : noPhoto} alt="" />
                        <img className={style.flag} src={tv.origin_country ? `https://flagsapi.com/${tv.origin_country}/flat/64.png` : "" } alt="" />
                        <p className={style.vote}>{ tv.vote_average ? (tv.vote_average).toFixed(1) : "" }</p>
                    </div>
                    <div className={style.showDet}>
                        <h1 className={style.title}>{tv.name}</h1>

                        <p className={style.key}>Description : </p>
                        <p className={style.value} id={style.desc}>{tv.overview}</p>

                        <p className={style.date}>
                            <span className={style.key}>Release date : </span>
                            <span className={style.value }>{tv.first_air_date} to {tv.last_air_date ? tv.last_air_date : "Present"}</span>
                        </p>

                        <p className={style.genre}>
                            <span className={style.key}>Genre : </span>
                            <span className={style.value}>
                                {tv.genres ? tv.genres.map((g, i) => {
                                    return (<span key={i}> {g.name } , </span>)
                                }) : ""}
                            </span>
                        </p>

                        <p className={style.languages}>
                            <span className={style.key}> Languages : </span>
                            <span className={style.value}>
                                {tv.spoken_languages ? tv.spoken_languages.map((l, i) => {
                                    return (<span key={i}> {l.english_name } , </span>)
                                }) : ""}
                            </span>
                        </p>

                        <p className={style.nbrSea}>
                            <span className={style.key}> Number of seasons : </span>
                            <span className={style.value}>
                                {tv.number_of_seasons}
                            </span>
                        </p>
                        
                        <p className={style.nbrEp}>
                            <span className={style.key}> Total Episodes : </span>
                            <span className={style.value}>
                                {tv.number_of_episodes}
                            </span>
                        </p>
                        
                        <p className={style.status}>
                            <span className={style.key}> Status : </span>
                            <span className={style.value}>
                                {tv.status}
                            </span>
                        </p>
                    </div>
                </div>
                
                <div className={style.video}>
                    {link ? 
                        <div className={style.videoContainer}>
                                <h2>{video[0].type}</h2>
                                <iframe width="560" height="315" src={link ? link : ""} title={tv.name} frameBorder="0" allowFullScreen></iframe>
                        </div>
                        : <h1>No video Available</h1>   
                    }   
                </div>

                <div className={style.seasonsSection}>
                    <h2>All {tv.number_of_seasons} Seasons</h2>
                    <div className={style.seasons}>
                        {
                            tv.seasons ? 
                                tv.seasons.map((s, i) => {
                                    return (
                                        s.season_number !== 0 ?
                                            <div key={i} className={style.season} onClick={() => navSeason(tv.id, s.season_number) }>
                                                <img src={ s.poster_path ? `https://image.tmdb.org/t/p/w500/${s.poster_path}` : noPhoto} alt="" />
                                                <b className={style.seasonName}>{ s.name }</b>
                                                <p className={style.sDate}>{ s.air_date }</p>
                                            </div>
                                        : null
                                    )
                                })
                            : <b>No seasons available</b>
                        }
                    </div>
                </div>
            </div> : ""
            }
        </div>
    )
}