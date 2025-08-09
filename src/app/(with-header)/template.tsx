import { Header } from "@/components/header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
