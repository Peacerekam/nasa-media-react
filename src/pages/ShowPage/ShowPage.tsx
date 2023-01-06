import { useParams } from "react-router-dom";
import { Spinner } from "../../components";
import { useFetchImages } from "../../hooks/useFetchImages/useFetchImages";
import { NasaData, NasaLink } from "../../types/NasaTypes";
import "./style.scss";

export const ShowPage = () => {
  const { nasaId } = useParams();

  const { data, isLoading, isFetching } = useFetchImages({
    nasaId,
  });

  // The page should contain the details of the collection:
  // title,
  // location,
  // photographer's name,
  // description,
  // keywords,
  // date,
  // and images from the collection.

  const displayElement = (element: NasaData) => {
    const {
      nasa_id,
      title,
      photographer,
      date_created,
      description,
      location,
      keywords,
    } = element;

    const formattedData = new Date(date_created).toLocaleDateString("en-GB");

    const keywordPills =
      keywords?.map((keyword) => (
        <div key={keyword} className="pill">
          {keyword}
        </div>
      )) || "---";

    return (
      <div key={nasa_id} className="details-wrapper">
        <table className="metadata-table">
          <thead>
            <tr>
              <th colSpan={2}>{title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Location: </td>
              <td>{location || "---"}</td>
            </tr>
            <tr>
              <td>Photographer: </td>
              <td>{photographer || "---"}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{formattedData || "---"}</td>
            </tr>
            <tr>
              <td>Keywords:</td>
              <td className="pills-wrapper">{keywordPills || "---"}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  "---"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const displayImage = (element: NasaLink) => {
    return (
      <img
        key={element.href}
        alt={element.prompt}
        className="display-image"
        src={element.href}
      />
    );
  };

  const showSpinner = isFetching || isLoading;

  return (
    <div className="show-page-wrapper">
      {showSpinner && (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      )}

      <div>
        {data?.collection?.items.map((item, index) => (
          <div key={`img-${nasaId}-${index}`}>{item.links.map(displayImage)}</div>
        ))}
      </div>
      <div>
        {data?.collection?.items.map((item, index) => (
          <div key={`element-${nasaId}-${index}`}>{item.data.map(displayElement)}</div>
        ))}
      </div>
    </div>
  );
};
