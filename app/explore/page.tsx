"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  MapPin,
  Users,
  Sparkles,
  Heart,
  MessageCircle,
  Compass,
  Filter,
  Grid3X3,
  Play,
} from "lucide-react"
import Image from "next/image"

const trendingPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300&text=Trending+1",
    likes: 15420,
    comments: 892,
    user: "alex_creates",
    isVideo: false,
    aiEnhanced: true,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300&text=Trending+2",
    likes: 12350,
    comments: 654,
    user: "sarah_photo",
    isVideo: true,
    aiEnhanced: false,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300&text=Trending+3",
    likes: 9876,
    comments: 432,
    user: "mike_art",
    isVideo: false,
    aiEnhanced: true,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300&text=Trending+4",
    likes: 8765,
    comments: 321,
    user: "emma_travel",
    isVideo: false,
    aiEnhanced: false,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300&text=Trending+5",
    likes: 7654,
    comments: 234,
    user: "david_food",
    isVideo: true,
    aiEnhanced: true,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300&text=Trending+6",
    likes: 6543,
    comments: 187,
    user: "lisa_fitness",
    isVideo: false,
    aiEnhanced: false,
  },
]

const trendingTopics = [
  { tag: "#AIArt", posts: 45200, growth: "+12%" },
  { tag: "#GoldenHour", posts: 32100, growth: "+8%" },
  { tag: "#StreetPhotography", posts: 28900, growth: "+15%" },
  { tag: "#Minimalism", posts: 24500, growth: "+5%" },
  { tag: "#NatureLovers", posts: 21300, growth: "+18%" },
  { tag: "#PortraitMode", posts: 19800, growth: "+7%" },
]

const suggestedUsers = [
  {
    id: 1,
    username: "photographer_jane",
    name: "Jane Smith",
    followers: "125K",
    avatar: "/placeholder.svg?height=60&width=60",
    isVerified: true,
    category: "Photography",
  },
  {
    id: 2,
    username: "chef_marco",
    name: "Marco Rodriguez",
    followers: "89K",
    avatar: "/placeholder.svg?height=60&width=60",
    isVerified: false,
    category: "Food",
  },
  {
    id: 3,
    username: "travel_with_lisa",
    name: "Lisa Chen",
    followers: "156K",
    avatar: "/placeholder.svg?height=60&width=60",
    isVerified: true,
    category: "Travel",
  },
]

const categories = [
  { name: "All", icon: Grid3X3, count: "2.1M" },
  { name: "Photography", icon: Sparkles, count: "892K" },
  { name: "Art", icon: Sparkles, count: "654K" },
  { name: "Travel", icon: MapPin, count: "543K" },
  { name: "Food", icon: Heart, count: "432K" },
  { name: "Fashion", icon: Users, count: "321K" },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("trending")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6 md:ml-64">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search posts, users, or hashtags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                <Filter className="w-5 h-5" />
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className="whitespace-nowrap flex items-center space-x-2"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="trending" className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex items-center space-x-2">
                    <Compass className="w-4 h-4" />
                    <span>Recent</span>
                  </TabsTrigger>
                  <TabsTrigger value="local" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Local</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="trending">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trendingPosts.map((post) => (
                      <div key={post.id} className="relative aspect-square group cursor-pointer">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={`Post by ${post.user}`}
                          fill
                          className="object-cover rounded-xl"
                        />

                        {/* Overlay indicators */}
                        <div className="absolute top-3 left-3 flex space-x-1">
                          {post.isVideo && (
                            <Badge className="bg-black/70 text-white">
                              <Play className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          )}
                          {post.aiEnhanced && (
                            <Badge className="bg-purple-500/90">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                          <div className="flex items-center space-x-6 text-white">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-5 h-5" />
                              <span className="font-semibold">{post.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-5 h-5" />
                              <span className="font-semibold">{post.comments}</span>
                            </div>
                          </div>
                        </div>

                        {/* User info */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/70 rounded-lg px-3 py-2">
                            <p className="text-white text-sm font-medium">@{post.user}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trendingPosts
                      .slice()
                      .reverse()
                      .map((post) => (
                        <div key={post.id} className="relative aspect-square group cursor-pointer">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={`Post by ${post.user}`}
                            fill
                            className="object-cover rounded-xl"
                          />

                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <div className="flex items-center space-x-6 text-white">
                              <div className="flex items-center space-x-2">
                                <Heart className="w-5 h-5" />
                                <span className="font-semibold">{post.likes.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-semibold">{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="local">
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Discover Local Content</h3>
                    <p className="text-muted-foreground mb-6">Enable location services to see posts from your area</p>
                    <Button>Enable Location</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending Topics</span>
                  </h3>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-primary hover:underline cursor-pointer">{topic.tag}</p>
                          <p className="text-sm text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {topic.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Suggested for You</span>
                  </h3>
                  <div className="space-y-4">
                    {suggestedUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          {user.isVerified && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.followers} • {user.category}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Platform Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Posts</span>
                      <span className="font-semibold">2.1M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Users</span>
                      <span className="font-semibold">450K+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Enhanced</span>
                      <span className="font-semibold">892K+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Communities</span>
                      <span className="font-semibold">1.2K+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
