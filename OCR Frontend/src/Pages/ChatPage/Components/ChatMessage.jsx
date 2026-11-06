export default function ChatMessage({ message }) {
    const BASE_CLASS = `w-fit px-4 py-2 rounded-2xl bg-gray-400`;
    const USER_STYLING = `self-end text-white`;
    const BOT_STYLING = `self-start bg-transparent text-black`

    return (
        <div
            className={`${BASE_CLASS} ${message.sender == "user" ? USER_STYLING : BOT_STYLING}`}
        >
            {message.content}
        </div>
    );
}
