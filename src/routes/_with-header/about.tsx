import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_with-header/about")({
    component: AboutPage,
});

function AboutPage() {
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}
