"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Lock, Unlock, Plus, Gift, Star, Timer } from "lucide-react"

const timeCapsules = [
  {
    id: 1,
    title: "New Year Memories 2024",
    description: "Special moments from New Year's Eve celebration",
    unlockDate: "2025-01-01",
    isLocked: true,
    daysLeft: 45,
    image: "/placeholder.svg?height=200&width=300&text=NYE+2024",
    author: "me",
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    title: "Summer Vacation",
    description: "Beach memories from our amazing trip",
    unlockDate: "2024-12-01",
    isLocked: false,
    daysLeft: 0,
    image: "/placeholder.svg?height=200&width=300&text=Summer+Trip",
    author: "me",
    likes: 234,
    comments: 45,
  },
  {
    id: 3,
    title: "Birthday Surprise",
    description: "A special message for future me",
    unlockDate: "2025-03-15",
    isLocked: true,
    daysLeft: 120,
    image: "/placeholder.svg?height=200&width=300&text=Birthday",
    author: "me",
    likes: 0,
    comments: 0,
  },
]

const sharedCapsules = [
  {
    id: 4,
    title: "College Graduation",
    description: "Memories from our graduation day",
    unlockDate: "2024-12-15",
    isLocked: false,
    daysLeft: 0,
    image: "/placeholder.svg?height=200&width=300&text=Graduation",
    author: {
      username: "sarah_travels",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 456,
    comments: 89,
  },
  {
    id: 5,
    title: "Wedding Day",
    description: "Our special day captured forever",
    unlockDate: "2025-06-20",
    isLocked: true,
    daysLeft: 200,
    image: "/placeholder.svg?height=200&width=300&text=Wedding",
    author: {
      username: "alex_creates",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 0,
    comments: 0,
  },
]

export default function TimeCapsulePage() {
  const [activeTab, setActiveTab] = useState("my-capsules")

  const unlockCapsule = (id: number) => {
    console.log("Unlocking capsule:", id)
    // Here you would handle the unlock logic
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
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Time Capsules</h1>
                <p className="text-muted-foreground">Memories waiting to be unlocked</p>
              </div>
            </div>
            <Button className="gradient-bg text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Capsule
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass border-primary/20">
              <CardContent className="p-4 text-center">
                <Lock className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Locked Capsules</p>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20">
              <CardContent className="p-4 text-center">
                <Unlock className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Unlocked Capsules</p>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20">
              <CardContent className="p-4 text-center">
                <Gift className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Ready to Unlock</p>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                <p className="text-2xl font-bold">690</p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="my-capsules" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>My Capsules</span>
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex items-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>Shared with Me</span>
              </TabsTrigger>
              <TabsTrigger value="discover" className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Discover</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-capsules">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeCapsules.map((capsule) => (
                  <Card
                    key={capsule.id}
                    className={`glass border-primary/20 hover:border-primary/40 cursor-pointer ${
                      capsule.isLocked ? "opacity-75" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-t-lg flex items-center justify-center">
                          <div className="text-center">
                            {capsule.isLocked ? (
                              <Lock className="w-12 h-12 mx-auto text-primary mb-2" />
                            ) : (
                              <Unlock className="w-12 h-12 mx-auto text-green-500 mb-2" />
                            )}
                            <p className="text-sm text-muted-foreground">{capsule.isLocked ? "Locked" : "Unlocked"}</p>
                          </div>
                        </div>

                        {capsule.isLocked && (
                          <Badge className="absolute top-2 right-2 bg-primary/90 text-white">
                            <Timer className="w-3 h-3 mr-1" />
                            {capsule.daysLeft} days
                          </Badge>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold">{capsule.title}</h3>
                          <p className="text-sm text-muted-foreground">{capsule.description}</p>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Unlocks: {new Date(capsule.unlockDate).toLocaleDateString()}</span>
                        </div>

                        {!capsule.isLocked && (
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>❤️ {capsule.likes}</span>
                            <span>💬 {capsule.comments}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          {capsule.isLocked ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent"
                              disabled={capsule.daysLeft > 0}
                            >
                              {capsule.daysLeft > 0 ? `${capsule.daysLeft} days left` : "Ready to Unlock"}
                            </Button>
                          ) : (
                            <Button size="sm" className="w-full" onClick={() => unlockCapsule(capsule.id)}>
                              View Capsule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shared">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedCapsules.map((capsule) => (
                  <Card
                    key={capsule.id}
                    className={`glass border-primary/20 hover:border-primary/40 cursor-pointer ${
                      capsule.isLocked ? "opacity-75" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-t-lg flex items-center justify-center">
                          <div className="text-center">
                            {capsule.isLocked ? (
                              <Lock className="w-12 h-12 mx-auto text-primary mb-2" />
                            ) : (
                              <Unlock className="w-12 h-12 mx-auto text-green-500 mb-2" />
                            )}
                            <p className="text-sm text-muted-foreground">{capsule.isLocked ? "Locked" : "Unlocked"}</p>
                          </div>
                        </div>

                        {capsule.isLocked && (
                          <Badge className="absolute top-2 right-2 bg-primary/90 text-white">
                            <Timer className="w-3 h-3 mr-1" />
                            {capsule.daysLeft} days
                          </Badge>
                        )}
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={capsule.author.avatar || "/placeholder.svg"}
                              alt={capsule.author.username}
                            />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {capsule.author.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">@{capsule.author.username}</span>
                        </div>

                        <div>
                          <h3 className="font-semibold">{capsule.title}</h3>
                          <p className="text-sm text-muted-foreground">{capsule.description}</p>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Unlocks: {new Date(capsule.unlockDate).toLocaleDateString()}</span>
                        </div>

                        {!capsule.isLocked && (
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>❤️ {capsule.likes}</span>
                            <span>💬 {capsule.comments}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          {capsule.isLocked ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent"
                              disabled={capsule.daysLeft > 0}
                            >
                              {capsule.daysLeft > 0 ? `${capsule.daysLeft} days left` : "Ready to Unlock"}
                            </Button>
                          ) : (
                            <Button size="sm" className="w-full" onClick={() => unlockCapsule(capsule.id)}>
                              View Capsule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discover">
              <div className="text-center py-12">
                <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Discover Public Time Capsules</h3>
                <p className="text-muted-foreground mb-6">Explore time capsules shared by the community</p>
                <Button variant="outline" className="bg-transparent">
                  Coming Soon
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
