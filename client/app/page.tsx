
import { redirect } from "next/navigation";

export default function Home() {
    const isLoggedIn = true; // replace with real auth check

    if (isLoggedIn) {
        redirect("/dashboard");
    }

    redirect("/login");
}
