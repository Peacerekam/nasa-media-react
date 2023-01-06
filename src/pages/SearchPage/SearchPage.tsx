import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { useFetchImages } from "../../hooks";
import {
  DEFAULT_YEAR_RANGE,
  FancyImage,
  LabeledTwoThumbs,
  Spinner,
} from "../../components";
import "./style.scss";
import { NasaItem } from "../../types/NasaTypes";

export const SearchPage = () => {
  const [page, setPage] = useState<number>(1);
  const [yearsRange, setYearsRange] = useState<number[]>(DEFAULT_YEAR_RANGE);
  const [searchText, setSearchText] = useState<string>();
  const { data, isLoading, isFetching, isPreviousData } = useFetchImages({
    search: searchText,
    page,
    yearStart: yearsRange[0],
    yearEnd: yearsRange[1],
  });

  const debouncedSetSearchText = useCallback(debounce(setSearchText, 350), [
    setSearchText,
  ]);
  const debouncedSetYearsRange = useCallback(debounce(setYearsRange, 350), [
    setYearsRange,
  ]);

  useEffect(() => {
    setPage(1);
  }, [searchText, yearsRange]);

  const handleChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    debouncedSetSearchText(event.target.value);
  };

  const displayPagination = useMemo(() => {
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

    const handleNextPage = () => {
      if (isPreviousData || !data?.nextPage) return;
      setPage((prev) => prev + 1);
    };

    const dataLength = data?.collection.items.length || 0;
    const total = data?.collection.metadata.total_hits || 0;
    const from = page * 100 - 99;
    const to =
      total < 100 ? dataLength : page * 100 < total ? page * 100 : total;

    return (
      <div className="pagination-wrapper">
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={page === 1}>
            {"<"}
          </button>
          {(data?.collection.items.length || 0) > 0 && <button>{page}</button>}
          <button
            onClick={handleNextPage}
            disabled={isPreviousData || !data?.nextPage}
          >
            {">"}
          </button>
        </div>
        <div className="pagination-info">
          showing {from}-{to} out of {total}
        </div>
      </div>
    );
  }, [page, isPreviousData, data]);

  const displayItem = (item: NasaItem) => {
    const formattedData = new Date(
      item.data[0].date_created
    ).toLocaleDateString("en-GB");

    const fancyLabelBottom =
      item.data[0].location === item.data[0].photographer ? (
        <div>{item.data[0].location || item.data[0].photographer}</div>
      ) : (
        <>
          <div>{item.data[0].location}</div>
          {item.data[0].photographer && (
            <div>Author: {item.data[0].photographer}</div>
          )}
        </>
      );
    const itemImages = item?.links
      .filter((link) => link.render === "image")
      .map((img) => (
        <FancyImage
          key={img.href}
          src={img.href}
          alt={item.data[0].title}
          fancyLabel={formattedData}
          fancyLabelBottom={fancyLabelBottom}
        />
      ));

    const itemData = item.data.map((element) => (
      <span className="item-title" key={element.nasa_id}>
        {element.title}
      </span>
    ));

    const nasaId = item.data[0].nasa_id;

    return (
      <Link
        to={`/show/${nasaId}`}
        tabIndex={0}
        className="collection-item"
        key={nasaId}
      >
        <div>{itemImages}</div>
        <div>{itemData}</div>
      </Link>
    );
  };

  const showSpinner = isFetching || isLoading;

  return (
    <div>
      <div className="search-input-wrapper">
        <input placeholder="type here..." onChange={handleChangeSearchText} />
      </div>

      {searchText && (
        <div style={{ margin: 40 }}>
          <LabeledTwoThumbs handleChange={debouncedSetYearsRange} />
        </div>
      )}

      {searchText && displayPagination}

      <div className="search-results">
        {showSpinner && (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        )}

        {data && data.collection.metadata.total_hits !== 0 ? (
          data.collection.items.map(displayItem)
        ) : (
          <div className="no-results">
            {searchText
              ? `No results for "${searchText}"`
              : "No results to show"}
          </div>
        )}
      </div>

      {searchText && displayPagination}
    </div>
  );
};
