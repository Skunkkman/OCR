export default function SideBarChatRow({ chat }) {
    return (
        <div className="flex w-full mx-auto bg-gray-none hover:bg-gray-500 rounded-xl text-sm text-black hover:text-white px-2 py-2 cursor-pointer duration-100 transition-all">
            <span>{chat.name}</span>
        </div>
    );
}
