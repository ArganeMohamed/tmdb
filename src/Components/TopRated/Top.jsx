import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Rated.module.css";
export const Rated = () => {

    const [result, setResult] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("https://api.themoviedb.org/3/tv/top_rated", {
                    params: {
                        api_key: "9795c4abe32f9c4f2f45ab7a288f9aaa",
                        page: 1
                    }
                }).then((res) => {
                    setResult(res.data.results);
                })
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [])

    
    return (
        <div>
            <h3>Our Top Rated 20 Series</h3>
            <div className={style.allMovies}>
                {result.map((r, i) => {
                    return (
                        <div className={style.rated} key={i} onClick={() => nav(`/unique/${r.id}`)}>
                            <img src={`https://image.tmdb.org/t/p/original/${r.poster_path}?api_key=9795c4abe32f9c4f2f45ab7a288f9aaa`} alt="" />
                            <h3 className={style.title}>{r.name}</h3>
                            <p className={style.desc}>{r.overview}</p>
                            <div className={style.flag}>
                                {r.origin_country.map((c, i) => {
                                    return <img className={style} src={`https://flagsapi.com/${c}/flat/64.png`} alt='' key={i} />
                                })}
                            </div>
                            <b className={style.icon}>{(r.vote_average).toFixed(1)}</b>    
                        </div>
                    )
                })}
            </div>
        </div>
    )
}