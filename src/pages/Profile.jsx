import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { useTranslation } from "react-i18next"
import LanguageSelector from "@/Components/LangSelector"
import { useAuth } from "@/context/AuthContext"

function Profile() {
    const { t } = useTranslation()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const { logout } = useAuth()

    useEffect(() => {
        const auth = localStorage.getItem("auth")
        const storedUser = JSON.parse(localStorage.getItem("user"))

        if (auth !== "true" || !storedUser) {
            navigate("/login", { replace: true })
        } else {
            setUser(storedUser)
        }
    }, [navigate])

    const handleLogout = () => {
        navigate("/login",)
        logout()
    }

    if (!user) return null

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        {t("myProfile")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg">
                        <strong>{t("name")}:</strong> {user.name || t("notAvailable")}
                    </p>
                    <p className="text-lg">
                        <strong>{t("email")}:</strong> {user.email || t("notAvailable")}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                        <span className="text-lg font-medium">{t("language")}</span>
                        <LanguageSelector />
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <Button onClick={() => navigate("/")}>{t("backToHome")}</Button>
                        <Separator className="my-2" />
                        <Button variant="destructive" onClick={handleLogout}>
                            {t("logout")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
