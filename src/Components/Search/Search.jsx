import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noImage from "../../Img/NoImage.jpg";
import { Rated } from "../TopRated/Top.jsx";
import style from './Search.module.css';
export const Search = () => {

    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1)
    const [totalP, setTotalP] = useState(0);

    const nav = useNavigate();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSearch = (p = page) => {
        axios.get("https://api.themoviedb.org/3/search/tv", {
            params: {
                api_key: "9795c4abe32f9c4f2f45ab7a288f9aaa",
                query: input,
                page: p
            }
        }).then((res) => {
            setResult(res.data.results);
            console.log(res.data.results);
            setTotalP(res.data.total_pages);
        })
    }

    const nextPage = () => {
        if (page < totalP) {
            const npage = page + 1;
            setPage(npage);
            handleSearch(npage);
        }
    }

    const prevPage = () => {
        if (page > 1) {
            const npage = page - 1
            setPage(npage)
            handleSearch(npage);
        }
    }

    const singleM = (id) => {
        nav(`/unique/${id}`);
    }

    return (
        <div >
            <div className={style.search}>
                <input type='text' className={style.searchInp} onChange={e => handleChange(e)} placeholder='Search...' />
                <button className={style.btnSearch} onClick={() => { handleSearch(1); setPage(1) }}>Search</button>
            </div>

            {
                result.length > 0 ?
                <div className={style.MoviesSeaction}>
                    <div className={style.PagCon}>
                        <div className={ style.pagination }>
                            <button onClick={() => prevPage()} className={page === 1 ? style.limit : ""}><i className="fa-solid fa-caret-left"></i></button>        
                            <b className={style.pNum}>{page}/{ totalP }</b>        
                            <button onClick={() => nextPage()} className={page === totalP ? style.limit : ""}><i className="fa-solid fa-caret-right"></i></button>        
                        </div> 
                    </div>   
                    <div className={style.movies }>
                        {result.map((movie, index) => {
                            return (
                                <div className={style.movie} key={`${index}-${page}-${input}`} onClick={() => singleM(movie.id)}>
                                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noImage } alt="" width="100" />
                                    <h3 className={ style.title }>{movie.name}</h3>
                                    <p className={style.desc}>{movie.overview ? movie.overview : <p style={{marginTop:"25px", fontSize:"25px"}}>No overview available...</p>}</p>
                                    <div className={style.flag}>
                                        {movie.origin_country.map((c, i) => {
                                            return <img className={style} src={`https://flagsapi.com/${c}/flat/64.png`} alt='' key={i} />
                                        })}
                                    </div>
                                    <b className={style.icon}>{(movie.vote_average).toFixed(1)}</b>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :  <Rated />     
            }
        </div>
    )
}