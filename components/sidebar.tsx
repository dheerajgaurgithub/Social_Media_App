"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Settings,
  Users,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/main", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Reels", href: "/reels", icon: Film },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Notifications", href: "/notifications", icon: Heart },
  { name: "Create", href: "/create", icon: PlusSquare },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Communities", href: "/communities", icon: Users },
  { name: "Local", href: "/local", icon: MapPin },
  { name: "Time Capsules", href: "/timecapsules", icon: Clock },
  { name: "AI Enhance", href: "/enhance", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col fixed left-0 top-16 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:flex">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 px-4 transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary hover:bg-primary/30 shadow-sm"
                      : "hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
            <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">@johndoe</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          <p>© 2024 BvIBE</p>
          <p>Made with ❤️ for creators</p>
        </div>
      </div>
    </div>
  )
}
