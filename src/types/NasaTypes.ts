export type NasaMediaType = "image" | "no idea" | "something else";

export type NasaLink = {
  rel: "prev" | "next" | "preview";
  href: string;
  prompt?: string;
  render?: NasaMediaType;
};

export type NasaData = {
  center: string;
  title: string;
  nasa_id: string;
  date_created: string;
  keywords: string[];
  media_type: NasaMediaType;
  description: string;
  description_508: string;
  photographer?: string;
  secondary_creator?: string;
  location?: string;
};

export type NasaItem = {
  href: string;
  data: NasaData[];
  links: NasaLink[];
};

export type NasaCollection = {
  version: string;
  href: string;
  metadata: {
    total_hits: number;
  };
  links: NasaLink[];
  items: NasaItem[];
};

export type NasaResponse = {
  collection: NasaCollection;
};
