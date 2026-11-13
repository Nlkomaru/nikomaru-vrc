import handler from "@tanstack/react-start/server-entry";

export default {
    fetch(
        request: Request,
        env: Record<string, unknown>,
        ctx: ExecutionContext,
    ) {
        void ctx;
        return handler.fetch(request, { context: env });
    },
};
