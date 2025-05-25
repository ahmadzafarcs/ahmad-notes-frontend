import { useAuth } from "../../contexts/AuthProvider"

export default function Header() {
    const {logout} = useAuth()

    return <header className="">
        <div className="w-[90vw] mx-auto flex items-center justify-between h-16">
            <h3 className="text-md font-thin">Ahmad Notes.</h3>
            <button onClick={logout} className="text-red-800 cursor-pointer">Logout</button>
        </div>
    </header>
}