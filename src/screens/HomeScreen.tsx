import React, { FC, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import logo from '../../assets/logo.png';
import { ShareContext } from '../ShareContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Routs } from '../constants';

type Props = NativeStackScreenProps<ParamListBase, Routs.home>;

const HomeScreen = ({ navigation }: Props) => {

	const { selectedImage, setSelectedImage } = useContext(ShareContext);

	const opentImagePickerAsync = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			alert('Небходим доступ к камере')
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled) {
			return;
		}

		setSelectedImage({ localUri: pickerResult.uri });
		navigation.navigate(Routs.share);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} style={styles.logo}></Image>
			</View>
			<View style={styles.content}>
				<Text style={styles.instructions}>Выбиритен фото, которым вы хотите поделиться с вашими друзьями.</Text>
				<TouchableOpacity
					onPress={opentImagePickerAsync}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Выбирите фото</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
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
		color: '#888',
		fontSize: 18,
		marginHorizontal: 15,
		marginVertical: 15
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5
	},
	buttonText: {
		fontSize: 20,
		color: '#fff'
	}
});

export default HomeScreen