import React, { FC, useContext } from 'react'
import { StyleSheet, Image, Alert, Button } from 'react-native';
import {Text, View} from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import logo from '../../assets/logo.png';
import { ShareContext } from '../ShareContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import Routs from '../constants/constants';

type Props = NativeStackScreenProps<ParamListBase, typeof Routs.HOME>;

const HomeScreen = ({ navigation }: Props) => {

	const { selectedImage, setSelectedImage } = useContext(ShareContext);

	const opentImagePickerAsync = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert('Небходим доступ к камере');
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled) {
			return;
		}

		setSelectedImage({ localUri: pickerResult.uri });
		navigation.navigate(Routs.SHARE);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} style={styles.logo}></Image>
			</View>
			<View style={styles.content}>
				<Text style={styles.instructions}>Выберите фото, которым вы хотите поделиться с вашими друзьями.</Text>
				<Button
					onPress={opentImagePickerAsync}
					title='Выбирите фото'
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	header: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 305,
		height: 159,
		marginBottom: 10
	},
	instructions: {
		fontSize: 18,
		marginHorizontal: 15,
		marginVertical: 15
	},
});

export default HomeScreen