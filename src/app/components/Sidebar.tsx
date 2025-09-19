// src/app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Folder,
  Wallet,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Mail,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/contributions", label: "Contributions", icon: Folder },
    { href: "/budgets", label: "My Budgets", icon: Wallet },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 h-screen flex flex-col">
      {/* Perfil fixo */}
      <div className="flex flex-col items-center p-6 border-b border-gray-700">
        <div className="w-16 h-16 rounded-full bg-gray-700" />
        <h2 className="mt-3 font-semibold">Nickname</h2>
        <p className="text-sm text-gray-400">Motto / descrição</p>
      </div>

      {/* Menu com scroll independente */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto sidebar-scroll">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="pt-4 border-t border-gray-700">
          <Link
            href="/logout"
            className="flex items-center gap-3 p-2 rounded-md text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={18} /> <span>Log out</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
