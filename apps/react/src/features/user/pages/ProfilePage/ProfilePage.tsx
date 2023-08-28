import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

import { useUserState } from '@js-camp/react/hooks/useUserState';
import { typedMemo } from '@js-camp/react/utils/typedMemo';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { User } from '@js-camp/core/models/user/user';
import { useAppDispatch } from '@js-camp/react/store';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';

import styles from './ProfilePage.module.css';
import { AvatarUpload } from '../../components/AvatarUpload';
import { defaultProfileValues, validationSchema } from './ProfilePage.settings';

/** Profile page component. */
const ProfilePageComponent: FC = () => {
	const { user, isLoading } = useUserState();
	const [isReadOnly, setIsReadOnly] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm({ defaultValues: user ?? defaultProfileValues, resolver: zodResolver(validationSchema) });
	const [image, setImage] = useState<File | null>(null);
	const dispatch = useAppDispatch();

	const onSubmit = (userForm: User): void => {
		dispatch(UserDispatcher.updateCurrentUser({ image, user: userForm }));
		setIsReadOnly(true);
	};

	const toggleIsReadOnly = (): void => {
		setIsReadOnly(value => !value);
	};

	const cancelChanges = (): void => {
		setIsReadOnly(true);
	};

	const changeImage = (newImage: File | null): void => {
		const url = newImage ? URL.createObjectURL(newImage) : null;
		setImage(newImage);
		setValue('avatarUrl', url);
	};

	if (!isLoading && user === null) {
		return <Navigate to="/" />;
	}
	return <Box className={styles.profile}>
		{isLoading && <AppShadowLoader />}
		<Box className={styles.profile__header}>
			<Typography variant="h4">Profile</Typography>
			<Box className={styles.profile__actions}>
				{
					isReadOnly ?
						<Button color="primary" onClick={toggleIsReadOnly}>Edit</Button> :
						<>
							<Button onClick={cancelChanges}>Cancel</Button>
							<Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
								Save
							</Button>
						</>
				}
			</Box>
		</Box>
		<form className={styles.profile__form}>
			<Controller
				name="avatarUrl"
				control={control}
				render={({ field }) =>
					<AvatarUpload
						imageUrl={field.value}
						className={styles.profile__avatar}
						disable={isReadOnly}
						changeImage={changeImage} />}
			/>
			<TextField
				className={isReadOnly ? styles.profile__field_readonly : ''}
				InputProps={{ readOnly: isReadOnly }}
				id="firstName"
				required
				autoComplete="given-name"
				error={errors.firstName !== undefined}
				helperText={errors.firstName?.message ?? ''}
				label="First name"
				variant="standard"
				{...register('firstName')}/>
			<TextField
				className={isReadOnly ? styles.profile__field_readonly : ''}
				id="lastName"
				InputProps={{ readOnly: isReadOnly }}
				required
				autoComplete="family-name"
				error={errors.lastName !== undefined}
				helperText={errors.lastName?.message ?? ''}
				label="Last name"
				variant="standard"
				{...register('lastName')}/>
			<TextField
				className={`${styles.profile__email} ${styles.profile__field_readonly}`}
				id="email"
				InputProps={{ readOnly: isReadOnly }}
				autoComplete="email"
				label="Email"
				variant="standard"
				{...register('email')}/>
		</form>
	</Box>;
};

export const ProfilePage = typedMemo(ProfilePageComponent);
