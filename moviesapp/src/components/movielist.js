import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import BarChart from "./BarChart";

function MovieList () {
    const [movies,setMovies] = useState([]);
    const [selected,setSelected] = useState({});
    const userLang = navigator.language || navigator.userLanguage;
    const url = userLang.includes("es")?
        "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json"
        :"https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";

    useEffect(()=>{
        if (navigator.onLine) {
            fetch(url)
            .then(res=>res.json())
            .then(res=>{
                setMovies(res);
                localStorage.setItem("movies",JSON.stringify(res));
            });
        } else if (localStorage.getItem("movies")!==null) {
            setMovies(JSON.parse(localStorage.getItem("movies")));
        }
    },[url])

    return (
        <>
            <nav className="navbar navbar-light bg-info">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <img src="https://imgur.com/CQ02gQ7.png" alt="" width="30" height="24" className="d-inline-block align-text-top" referrerpolicy="no-referrer"/>
                        <FormattedMessage id="Movies"/>
                    </span>
                </div>
            </nav>
            <main className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 mt-3">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col"><FormattedMessage id="Name"/></th>
                                <th scope="col"><FormattedMessage id="Directed"/></th>
                                <th scope="col"><FormattedMessage id="Country"/></th>
                                <th scope="col"><FormattedMessage id="Budget"/></th>
                                <th scope="col"><FormattedMessage id="Release"/></th>
                                <th scope="col"><FormattedMessage id="Views"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((item)=>(
                                    <tr key={item.id} onClick={()=>setSelected(item)}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.directedBy}</td>
                                        <td>{item.country}</td>
                                        <td>{item.budget}</td>
                                        <td>{item.releaseDate}</td>
                                        <td>{item.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {Object.keys(selected).length !== 0 &&
                        <div className="col">
                            <div className="card">
                                <img src={selected.poster} className="card-img-top" alt="..." referrerpolicy="no-referrer"/>
                                <div className="card-body">
                                    <h5 className="card-title">{selected.name}</h5>
                                    <p className="card-text">{selected.description}</p>
                                    <p className="card-text fw-bold"><FormattedMessage id="Cast"/>: {selected.cast}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row d-flex justify-content-center">
                    <BarChart data={movies} />
                </div>
            </main>
        </>
    );
}

export default MovieList;