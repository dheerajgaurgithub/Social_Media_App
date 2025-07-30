"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles, Users, MapPin, Clock, Mic } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostProps {
  post: {
    id: number
    user: {
      username: string
      avatar: string
      isVerified: boolean
    }
    image: string
    caption: string
    likes: number
    comments: number
    timeAgo: string
    mood: string
    isCollaborative: boolean
    collaborators?: string[]
    aiEnhanced: boolean
    location?: string
    timeCapsule?: {
      unlockDate: string
      message: string
    }
  }
}

export function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comment, setComment] = useState("")

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.username} />
            <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <Link href={`/profile/${post.user.username}`} className="font-semibold text-sm hover:underline">
                {post.user.username}
              </Link>
              {post.user.isVerified && (
                <Badge variant="secondary" className="w-4 h-4 p-0 flex items-center justify-center">
                  ✓
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {post.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location}</span>
                </div>
              )}
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={post.image || "/placeholder.svg"}
            alt="Post image"
            width={600}
            height={600}
            className="w-full aspect-square object-cover"
          />

          {/* Special badges */}
          <div className="absolute top-2 left-2 flex space-x-1">
            {post.aiEnhanced && (
              <Badge className="bg-purple-500 hover:bg-purple-600">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            )}
            {post.isCollaborative && (
              <Badge className="bg-blue-500 hover:bg-blue-600">
                <Users className="w-3 h-3 mr-1" />
                Collab
              </Badge>
            )}
            {post.timeCapsule && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                <Clock className="w-3 h-3 mr-1" />
                Time Capsule
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} className="p-0 h-auto">
              <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto">
              <Send className="w-6 h-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSaved(!isSaved)} className="p-0 h-auto">
            <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="w-full text-left">
          <p className="font-semibold text-sm">{post.likes.toLocaleString()} likes</p>

          {post.isCollaborative && post.collaborators && (
            <div className="flex items-center space-x-1 mt-1 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Collaboration with {post.collaborators.join(", ")}</span>
            </div>
          )}

          <div className="text-sm">
            <Link href={`/profile/${post.user.username}`} className="font-semibold hover:underline">
              {post.user.username}
            </Link>{" "}
            <span>{post.caption}</span>
          </div>

          {post.comments > 0 && (
            <Button variant="ghost" className="p-0 h-auto text-sm text-muted-foreground hover:bg-transparent">
              View all {post.comments} comments
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2 w-full">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-none bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Mic className="w-4 h-4" />
          </Button>
          {comment && (
            <Button variant="ghost" className="text-blue-500 hover:text-blue-600 p-0 h-auto text-sm font-semibold">
              Post
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
