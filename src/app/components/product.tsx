import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Product} from "../hooks/hooks";

export default function ProductPage(props: Product) {
    return (
        <div className="bg-white rounded-lg shadow-lg m-1 transition-all duration-300 md:hover:scale-125 hover:translate-x-4 hover:z-10">
            <div className="p-4">
                <Link href={"/products" + props.id} className="block" prefetch={false}>
                    <ScrollableImage src={[props.image, props.image]}/>
                    <h3 className="text-xl font-bold my-2 text-black">{props.title}</h3>

                    <p className="text-gray-500 line-clamp-2">
                        {props.description}
                    </p>
                    <div className="flex items-center">
                        <div className="rounded-full bg-gray-400 pl-2 pr-2 pb-1 pt-1 my-2 text-gray-800 text-xs">
                            {props.category}
                        </div>
                        <label className="text-gray-400 m-2">{props.price} $</label>
                    </div>
                </Link>
            </div>
        </div>
    )
}


function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(() => {});

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

function ScrollableImage(props: { src: string[], className?: string }) {
    const [state, setState] = useState(1);
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useInterval(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth)
        }
        if (state === props.src.length) setState(1);
        else setState(state + 1);
    }, 3000)

    return (
        <div ref={ref} className={props.className + " rounded-lg overflow-hidden flex"}>
            {
                props.src.map((s, i) =>
                    <img src={s} key={i} alt={""}
                         style={{ transform: `translateX(-${(state - 1) * width}px)` }}
                         className={"h-full transition-all duration-500"}/>
                )
            }
        </div>
    )
}