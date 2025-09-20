import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/Components/ui/separator"

function Profile() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

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
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
        navigate("/login", { replace: true })
    }

    if (!user) return null

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        My Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    {/* {user.picture && (
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                    )} */}

                    <p className="text-lg">
                        <strong>Name:</strong> {user.name || "N/A"}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {user.email || "N/A"}
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                        <Button onClick={() => navigate("/")}>Back to Home</Button>
                        <Separator className="my-2" />
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
