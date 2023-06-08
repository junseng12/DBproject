import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [info, setInfo] = useState();
  // const getMovies = async () => {
  //   const response = await fetch(
  //     "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
  //   );
  //   const json = await response.json();
  //   setMovies(json.data.movies);
  //   setLoading(false);
  // };
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    //json으로 받아온 data를 state에 저장하여 영화 상세 정보 나열
    setInfo(json);
    setLoading(false);
    console.log(json);
  };
  // const image = info.data.movie.genres. ;
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Detailing...</h1>
      ) : (
        <div>
          <div>
            <div>
              <Link to="/">Home</Link>
            </div>
            <h2>Title: {info.data.movie.title}</h2>
          </div>

          <img src={info.data.movie.large_cover_image} alt="" />
          <div>Movie ID: {info.data.movie.id}</div>
          <div>Movie UL: {info.data.movie.date_uploaded} </div>
          <div>Movie GR: {info.data.movie.genres}</div>
        </div>
      )}
    </div>
  );
}
export default Detail;

//Detail 페이지 내 로딩 추가
