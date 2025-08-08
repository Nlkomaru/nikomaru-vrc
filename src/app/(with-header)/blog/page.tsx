import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <Link href="/blog/test">
            <Button>Test Link</Button>
        </Link>
    );
}
