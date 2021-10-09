export const MovieItem = ({ movie }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
      }}
    >
      <img
        alt={movie.Title}
        style={{
          width: 80,
          height: 80,
        }}
        src={
          movie.Poster === "N/A"
            ? "https://image.shutterstock.com/image-vector/picture-vector-icon-image-symbol-600w-1671414298.jpg"
            : movie.Poster
        }
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>
          {movie.Title} {movie.Year}
        </p>
      </div>
    </div>
  );
};
