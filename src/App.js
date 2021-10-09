import "./App.css";
import { useCallback, useState } from "react";
import { searchMovies } from "./services/api";
import { MovieItem } from "./components/Movie";

const ITEM_PER_PAGE = 10;

function App() {
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState();
  const [requestError, setRequestError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const search = useCallback(
    async (p) => {
      if (searchText?.length > 0)
        try {
          const data = await searchMovies({
            title: searchText,
            year,
            page: p,
          });

          if (data.Response === "False") setRequestError(data.Error);
          else {
            setResult(data);
            setRequestError("");
          }
        } catch (error) {
          if (error.response) {
            setRequestError(
              error.response.status + " " + error.response.data.Error
            );
          } else {
            setRequestError("Error: ", error.message);
          }
        }
    },
    [searchText, year]
  );

  return (
    <div className="App">
      <div>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") search(1);
          }}
          type="search"
          className="input"
          placeholder="Movie title"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") search(1);
          }}
          type="search"
          className="input-next"
          placeholder="Year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            setCurrentPage(1);
            search(1);
          }}
        >
          Search
        </button>
      </div>
      {result?.Search?.length > 0 && result?.totalResults > ITEM_PER_PAGE && (
        <div className="pagination">
          <button
            style={{ fontSize: 18 }}
            onClick={() => {
              const newPage = currentPage > 1 ? currentPage - 1 : 1;
              search(newPage);
              setCurrentPage(newPage);
            }}
          >
            Back
          </button>
          <div className="number">{currentPage}</div>
          <button
            style={{ fontSize: 18 }}
            onClick={() => {
              const newPage =
                currentPage < Math.ceil(result.totalResults / ITEM_PER_PAGE)
                  ? currentPage + 1
                  : Math.ceil(result.totalResults / ITEM_PER_PAGE);
              search(newPage);
              setCurrentPage(newPage);
            }}
          >
            Next
          </button>
        </div>
      )}
      <div className="list">
        {requestError?.length > 0 && <div>{requestError}</div>}
        {result?.Search?.length > 0 &&
          result?.Search?.map((m) => {
            return <MovieItem movie={m} key={m.imdbID} />;
          })}
      </div>
    </div>
  );
}

export default App;
