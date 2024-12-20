"use client";

import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; //Todo: Change an API call
  if (!data?.length && query.search) {
    return (
      <EmptySearch/>
    );
  }
  if (!data?.length && query.favorites) {
    return (
      <EmptyFavorites/>
    );
  }
  if (!data?.length) {
    return (
      <EmptyBoards/>
    );
  }
  return <div className="">{JSON.stringify(query)}</div>;
};
