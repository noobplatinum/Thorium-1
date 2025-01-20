"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f1947a4f-a702-4c4c-9816-45cafc4d754a");
    }, []);

    return null;
}