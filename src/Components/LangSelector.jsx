"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const Lang = [
    { code: "en", name: "English" },
    { code: "gu", name: "ગુજરાતી" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
    };

    return (
        <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-30">
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                {Lang.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default LanguageSelector;
