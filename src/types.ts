export interface ISelectedImage {
	localUri: string;
}

export interface IShareContext {
	selectedImage: null | ISelectedImage;
	setSelectedImage: (selectedImage: null | ISelectedImage) => void;
}