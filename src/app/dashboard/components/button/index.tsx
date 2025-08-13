"use client"
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh(){

    const router = useRouter();

    return(
        <button className="cursor-pointer bg-green-600 px-4 py-1 rounded hover:bg-green-700 duration-300" onClick={() => router.refresh()}>
            <FiRefreshCcw size={24} color="#fff"/>
        </button>
    )
}