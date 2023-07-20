import { AnimeFilterParamsDto, AnimeSortingFieldDto } from '../dtos/anime-filter-params.dto';
import { AnimeFilterParams, AnimeSortingField } from '../models/anime-params';
import { AnimeType } from '../models/anime';
import { AnimeTypeDto } from '../dtos/anime.dto';

export namespace AnimeFilterParamsMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime query params model.
	 */
	export function toDto(model: AnimeFilterParams): AnimeFilterParamsDto {
		return {
			type: model.type.map(typeDto => ANIME_TYPE_TO_DTO[typeDto]),
			search: model.search,
		};
	}

	/** Anime type transformation object in dto. */
	const ANIME_TYPE_TO_DTO = {
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};

	export const ANIME_SORT_FIELD_TO_DTO = {
		[AnimeSortingField.AiredStart]: AnimeSortingFieldDto.AiredStart,
		[AnimeSortingField.None]: AnimeSortingFieldDto.None,
		[AnimeSortingField.Status]: AnimeSortingFieldDto.Status,
		[AnimeSortingField.TitleEnglish]: AnimeSortingFieldDto.TitleEnglish,
		[AnimeSortingField.TitleJapanese]: AnimeSortingFieldDto.TitleJapanese,
	};
}
