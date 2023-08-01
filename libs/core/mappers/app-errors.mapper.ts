import { HttpErrorDto } from '../dtos/http-error.dto';
import { APP_COMMON_ERRORS_KEY, AppError } from '../models/app-error';

export namespace AppErrorsMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Http error DTO.
	 */
	export function fromDto(dto: HttpErrorDto[]): AppError<Error> {
		const appError: AppError<Error> = new AppError({ name: 'app-error', message: 'app-error', errors: { common: [] } });

		dto.forEach(httpError => {
			const appErrorItem: Error = { name: httpError.code, message: httpError.detail };
			const appErrorKey = httpError.attr === null ? APP_COMMON_ERRORS_KEY : httpError.attr;

			appError.errors[appErrorKey] = [...appError.errors[APP_COMMON_ERRORS_KEY], appErrorItem];
		});

		return appError;
	}
}
