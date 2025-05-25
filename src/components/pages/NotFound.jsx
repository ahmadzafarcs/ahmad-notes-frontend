import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div>
                <h4 className="text-2xl">404</h4>
                <h1>Page Not Found</h1>
                <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
                <Link to="/" className="bg-slate-800 text-slate-100 px-4 py-2 rounded hover:bg-slate-700 cursor-pointer"> 
                    Go to Notes
                </Link>
            </div>
        </section>
    )
}