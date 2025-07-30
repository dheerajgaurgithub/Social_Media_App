"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, TrendingUp, Camera, Utensils, Dumbbell, Music, Palette, Plane } from "lucide-react"

const communities = [
  {
    id: 1,
    name: "SF Photography",
    description: "Photographers in San Francisco sharing tips and locations",
    members: 2847,
    posts: 1234,
    icon: Camera,
    color: "bg-blue-500",
    trending: true,
    joined: true,
  },
  {
    id: 2,
    name: "Foodie Bay Area",
    description: "Best restaurants and food spots around the Bay Area",
    members: 5621,
    posts: 3456,
    icon: Utensils,
    color: "bg-orange-500",
    trending: true,
    joined: false,
  },
  {
    id: 3,
    name: "Fitness Warriors",
    description: "Motivation and workout tips for fitness enthusiasts",
    members: 8934,
    posts: 5678,
    icon: Dumbbell,
    color: "bg-green-500",
    trending: false,
    joined: true,
  },
  {
    id: 4,
    name: "Music Makers",
    description: "Musicians and music lovers sharing their passion",
    members: 3456,
    posts: 2345,
    icon: Music,
    color: "bg-purple-500",
    trending: false,
    joined: false,
  },
  {
    id: 5,
    name: "Digital Artists",
    description: "Showcase your digital art and get feedback",
    members: 4567,
    posts: 3456,
    icon: Palette,
    color: "bg-pink-500",
    trending: true,
    joined: false,
  },
  {
    id: 6,
    name: "Travel Buddies",
    description: "Find travel companions and share experiences",
    members: 6789,
    posts: 4567,
    icon: Plane,
    color: "bg-cyan-500",
    trending: false,
    joined: true,
  },
]

const trendingTopics = [
  { name: "#GoldenHourChallenge", posts: 1234 },
  { name: "#LocalEats", posts: 892 },
  { name: "#WorkoutMotivation", posts: 756 },
  { name: "#DigitalArt2024", posts: 634 },
  { name: "#TravelTuesday", posts: 523 },
]

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6 md:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Communities</h1>
            <p className="text-muted-foreground">Connect with like-minded people and discover local communities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Communities Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Discover Communities</h2>
                <Button variant="outline">View All</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communities.map((community) => {
                  const IconComponent = community.icon
                  return (
                    <Card key={community.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-lg ${community.color} flex items-center justify-center`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg flex items-center space-x-2">
                                <span>{community.name}</span>
                                {community.trending && (
                                  <Badge variant="secondary" className="text-xs">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </CardTitle>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{community.members.toLocaleString()}</span>
                                </div>
                                <span>{community.posts.toLocaleString()} posts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                        <Button className="w-full" variant={community.joined ? "outline" : "default"}>
                          {community.joined ? "Joined" : "Join Community"}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Trending Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                        {topic.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Your Communities */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Communities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communities
                    .filter((c) => c.joined)
                    .map((community) => {
                      const IconComponent = community.icon
                      return (
                        <div key={community.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${community.color} flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{community.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {community.members.toLocaleString()} members
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </CardContent>
              </Card>

              {/* Local Communities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Near You</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Discover communities in San Francisco, CA</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mission District Foodies</span>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SOMA Tech Meetup</span>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Golden Gate Runners</span>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
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
