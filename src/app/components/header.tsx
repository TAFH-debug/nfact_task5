"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export default function Header() {
    const path = usePathname()
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (window !== undefined) {
            if (localStorage.getItem("token") !== null) {
                setAuth(true)
            }
        }
    }, [path])

    return (
        <header className="bg-blue-900 shadow-sm text-gray-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <span className="o"></span>
                    <span className="l"></span>
                    <span className="x">X</span>
                </Link>
                <div className="flex items-center">
                    {
                        auth ? <Link href="/profile" className="flex items-center gap-2 text-black dark:text-white m-2" prefetch={false}>
                            <ProfileIcon className="w-8 h-8 text-black dark:text-white" />
                        </Link> : <></>
                    }
                </div>
            </div>
        </header>
    )
}

function MountainIcon(props: { className: string }) {
    return (
        <svg viewBox="0 0 1043.63 592.71" {...props}>
            <g data-name="Layer 2">
                <g data-name="Layer 1">
                    <path
                        fill="currentColor"
                        d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                </g>
            </g>
        </svg>
    )
}

function ProfileIcon(props: {className: string}) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}