"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const suggestedUsers = [
  {
    id: 1,
    username: "photographer_jane",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "12.5K",
    isVerified: true,
    mutualFollowers: 3,
  },
  {
    id: 2,
    username: "chef_marco",
    name: "Marco Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "8.2K",
    isVerified: false,
    mutualFollowers: 7,
  },
  {
    id: 3,
    username: "travel_with_lisa",
    name: "Lisa Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    followers: "25.1K",
    isVerified: true,
    mutualFollowers: 12,
  },
]

export function SuggestedUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Suggested for you</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <Link href={`/profile/${user.username}`} className="font-semibold text-sm hover:underline">
                    {user.username}
                  </Link>
                  {user.isVerified && <span className="text-blue-500">✓</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user.followers} followers • {user.mutualFollowers} mutual
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Follow
            </Button>
          </div>
        ))}
        <Link href="/explore/people" className="text-sm text-blue-500 hover:underline">
          See all suggestions
        </Link>
      </CardContent>
    </Card>
  )
}
