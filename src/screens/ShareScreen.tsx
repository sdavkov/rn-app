import React, { FC, useContext } from 'react'
import { StyleSheet, Image, TouchableOpacity, Platform, Alert, Button } from 'react-native';
import {Text, View} from '../components/Themed';
import * as Sharing from 'expo-sharing';
import { ShareContext } from '../ShareContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import Routs from '../constants/constants';

type Props = NativeStackScreenProps<ParamListBase, typeof Routs.SHARE>;

const ShareScreen = ({ navigation }: Props) => {
	const { selectedImage, setSelectedImage } = useContext(ShareContext);

	const openShareDialogAsunc = async () => {
		if (Platform.OS === 'web') {
			Alert.alert('Ох, функция поделиться не доступна на вашей платформе');
			return;
		}
		if (selectedImage) {
			await Sharing.shareAsync(selectedImage.localUri);
		}
	}

	const cancelShare = () => {
		setSelectedImage(null);
		navigation.navigate(Routs.HOME);
	}

	return (
		selectedImage ? (
			<View style={styles.container}>
				<Image
					source={{ uri: selectedImage.localUri }}
					style={styles.thumbnail}
				/>
				<View style={styles.buttons}>
					<Button 
						onPress={openShareDialogAsunc}
						title='Поделиться'
					/>
					<Button
						onPress={cancelShare}
						title='Отменить'
						color='grey'
					/>
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
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
		marginVertical: 15
	}
});

export default ShareScreen