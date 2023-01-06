import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../../App";
import { NasaResponse } from "../../types/NasaTypes";

type UseImagesHookProps = {
  nasaId?: string;
  search?: string;
  page?: number;
  yearStart?: number;
  yearEnd?: number;
};

export const useFetchImages = ({
  nasaId,
  search,
  page,
  yearStart,
  yearEnd,
}: UseImagesHookProps) => {
  const fetchImages = async () => {
    if (!search && !nasaId) return null;

    // const detailsURL = `${API_URL}/asset/${id}`;
    const searchURL = `${API_URL}/search`;
    const params = {
      q: search,
      page,
      media_type: "image",
      year_start: yearStart,
      year_end: yearEnd,
      nasa_id: nasaId,
    };

    const { data } = await axios.get<NasaResponse>(searchURL, { params });
    const nextPage = data.collection.links?.find(
      (link) => link.rel === "next"
    )?.href;
    // const previousPage = links.find((link) => link.rel === "prev")?.href;

    return {
      collection: data.collection,
      nextPage,
    };
  };

  return useQuery({
    queryKey: ["nasa-images", page, search, yearStart, yearEnd, nasaId],
    queryFn: fetchImages,
    keepPreviousData: true,
  });
};
