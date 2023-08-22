import { Genre } from '@js-camp/core/models/genre/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/genre/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre/genre.mapper';
import { ListParamsMapper } from '@js-camp/core/mappers/list-params.mapper';
import { GenreParams } from '@js-camp/core/models/genre/genre-params';
import { GenreFilterParamsMapper } from '@js-camp/core/mappers/genre/genre-filter-params';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {

	/**
	 * Fetches a list of genres.
	 * @param params Genre params.
	 */
	export async function fetchGenres(params: GenreParams): Promise<Genre[]> {
		const { data } = await http.get<PaginationDto<GenreDto>>(url, {
			params: ListParamsMapper.toDto(
				params,
				GenreFilterParamsMapper.toDto,
				field => GenreFilterParamsMapper.GENRE_SORT_FIELD_TO_DTO[field],
			),
		});
		return data.results.map(dto => GenreMapper.fromDto(dto));
	}
}
