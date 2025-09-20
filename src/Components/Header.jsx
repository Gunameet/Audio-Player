import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";

function Header() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const auth = localStorage.getItem("auth");
        if (auth === "true" && storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white shadow-md flex items-center justify-between px-4">
            {/* Left side */}
            <div className="flex items-center">
                <h1 className="text-black font-bold sm:text-xl md:text-2xl pl-2">
                    BAPS Swaminarayan Akshardham
                </h1>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden sm:flex">
                <Navbar user={user} className="bg-transparent text-black font-bold flex gap-6" />
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-black" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <Navbar user={user} className="flex flex-col gap-4 text-black text-lg font-bold" />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default Header;
