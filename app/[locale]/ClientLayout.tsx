"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import EmotionRegistry from "../EmotionRegistry";
import Navbar from "../components/header/NavBar";

const CLIENT_ID = "692089751958-hjf7tq4m0ju5s3tb3k7bg9lcjo863q0f.apps.googleusercontent.com";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Provider store={store}>
                        <EmotionRegistry>
                            <Navbar />
                            <main>{children}</main>
                        </EmotionRegistry>
                </Provider>
            </div>
        </>
    );
}
