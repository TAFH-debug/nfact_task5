'use client'
import ProductPage from "@/app/components/product";
import PostModal from "@/app/components/postModal";
import React, {useState} from "react";
import {Product, useCategories, useProducts} from "@/app/hooks/hooks";

export default function PostPage() {
    const [show, setShow] = useState(false);
    const {data, error, isLoading} = useProducts();
    const { data:categories , error:error2, isLoading:isLoading2 } = useCategories();
    const [filter, setFilter] = useState("all")

    if (isLoading || isLoading2) {
        return <></>;
    }

    return (
        <main className="flex min-h-screen flex-col md:flex-row justify-center items-start">
            <PostModal show={show} setShow={(a) => setShow(a)}/>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:w-3/5 m-4">
                {
                    data?.map((product: Product) => (filter === "all" || product.category === filter) ?
                        <ProductPage key={product.id} {...product}/> : <></>)
                }

                <ProductPage title={"Car"} id={1} description={"Very good car. Sold because it is unnecessary. Good for work"}
                         category={"electronic"} image={"/default.jpg"} price={"100"}/>
            </div>
            <div className="flex bg-white rounded-lg shadow-lg my-4 mx-2 flex-col items-center">
                <h1 className="text-black m-4 text-center font-bold text-xl">Categories</h1>
                <div className="w-full flex items-center p-3">
                    <span className="block rounded-full bg-black w-2 h-2 m-2"></span>
                    <button className="text-black text-sm hover:underline"
                            onClick={() => setFilter("all")}>All</button>
                </div>
                {
                    categories.map((category: string) => {
                        return <div key={category} className="w-full flex items-center p-3">
                            <span className="block rounded-full bg-black w-2 h-2 m-2"></span>
                            <button className="text-black text-sm hover:underline"
                                    onClick={() => setFilter(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</button>
                        </div>
                    })
                }
                <button className="rounded-lg shadow-lg mx-4 my-10 p-3 text-white bg-blue-500 active:bg-blue-700"
                        onClick={() => setShow(true)}>
                    Create new +
                </button>
            </div>
        </main>
    )
}