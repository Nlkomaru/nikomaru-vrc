import { AnimatedText, CHARACTER_REVEAL } from "./animated-text";

export type Greeting = "おはようございます" | "こんにちは" | "こんばんは";

const NAME_TEXT = "にこまるです";
const NAME_REVEAL_DELAY_SEC = 1;
const NAME_REVEAL_DURATION_MULTIPLIER = 2;

export const GREETING_MESSAGE_DURATION_SEC =
    NAME_REVEAL_DELAY_SEC +
    ((Array.from(NAME_TEXT).length - 1) * CHARACTER_REVEAL.staggerSec +
        CHARACTER_REVEAL.durationSec) *
        NAME_REVEAL_DURATION_MULTIPLIER;

type GreetingMessageProps = {
    greeting: Greeting;
};

export const GreetingMessage = ({ greeting }: GreetingMessageProps) => (
    <h1
        aria-label={`${greeting}、${NAME_TEXT}`}
        className="ml-[-4px] flex flex-wrap text-3xl font-medium sm:flex-nowrap"
    >
        <AnimatedText text={`${greeting}、`} />
        <AnimatedText
            text={NAME_TEXT}
            delaySec={NAME_REVEAL_DELAY_SEC}
            revealDurationMultiplier={NAME_REVEAL_DURATION_MULTIPLIER}
        />
    </h1>
);
