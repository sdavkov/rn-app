import React from "react";
import { IShareContext } from "./types";

export const ShareContext = React.createContext<IShareContext>({ selectedImage: null, setSelectedImage: () => { } });