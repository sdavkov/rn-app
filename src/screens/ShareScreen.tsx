import React, { FC, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import { ShareContext } from '../ShareContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Routs } from '../constants';

type Props = NativeStackScreenProps<ParamListBase, Routs.share>;

const ShareScreen = ({ navigation }: Props) => {
	const { selectedImage, setSelectedImage } = useContext(ShareContext);

	const openShareDialogAsunc = async () => {
		if (Platform.OS === 'web') {
			alert('Ох, функция поделиться не доступна на вашей платформе');
			return;
		}
		if (selectedImage) {
			await Sharing.shareAsync(selectedImage.localUri);
		}
	}

	const cancelShare = () => {
		setSelectedImage(null);
		navigation.navigate(Routs.home);
	}

	return (
		selectedImage ? (
			<View style={styles.container}>
				<Image
					source={{ uri: selectedImage.localUri }}
					style={styles.thumbnail}
				/>
				<View style={styles.buttons}>
					<TouchableOpacity
						onPress={openShareDialogAsunc}
						style={styles.button}
					>
						<Text style={styles.buttonText}>
							Поделиться
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={cancelShare}
						style={styles.button}
					>
						<Text style={styles.buttonText}>
							Отменить
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		) : (
			<Text>Загрузка изображения ...</Text>
		)
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 10
	},
	buttonText: {
		fontSize: 20,
		color: '#fff'
	},
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
		marginVertical: 15
	}
});

export default ShareScreen