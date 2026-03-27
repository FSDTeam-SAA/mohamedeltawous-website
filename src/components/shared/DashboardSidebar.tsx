"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PlusSquare,
  FolderClock,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";

const sidebarNavItems = [
  { name: "Dashboard Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "New Scenario", href: "/dashboard/scenario/new", icon: PlusSquare },
  { name: "History", href: "/dashboard/history", icon: FolderClock },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  readonly onNavClick?: () => void;
}

export default function DashboardSidebar({
  onNavClick,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Real or fallback user details
  const userRole = (user as { role?: string })?.role || "Super Admin";
  const userName = user?.name || "Mohamed Eltawous";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="w-full h-full flex flex-col bg-[#0f172a] text-white">
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {sidebarNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-transparent text-white font-medium"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? "text-white" : "text-slate-400"}
              />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile and Logout Area */}
      <div className="p-6 pb-8 border-t border-white/10 flex flex-col gap-4 bg-[#0f172a]">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-white/20">
            {user?.image ? (
              <AvatarImage src={user.image} alt={userName} />
            ) : (
              <AvatarFallback className="bg-slate-700 text-white text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium leading-none mb-1">
              {userName}
            </span>
            <span className="text-slate-400 text-xs">{userRole}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onNavClick) onNavClick();
            signOut({ callbackUrl: "/" });
          }}
          className="flex flex-row items-center justify-center gap-2 w-full px-4 py-2 mt-2 rounded-lg border border-slate-700 text-red-500 hover:bg-white/5 transition-colors font-medium text-sm"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}
