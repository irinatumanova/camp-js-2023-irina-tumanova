import { FC, memo } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Link, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { Login } from '@js-camp/core/models/auth/login';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';

import { selectUser } from '@js-camp/react/store/user/selectors';

import styles from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';

import { validationSchema } from './LoginPage.settings';

/** Login page component. */
const LoginPageComponent: FC = () => {
	/** Auth is loading. */
	const isLoading = useAppSelector(selectIsAuthLoading);

	/** Current user. */
	const user = useAppSelector(selectUser);

	/** Auth error. */
	const error = useAppSelector(selectAuthError);

	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>({ resolver: zodResolver(validationSchema) });

	/**
	 * On submit.
	 * @param credentials Login credentials.
	 */
	const onSubmit = (credentials: Login) => {
		dispatch(AuthDispatcher.login(credentials));
	};

	/** Reset auth. */
	const reset = () => {
		dispatch(AuthDispatcher.reset);
	};

	if (user !== null) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className={`${styles.auth}`}>
			{isLoading && <AppShadowLoader />}

			<form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h2" className={styles['auth-form__title']}>
					Sign in
				</Typography>

				{error !== undefined && <Alert severity="error">{error?.errors.common}</Alert>}
				<TextField
					id="email"
					autoComplete="email"
					error={errors.email !== undefined}
					helperText={errors.email?.message as string}
					label="Email"
					required
					variant="outlined"
					{...register('email')}
				/>
				<PasswordField
					name="password"
					label="Password"
					register={register}
					autocomplete="current-password"
					error={errors.password}
				/>
				<Button variant="contained" className={styles['auth-form__submit']} type="submit">
					Submit
				</Button>
				<Link component={NavLink} to="/auth/registration" onClick={reset} className={styles['auth-form__auth-change']}>
					Sign up
				</Link>
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
