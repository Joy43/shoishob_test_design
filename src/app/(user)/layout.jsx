import UserSidebarNav from "./_components/usernavbar";


export const metadata = {
  title: "User Dashboard",
};

export default function UserLayout({ children }) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-54 shadow-sm">
        <UserSidebarNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-2 p-2">
        {children}
        </div>
    </div>
  );
}
