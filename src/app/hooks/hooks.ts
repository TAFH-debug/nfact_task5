import {useState} from "react";
import imageInstance from "@/app/api/imageService";
import productsInstance from "@/app/api/productsService";
import {useQuery} from "@tanstack/react-query";

export const useUpload = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const uploadForm = async (formData: FormData) => {
        const responce = await imageInstance.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total !== undefined) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 50;
                    setProgress(progress);
                }
            },
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.total !== undefined) {
                    const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                    setProgress(progress);
                }
            },
        });
        setIsLoading(false);
        return responce;
    };

    return { uploadForm, isLoading, progress };
};

export interface Product {
    id: number,
    title: string,
    description: string,
    price: string,
    image: string,
    category: string
}

export const useProducts = () => {
    const retrieveProducts = async () => {
        const response = await productsInstance.get(
            "/products"
        );
        return response.data;
    };
    return useQuery({
        queryFn: retrieveProducts,
        queryKey: ["products"],
    });
}

export const useCategories = () => {
    const retrieveCategories = async () => {
        const response = await productsInstance.get(
            "/products/categories"
        );
        return response.data;
    };
    return useQuery({
        queryFn: retrieveCategories,
        queryKey: ["categories"],
    });
}