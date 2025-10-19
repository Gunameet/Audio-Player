import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";

function Header() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let storedUser = null;
        try {
            const raw = localStorage.getItem("user");
            if (raw && raw !== "undefined") storedUser = JSON.parse(raw);
        } catch {
            storedUser = null;
        }

        const auth = localStorage.getItem("auth");
        if (auth === "true" && storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md flex items-center justify-between px-4">

            <div className="flex items-center">
                <h1 className="text-black font-bold sm:text-xl md:text-2xl anek-gujarati">
                    {t("appTitle")}
                </h1>
            </div>

            <div className="hidden sm:flex">
                <Navbar user={user} className="bg-transparent text-black font-bold flex gap-6" />
            </div>

            <div className="sm:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-black" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-72 bg-white shadow-lg border-l border-gray-200"
                    >
                        <SheetHeader className="border-b pb-3">
                            <SheetTitle className="text-xl font-semibold text-gray-800">
                                {t("menuTitle")}
                            </SheetTitle>
                        </SheetHeader>

                        <div className="mt-6 flex flex-col gap-6">
                            <Navbar
                                user={user}
                                className="flex flex-col gap-3 text-gray-700 font-medium text-lg"
                            />

                        </div>
                    </SheetContent>
                </Sheet>

            </div>
        </header>
    );
}

export default Header;
