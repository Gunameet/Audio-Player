import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

function Navbar({ className, style }) {
    return (
        <nav
            className={cn(
                "flex items-center justify-between px-6 py-3 bg-transparent text-white font-bold text-lg",
                className
            )}
            style={style}
        >
            <div className="flex items-center gap-6">
                <Link
                    to="/profile"
                    className="hover:text-blue-400 transition-colors duration-200"
                >
                    Profile
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
