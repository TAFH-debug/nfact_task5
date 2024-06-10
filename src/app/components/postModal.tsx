import Modal from "react-modal";
import "../file.css";
import {ChangeEvent, useEffect, useState} from "react";
import {useCategories, useUpload} from "@/app/hooks/hooks";
import {toast} from "react-toastify";
import productsInstance from "@/app/api/productsService";
import {useQueryClient} from "@tanstack/react-query";

const customStyle = {
    content: {
        width: "30%",
        height: "max-content",
        margin: "auto",
        border: "none",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    }
}

interface Image {
    id: number,
    data: FormData
}

const defaultState = {
    counter: 1,
    title: "",
    description: "",
    price: "",
    category: ""
}

export default function PostModal({ show, setShow }: { show: boolean, setShow: (a: boolean) => void }) {
    const client = useQueryClient();
    const [state, setState] = useState(defaultState);
    const [images, setImages] = useState<Image[]>([]);
    const { data:categories, error, isLoading } = useCategories();
    const [srcs, setSrcs] = useState<string[]>([]);

    const add = (src: string) => {
        setSrcs([...srcs, src])
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);

        setImages([...images, {
            id: state.counter,
            data: formData
        }]);
    }

    const handleSubmit = () => {
        if (images.length === 0) {
            toast.error("Add at least 1 image of product!")
            return;
        }
        productsInstance.post("/products", {
            title: state.title,
            description: state.description,
            price: state.price,
            image: srcs[0],
            category: state.category
        }).then((r) => toast.success("Product successfully created!"))

        client.invalidateQueries({queryKey: ["products"]})

        setState(defaultState);
        setSrcs([]);
        setImages([]);
    }

    if (isLoading) {
        return <></>;
    }

    return (
        <>
            {/* @ts-ignore */}
            <Modal isOpen={show} style={customStyle} onRequestClose={() => setShow(false)}>
                <h1 className="font-bold text-black text-3xl">Create your product</h1>
                <div className="my-2 flex rounded-lg bg-white flex-col justify-center items-center p-3">
                    <div className="flex items-center flex-col w-full">
                        <label className="w-full text-sm font-medium text-gray-900">Product name</label>
                        <input className="m-2 flex h-10 w-full rounded-md border text-black px-3 py-4 text-xl
                                ring-offset-background placeholder:text-muted-foreground
                                focus-visible:outline-none focus:border-black"
                               value={state.title}
                               onChange={(e) => setState({...state, title: e.target.value})}/>
                    </div>
                    <div className="my-2 flex items-center flex-col w-full text-black">
                        <label className="w-full text-sm font-medium text-gray-900">Description</label>
                        <input className="m-2 flex h-10 w-full rounded-md border px-3 py-4 text-xl
                                ring-offset-background placeholder:text-muted-foreground
                                focus-visible:outline-none focus:border-black"
                               value={state.description}
                               onChange={(e) => setState({...state, description: e.target.value})}/>
                    </div>
                    <div className="my-2 flex items-center flex-col w-full text-black">
                        <label className="w-full text-sm font-medium text-gray-900">Description</label>
                        <select className="m-2 flex h-10 w-full rounded-md border px-3 text-xl
                                focus-visible:outline-none focus:border-black items-center"
                                value={state.category}
                               onChange={(e) => setState({...state, category: e.target.value})}>
                            {
                                categories.map((category: string) => <option className="text-black"
                                                                             key={category} value={category}>{category}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="my-2 flex items-center flex-col w-full text-black">
                        <label className="w-full text-sm font-medium text-gray-900">Price</label>
                        <input className="m-2 flex h-10 w-full rounded-md border px-3 py-4 text-xl
                                ring-offset-background placeholder:text-muted-foreground
                                focus-visible:outline-none focus:border-black"
                               value={state.price}
                               onChange={(e) => {
                                   const regex = /^[0-9]+$/;
                                   if (!e.target.value.match(regex) && e.target.value !== "") return;
                                   setState({...state, price: e.target.value});
                               }}/>
                    </div>

                    <input className="flex w-full rounded-lg bg-black text-gray-300 p-2
                        text-sm font-medium cursor-pointer hover:bg-gray-800" type="submit" value="Submit"
                           onClick={handleSubmit}/>
                    <div className="grid grid-cols-2 gap-2 my-4">
                        {
                            images.map((image: Image) => (
                                <ImageLoader key={image.id} {...image} add={add}/>
                            ))
                        }
                    </div>
                    <label className="input-file">
                        <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleFile}/>
                        <span>Выберите файл</span>
                    </label>
                </div>
            </Modal>
        </>
    );
}

function ImageLoader(props: { id: number, data: FormData, add: ( src: string ) => void}) {
    const {uploadForm, isLoading, progress} = useUpload();
    const [src, setSrc] = useState("/default.jpg");

    useEffect(() => {
        async function run() {
            const resp = await uploadForm(props.data);
            setSrc(resp.data.location);
            props.add(resp.data.location);
        }
        run()
    }, []);

    return (<div className="flex relative items-center justify-center">
        {
            isLoading ? <div className="absolute rounded-lg w-4/5 bg-gray-500 h-5">
                <div className="rounded-lg h-full bg-green-500" style={{width: `${progress}%`}}></div>
            </div> : <></>
        }
        <img src={src} alt="" className="w-full h-full rounded-lg border-2"/>
    </div>)
}
