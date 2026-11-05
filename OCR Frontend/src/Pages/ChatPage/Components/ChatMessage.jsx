export default function ChatMessage({ message }) {
    const BASE_CLASS = `w-fit px-4 py-2 rounded-2xl bg-gray-400`;

    return (
        <div className={`${BASE_CLASS} ${message.sender == "user" ? "self-end text-white" : "self-start bg-transparent text-black"}`}>{message.content}</div>
    );
}
