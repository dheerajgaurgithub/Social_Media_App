"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users, Hash, MapPin, Clock, Heart, MessageCircle, Filter, X } from "lucide-react"
import Image from "next/image"

// Mock data
const searchData = {
  users: [
    {
      id: 1,
      username: "alex_creates",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "125K",
      verified: true,
      bio: "Digital artist & photographer",
      isFollowing: false,
    },
    {
      id: 2,
      username: "sarah_travels",
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "89K",
      verified: false,
      bio: "Travel blogger & adventurer",
      isFollowing: true,
    },
    {
      id: 3,
      username: "mike_fitness",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      followers: "156K",
      verified: true,
      bio: "Fitness coach & nutrition expert",
      isFollowing: false,
    },
  ],
  hashtags: [
    { tag: "#photography", posts: "2.1M", trending: true },
    { tag: "#travel", posts: "1.8M", trending: false },
    { tag: "#fitness", posts: "1.2M", trending: true },
    { tag: "#art", posts: "950K", trending: false },
    { tag: "#food", posts: "800K", trending: true },
    { tag: "#nature", posts: "650K", trending: false },
  ],
  locations: [
    { name: "San Francisco, CA", posts: "450K", country: "United States" },
    { name: "New York, NY", posts: "890K", country: "United States" },
    { name: "Tokyo, Japan", posts: "1.2M", country: "Japan" },
    { name: "Paris, France", posts: "780K", country: "France" },
  ],
  posts: [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300&text=Search+Post+1",
      likes: 1234,
      comments: 89,
      user: "alex_creates",
      caption: "Amazing sunset captured with AI enhancement",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300&text=Search+Post+2",
      likes: 2345,
      comments: 156,
      user: "sarah_travels",
      caption: "Hidden gem in the mountains",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300&text=Search+Post+3",
      likes: 3456,
      comments: 234,
      user: "mike_fitness",
      caption: "Morning workout motivation",
    },
  ],
}

const recentSearches = [
  { type: "user", query: "alex_creates" },
  { type: "hashtag", query: "#photography" },
  { type: "location", query: "San Francisco" },
  { type: "user", query: "sarah_travels" },
]

const trendingSearches = ["#AIArt", "#GoldenHour", "#StreetPhotography", "#TravelTuesday", "#FitnessMotivation"]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchResults, setSearchResults] = useState<any>({})
  const [isSearching, setIsSearching] = useState(false)
  const [followingUsers, setFollowingUsers] = useState<number[]>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = {
          users: searchData.users.filter(
            (user) =>
              user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          hashtags: searchData.hashtags.filter((hashtag) =>
            hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          locations: searchData.locations.filter((location) =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          posts: searchData.posts.filter(
            (post) =>
              post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.user.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }
        setSearchResults(filtered)
        setIsSearching(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults({})
      setIsSearching(false)
    }
  }, [searchQuery])

  const toggleFollow = (userId: number) => {
    setFollowingUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults({})
  }

  const hasResults = Object.values(searchResults).some((arr: any) => arr?.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6 md:ml-64">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for users, posts, hashtags, or places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-12 text-lg bg-muted/50 border-primary/20 focus:border-primary/50"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={clearSearch}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent border-primary/20">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {!searchQuery ? (
            /* Default Search Page */
            <div className="space-y-8">
              {/* Recent Searches */}
              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Recent Searches</span>
                    </h3>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                        onClick={() => setSearchQuery(search.query)}
                      >
                        {search.type === "user" && <Users className="w-4 h-4 text-muted-foreground" />}
                        {search.type === "hashtag" && <Hash className="w-4 h-4 text-muted-foreground" />}
                        {search.type === "location" && <MapPin className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm">{search.query}</span>
                        <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Searches */}
              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Trending Searches</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((trend, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-primary/30 hover:bg-primary/10"
                        onClick={() => setSearchQuery(trend)}
                      >
                        {trend}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card className="glass border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Suggested for You</h3>
                  <div className="space-y-4">
                    {searchData.users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{user.username}</span>
                            {user.verified && (
                              <Badge variant="secondary" className="w-4 h-4 p-0 flex items-center justify-center">
                                ✓
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                          <p className="text-sm text-muted-foreground">{user.bio}</p>
                        </div>
                        <Button
                          variant={followingUsers.includes(user.id) ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleFollow(user.id)}
                          className={followingUsers.includes(user.id) ? "bg-transparent" : ""}
                        >
                          {followingUsers.includes(user.id) ? "Following" : "Follow"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Search Results */
            <div>
              {isSearching ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              ) : hasResults ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-8">
                    {/* Users Results */}
                    {searchResults.users?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-4">Users</h3>
                        <div className="space-y-4">
                          {searchResults.users.slice(0, 3).map((user: any) => (
                            <Card key={user.id} className="glass border-primary/20">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                      {user.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">{user.username}</span>
                                      {user.verified && (
                                        <Badge
                                          variant="secondary"
                                          className="w-4 h-4 p-0 flex items-center justify-center"
                                        >
                                          ✓
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                                  </div>
                                  <Button
                                    variant={user.isFollowing ? "outline" : "default"}
                                    size="sm"
                                    className={user.isFollowing ? "bg-transparent" : ""}
                                  >
                                    {user.isFollowing ? "Following" : "Follow"}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Posts Results */}
                    {searchResults.posts?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-4">Posts</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {searchResults.posts.slice(0, 6).map((post: any) => (
                            <div key={post.id} className="relative aspect-square group cursor-pointer">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={`Post by ${post.user}`}
                                fill
                                className="object-cover rounded-xl"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <div className="flex items-center space-x-4 text-white">
                                  <div className="flex items-center space-x-1">
                                    <Heart className="w-5 h-5" />
                                    <span className="font-semibold">{post.likes.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-semibold">{post.comments}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hashtags Results */}
                    {searchResults.hashtags?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-4">Hashtags</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {searchResults.hashtags.map((hashtag: any, index: number) => (
                            <Card
                              key={index}
                              className="glass border-primary/20 hover:border-primary/40 cursor-pointer"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                    <Hash className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium text-primary">{hashtag.tag}</span>
                                    <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                                  </div>
                                  {hashtag.trending && (
                                    <Badge className="bg-primary/20 text-primary">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="users">
                    <div className="space-y-4">
                      {searchResults.users?.map((user: any) => (
                        <Card key={user.id} className="glass border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                                <AvatarFallback className="bg-primary/20 text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium text-lg">{user.username}</span>
                                  {user.verified && (
                                    <Badge variant="secondary" className="w-4 h-4 p-0 flex items-center justify-center">
                                      ✓
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                                <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                              </div>
                              <Button
                                variant={user.isFollowing ? "outline" : "default"}
                                className={user.isFollowing ? "bg-transparent" : ""}
                              >
                                {user.isFollowing ? "Following" : "Follow"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="posts">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {searchResults.posts?.map((post: any) => (
                        <div key={post.id} className="relative aspect-square group cursor-pointer">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={`Post by ${post.user}`}
                            fill
                            className="object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <div className="flex items-center space-x-4 text-white">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-5 h-5" />
                                <span className="font-semibold">{post.likes.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-semibold">{post.comments}</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/70 rounded-lg px-2 py-1">
                              <p className="text-white text-xs font-medium">@{post.user}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tags">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[...searchResults.hashtags, ...searchResults.locations].map((item: any, index: number) => (
                        <Card key={index} className="glass border-primary/20 hover:border-primary/40 cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                {item.tag ? (
                                  <Hash className="w-6 h-6 text-primary" />
                                ) : (
                                  <MapPin className="w-6 h-6 text-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className="font-medium text-primary">{item.tag || item.name}</span>
                                <p className="text-sm text-muted-foreground">{item.posts} posts</p>
                                {item.country && <p className="text-xs text-muted-foreground">{item.country}</p>}
                              </div>
                              {item.trending && (
                                <Badge className="bg-primary/20 text-primary">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try searching for something else or check your spelling</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
