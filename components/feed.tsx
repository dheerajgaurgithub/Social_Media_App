"use client"

import { Post } from "@/components/post"

const posts = [
  {
    id: 1,
    user: {
      username: "alex_photo",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    image: "/placeholder.svg?height=600&width=600&text=Beautiful+Sunset",
    caption: "Golden hour magic ✨ This sunset reminded me why I love photography so much!",
    likes: 1234,
    comments: 89,
    timeAgo: "2h",
    mood: "happy",
    isCollaborative: false,
    aiEnhanced: true,
    location: "Malibu, CA",
  },
  {
    id: 2,
    user: {
      username: "sarah_travels",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    image: "/placeholder.svg?height=600&width=600&text=Mountain+Adventure",
    caption: "Reached the summit after 6 hours of hiking! The view was absolutely worth it 🏔️",
    likes: 892,
    comments: 45,
    timeAgo: "4h",
    mood: "adventure",
    isCollaborative: true,
    collaborators: ["mike_fitness", "emma_art"],
    aiEnhanced: false,
    location: "Rocky Mountains, CO",
  },
  {
    id: 3,
    user: {
      username: "emma_art",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    image: "/placeholder.svg?height=600&width=600&text=Digital+Art+Creation",
    caption: "Latest digital painting! Spent 12 hours on this piece. What do you think? 🎨",
    likes: 2156,
    comments: 156,
    timeAgo: "6h",
    mood: "creative",
    isCollaborative: false,
    aiEnhanced: true,
    timeCapsule: {
      unlockDate: "2024-12-25",
      message: "Merry Christmas! This was my gift to the community 🎄",
    },
  },
]

interface FeedProps {
  mood: string
}

export function Feed({ mood }: FeedProps) {
  const filteredPosts = mood === "all" ? posts : posts.filter((post) => post.mood === mood)

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
