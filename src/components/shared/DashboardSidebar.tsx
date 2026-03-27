"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutGrid,
  PlusSquare,
  FolderClock,
  Settings,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

const sidebarNavItems = [
  {
    name: "Dashboard Overview",
    href: "/dashboard/dashboard-overview",
    icon: LayoutGrid,
  },
  { name: "New Scenario", href: "/dashboard/new-scenario", icon: PlusSquare },
  { name: "History", href: "/dashboard/history", icon: FolderClock },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  readonly onNavClick?: () => void;
}

type SubItem = { name: string; href: string };
type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  subItems?: SubItem[];
};

function SidebarItem({
  item,
  pathname,
  onNavClick,
}: {
  item: NavItem;
  pathname: string;
  onNavClick?: () => void;
}) {
  const isActive =
    item.href === "/dashboard"
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const [isOpen, setIsOpen] = useState(() => {
    if (!hasSubItems) return false;
    return (
      item.subItems!.some(
        (sub: SubItem) =>
          pathname === sub.href || pathname.startsWith(`${sub.href}/`),
      ) || isActive
    );
  });

  if (hasSubItems) {
    return (
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between px-4 py-3 min-h-[48px] rounded-lg transition-all duration-200 ${
            isActive || isOpen
              ? "bg-[#1e293b] text-white font-semibold shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-[#1e293b]/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon
              size={20}
              strokeWidth={isActive || isOpen ? 2 : 1.5}
              className={isActive || isOpen ? "text-white" : "text-slate-400"}
            />
            <span className="text-[15px]">{item.name}</span>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Sub Items */}
        {isOpen && (
          <div className="flex flex-col gap-1 pt-1 pb-2">
            {item.subItems!.map((sub: SubItem) => {
              const isSubActive =
                pathname === sub.href || pathname.startsWith(`${sub.href}/`);
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onNavClick}
                  className={`flex items-center pl-12 pr-4 py-2.5 text-sm transition-colors rounded-lg ${
                    isSubActive
                      ? "text-white font-medium bg-[#1e293b]/50"
                      : "text-slate-400 hover:text-white hover:bg-[#1e293b]/30"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${isSubActive ? "bg-white" : "bg-transparent"}`}
                  />
                  {sub.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavClick}
      className={`flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-[#1e293b] text-white font-semibold shadow-sm"
          : "text-slate-400 hover:text-white hover:bg-[#1e293b]/50"
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
}

export default function DashboardSidebar({
  onNavClick,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Real or fallback user details
  // const userRole = (user as { role?: string })?.role || "Super Admin";
  // const userName = user?.name || "Mohamed Eltawous";

  // const userInitials = userName
  //   .split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase()
  //   .slice(0, 2);

  return (
    <aside className="w-full h-full flex flex-col bg-[#0f172a] text-white shadow-[1px_0_10px_rgba(0,0,0,0.1)] relative z-10">
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {sidebarNavItems.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavClick={onNavClick}
          />
        ))}
      </nav>

      {/* Bottom Profile and Logout Area */}
      {/* <div className="p-6 pb-8 border-t border-white/10 flex flex-col gap-4 bg-[#0f172a]">
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
      </div> */}
    </aside>
  );
}
