import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold underline bg-45.9 96.7% 64.5%">
                Hello world!
            </h1>

            <Link href={"/blog/test"}><Button>aaa</Button></Link>
        </>
    );
}
