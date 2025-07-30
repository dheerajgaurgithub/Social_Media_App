"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Calendar, Clock, Star, Navigation, Filter } from "lucide-react"
import { Post } from "@/components/post"

const localPosts = [
  {
    id: 1,
    user: {
      username: "sf_foodie",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    image: "/placeholder.svg?height=600&width=600&text=Local+Food",
    caption: "Amazing brunch at this hidden gem in Mission District! 🥞",
    likes: 234,
    comments: 45,
    timeAgo: "1h",
    mood: "food",
    isCollaborative: false,
    aiEnhanced: false,
    location: "Mission District, SF",
    distance: "0.5 miles",
  },
  {
    id: 2,
    user: {
      username: "bay_area_hiker",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    image: "/placeholder.svg?height=600&width=600&text=Local+Hike",
    caption: "Perfect morning hike at Twin Peaks! The view never gets old 🏔️",
    likes: 456,
    comments: 67,
    timeAgo: "3h",
    mood: "adventure",
    isCollaborative: false,
    aiEnhanced: true,
    location: "Twin Peaks, SF",
    distance: "2.1 miles",
  },
]

const localEvents = [
  {
    id: 1,
    title: "Photography Meetup",
    location: "Golden Gate Park",
    date: "Tomorrow, 2:00 PM",
    attendees: 24,
    category: "Photography",
    distance: "1.2 miles",
  },
  {
    id: 2,
    title: "Food Truck Festival",
    location: "Dolores Park",
    date: "This Weekend",
    attendees: 156,
    category: "Food",
    distance: "0.8 miles",
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    location: "SOMA District",
    date: "Friday, 7:00 PM",
    attendees: 89,
    category: "Art",
    distance: "1.5 miles",
  },
]

const nearbyPlaces = [
  {
    id: 1,
    name: "Blue Bottle Coffee",
    category: "Coffee Shop",
    rating: 4.5,
    distance: "0.3 miles",
    posts: 234,
  },
  {
    id: 2,
    name: "Lombard Street",
    category: "Tourist Attraction",
    rating: 4.8,
    distance: "1.1 miles",
    posts: 1567,
  },
  {
    id: 3,
    name: "Fisherman's Wharf",
    category: "Waterfront",
    rating: 4.2,
    distance: "2.3 miles",
    posts: 2890,
  },
]

export default function LocalPage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [locationEnabled, setLocationEnabled] = useState(true)

  const enableLocation = () => {
    setLocationEnabled(true)
  }

  if (!locationEnabled) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 max-w-4xl mx-auto px-4 py-6 md:ml-64">
            <div className="text-center py-20">
              <MapPin className="w-24 h-24 mx-auto text-muted-foreground mb-6 opacity-50" />
              <h1 className="text-3xl font-bold mb-4">Discover Local Content</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Enable location services to see posts, events, and places near you
              </p>
              <Button onClick={enableLocation} size="lg" className="gradient-bg text-white">
                <Navigation className="w-5 h-5 mr-2" />
                Enable Location
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6 md:ml-64">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Local Discovery</h1>
                <p className="text-muted-foreground flex items-center space-x-1">
                  <span>📍 San Francisco, CA</span>
                  <Badge variant="outline" className="ml-2">
                    Location Active
                  </Badge>
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon" className="bg-transparent border-primary/20">
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <span>📱</span>
                <span>Posts</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="places" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Places</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {localPosts.map((post) => (
                    <div key={post.id} className="relative">
                      <Post post={post} />
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-white">
                        <MapPin className="w-3 h-3 mr-1" />
                        {post.distance}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="glass border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Local Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posts nearby</span>
                        <span className="font-semibold">1.2K+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active users</span>
                        <span className="font-semibold">450+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Events today</span>
                        <span className="font-semibold">12</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trending Locations */}
                  <Card className="glass border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Trending Nearby</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {nearbyPlaces.slice(0, 3).map((place) => (
                        <div key={place.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{place.name}</p>
                            <p className="text-xs text-muted-foreground">{place.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{place.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{place.distance}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localEvents.map((event) => (
                  <Card key={event.id} className="glass border-primary/20 hover:border-primary/40 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge variant="outline" className="mt-2">
                            {event.category}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-primary font-medium">{event.distance} away</span>
                          <Button size="sm">Join Event</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="places">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyPlaces.map((place) => (
                  <Card key={place.id} className="glass border-primary/20 hover:border-primary/40 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{place.name}</h3>
                          <p className="text-muted-foreground">{place.category}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{place.rating}</span>
                          </div>
                          <span className="text-sm text-primary font-medium">{place.distance}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">{place.posts} posts</span>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            View Posts
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
