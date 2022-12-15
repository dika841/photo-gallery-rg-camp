import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [url, setUrl] = useState(
    "https://gallery-app-server.vercel.app/photos"
  );
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = async (id) => {
    await fetch(url + `/${id}`, {
      method: "DELETE",
    });
    const response = await fetch(url);
    const results = await response.json();
    setPhotos(results.filter((photo) => photo.id !== 10));
  };

  const getPhotos = async () => {
    const response = await fetch(url);
    const results = await response.json();
    setPhotos(results);
    results.error && setError(results.error);
  };

  useEffect(() => {
    setLoading(true);
    getPhotos();
    setLoading(false);
  }, [sort, submited]);

  if (error)
    return (
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        Error!
      </h1>
    );

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setUrl(url + `/?_sort=id&_order=${e.target.value}`);
            }}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
              setUrl(url + `/?q=${search}`);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
