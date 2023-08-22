import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { GenreType } from './genre-type';

/** Filters parameters for getting anime. */
export class GenreFilterParams {
	/** Anime types. */
	public readonly types: GenreType[];

	/** Search. */
	public readonly search: string;

	public constructor({ types, search }: InitGenreFilterParams) {
		this.types = types;
		this.search = search;
	}
}

type InitGenreFilterParams = GenreFilterParams;

/** Field to sort by. */
export enum GenreSortingField {
	Name = 'name',
	Type = 'type',
	None = '',
}

/** Request params for getting anime. */
export type GenreParams = ListParams<GenreFilterParams, GenreSortingField>;

export type QueryGenreParams = PaginationParams &
Sorting<GenreSortingField> & {
	search: string;
	types: string;
};
