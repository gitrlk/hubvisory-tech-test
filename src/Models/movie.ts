import { Actor } from "./actor";

export class Movie {
  id: number;
  title: string;
  posterPath: string;
  actor: Actor;
  castIdList: number[];
  constructor(
    id = 0,
    title = "",
    castIdList = [],
    actor = new Actor(),
    posterPath = "",
  ) {
    this.id = id;
    this.title = title;
    this.castIdList = castIdList;
    this.actor = actor;
    this.posterPath = posterPath;
  }
}
