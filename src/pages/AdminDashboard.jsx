import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("DailyRituals");
    const navigate = useNavigate();

    const fetchFiles = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/audio");
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to load files");
                setFiles([]);
                return;
            }
            let normalized = [];
            if (Array.isArray(data)) {
                normalized = data;
            } else if (data.audios && Array.isArray(data.audios)) {
                normalized = data.audios;
            } else if (data.grouped && typeof data.grouped === "object") {
                // flatten grouped object -> array
                normalized = Object.values(data.grouped).flat();
            } else if (data.files && Array.isArray(data.files)) {
                normalized = data.files;
            } else {
                // fallback: try to infer array-like values at top-level
                const vals = Object.values(data).filter(Array.isArray).flat();
                normalized = vals.length ? vals : [];
            }

            setFiles(normalized);
        } catch (err) {
            setError("Unable to connect to server", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("audio", selectedFile);
            formData.append("title", title);
            formData.append("category", category);
            const res = await fetch("http://localhost:5000/api/audio/upload", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Upload failed");
            }
            setSelectedFile(null);
            setTitle("");
            await fetchFiles();
        } catch (err) {
            setError(err.message || "Upload error");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/audio/${id}`, { method: "DELETE" });
            if (res.ok) {
                setFiles((prev) => prev.filter((f) => f.id !== id && f._id !== id));
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Failed to delete file");
            }
        } catch (err) {
            setError("Failed to delete file", err);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 px-2 sm:px-4 pt-16 sm:pt-20 pb-6 sm:pb-10">
            <Card className="w-full max-w-full sm:max-w-5xl rounded-2xl shadow-xl">
                <CardHeader className="">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Admin Profile (distinct from user Profile page) */}
                    <div className="rounded-lg border p-3 sm:p-5 bg-white">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3">
                            <h3 className="text-base sm:text-lg font-semibold">Admin Profile</h3>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button size="sm" variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/")}>Go to Site</Button>
                                <Button size="sm" variant="destructive" className="w-full sm:w-auto" onClick={() => { logout(); navigate("/login", { replace: true }); }}>Logout</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 text-xs sm:text-sm">
                            <div>
                                <span className="font-medium">Name: </span>
                                <span>{user?.name || "-"}</span>
                            </div>
                            <div>
                                <span className="font-medium">Email: </span>
                                <span>{user?.email || "-"}</span>
                            </div>
                            <div>
                                <span className="font-medium">Role: </span>
                                <span className="inline-flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs uppercase">{(user?.role || "").toString()}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
                    )}

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Upload Audio</h3>
                        <div>
                            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">

                                {/* Title Field */}
                                <div className="flex flex-col w-full sm:flex-1">
                                    <label htmlFor="title" className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Audio Title
                                    </label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full text-xs sm:text-sm"
                                    />
                                </div>

                                {/* Category Field */}
                                <div className="flex flex-col w-full sm:w-48">
                                    <label htmlFor="category" className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <Select value={category} onValueChange={(v) => setCategory(v)}>
                                        <SelectTrigger id="category" className="w-full text-xs sm:text-sm">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DailyRituals">Daily Rituals</SelectItem>
                                            <SelectItem value="Thal">Thal</SelectItem>
                                            <SelectItem value="Kirtans">Kirtans</SelectItem>
                                            <SelectItem value="Prabhatiya">Prabhatiya</SelectItem>
                                            <SelectItem value="Katha">Katha</SelectItem>
                                            <SelectItem value="DevotionalMusic">Devotional Music</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* File Upload Field */}
                                <div className="flex flex-col w-full sm:flex-1">
                                    <label htmlFor="audio-file" className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Audio File
                                    </label>
                                    <input
                                        id="audio-file"
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        className="w-full block text-xs sm:text-sm border rounded px-3 py-2 bg-white"
                                    />
                                </div>

                                {/* Upload Button */}
                                <div className="flex items-end w-full sm:w-auto">
                                    <Button
                                        className="w-full sm:w-auto"
                                        onClick={handleUpload}
                                        disabled={!selectedFile || uploading}
                                    >
                                        {uploading ? "Uploading..." : "Add"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-1 text-xs text-gray-500 truncate">
                            {selectedFile ? selectedFile.name : "No file chosen"}
                        </div>
                        <p className="text-xs text-gray-500">Max ~20MB per file (server limits apply)</p>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-semibold">Audio Files</h3>
                        <Button variant="outline" onClick={fetchFiles} disabled={loading} className="w-full sm:w-auto">
                            {loading ? "Refreshing..." : "Refresh"}
                        </Button>
                    </div>

                    {loading && (
                        <div className="text-xs sm:text-sm text-gray-500">Loading files...</div>
                    )}

                    {!loading && (
                        <div className="rounded-lg border bg-white overflow-hidden">
                            {/* Sticky header for columns */}
                            <div className="min-w-[340px] grid grid-cols-12 px-2 sm:px-4 py-2 sm:py-3 bg-gray-50 text-xs font-semibold text-gray-600 sticky top-0 z-10">
                                <div className="col-span-7">Title</div>
                                <div className="col-span-2">Category</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {/* Scrollable list area with max height so the page doesn't grow indefinitely */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {files.length > 0 ? (
                                    files.map((file) => {
                                        const title = file.title || "(unnamed)";
                                        return (
                                            <div key={file._id || file.id} className="min-w-[340px] grid grid-cols-12 items-center px-2 sm:px-4 py-2 sm:py-3 border-t text-xs sm:text-sm">
                                                <div className="col-span-7 truncate pr-2 sm:pr-3">{title}</div>
                                                <div className="col-span-2">{file.category || "-"}</div>
                                                <div className="col-span-2 flex justify-end gap-2">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size="md" variant="destructive">
                                                                Delete
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete this file?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. It will permanently delete this audio file.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                                    onClick={() => handleDelete(file._id || file.id)}
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="px-2 sm:px-4 py-4 sm:py-6 text-xs sm:text-sm text-gray-500">No files found. Upload your first audio above.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* <div className="mt-6 flex justify-end">
                        <Button onClick={() => navigate("/")}>Back to Home</Button>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
}


