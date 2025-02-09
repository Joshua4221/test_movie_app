export interface MovieDetailsType {
  id?: number;
  title: string;
  genres: string[];
  imageSource: string;
  item: any;
}

export interface MovieCategoryListContentType {
  id?: number;
  name: string;
  colors: string[];
}

export type MovieListType = { list?: MovieDetailsType[] };

export type MovieCategoryListType = { list?: MovieCategoryListContentType[] };

export type MovieComponentType = {
  list?: MovieDetailsType[];
  title: string;
  height?: number;
  category?: boolean;
  list_category?: MovieCategoryListContentType[];
};
