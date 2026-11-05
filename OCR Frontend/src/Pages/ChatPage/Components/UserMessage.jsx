export default function UserMessage({ message }) {
    return (<div className="w-fit px-4 py-2 bg-gray-400">{message.content}</div>);
}
