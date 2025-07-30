"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  UserPlus,
  Users,
  Sparkles,
  Clock,
  Bell,
  Settings,
  Check,
  X,
  Trophy,
  MapPin,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      username: "alex_creates",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content: "liked your photo",
    post: {
      image: "/placeholder.svg?height=60&width=60&text=Post",
      caption: "Golden hour magic",
    },
    time: "2m ago",
    isRead: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      username: "sarah_travels",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content: 'commented: "Amazing shot! What camera did you use?"',
    post: {
      image: "/placeholder.svg?height=60&width=60&text=Post",
      caption: "Mountain adventure",
    },
    time: "5m ago",
    isRead: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      username: "mike_fitness",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content: "started following you",
    time: "1h ago",
    isRead: true,
  },
  {
    id: 4,
    type: "collaboration",
    user: {
      username: "emma_art",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content: "invited you to collaborate on a post",
    time: "2h ago",
    isRead: false,
  },
  {
    id: 5,
    type: "ai_enhancement",
    content: "Your photo has been enhanced with AI",
    post: {
      image: "/placeholder.svg?height=60&width=60&text=Enhanced",
      caption: "Sunset vibes",
    },
    time: "3h ago",
    isRead: true,
  },
  {
    id: 6,
    type: "achievement",
    content: 'You unlocked the "AI Pioneer" achievement!',
    achievement: {
      name: "AI Pioneer",
      icon: "🤖",
      description: "Used AI enhancement 50 times",
    },
    time: "1d ago",
    isRead: true,
  },
  {
    id: 7,
    type: "time_capsule",
    content: "Your time capsule post is ready to unlock",
    post: {
      image: "/placeholder.svg?height=60&width=60&text=Capsule",
      caption: "New Year memories",
    },
    time: "2d ago",
    isRead: false,
  },
  {
    id: 8,
    type: "community",
    content: "New post in SF Photography community",
    community: {
      name: "SF Photography",
      image: "/placeholder.svg?height=40&width=40&text=Community",
    },
    time: "3d ago",
    isRead: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="w-5 h-5 text-red-500" />
    case "comment":
      return <MessageCircle className="w-5 h-5 text-blue-500" />
    case "follow":
      return <UserPlus className="w-5 h-5 text-green-500" />
    case "collaboration":
      return <Users className="w-5 h-5 text-purple-500" />
    case "ai_enhancement":
      return <Sparkles className="w-5 h-5 text-purple-500" />
    case "achievement":
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case "time_capsule":
      return <Clock className="w-5 h-5 text-orange-500" />
    case "community":
      return <MapPin className="w-5 h-5 text-cyan-500" />
    default:
      return <Bell className="w-5 h-5 text-muted-foreground" />
  }
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const unreadCount = notificationList.filter((n) => !n.isRead).length

  const filteredNotifications = notificationList.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "interactions") return ["like", "comment", "follow"].includes(notif.type)
    if (activeTab === "features")
      return ["collaboration", "ai_enhancement", "achievement", "time_capsule"].includes(notif.type)
    if (activeTab === "communities") return notif.type === "community"
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6 md:ml-64">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Bell className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <Check className="w-4 h-4 mr-2" />
                  Mark all as read
                </Button>
              )}
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>All</span>
                {unreadCount > 0 && (
                  <Badge className="ml-1 w-5 h-5 p-0 flex items-center justify-center text-xs">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="interactions" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Interactions</span>
                <span className="sm:hidden">Social</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Features</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
              <TabsTrigger value="communities" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Communities</span>
                <span className="sm:hidden">Groups</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                      <p className="text-muted-foreground">You're all caught up! Check back later for new updates.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        !notification.isRead ? "border-l-4 border-l-primary bg-muted/30" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                {notification.user ? (
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage
                                        src={notification.user.avatar || "/placeholder.svg"}
                                        alt={notification.user.username}
                                      />
                                      <AvatarFallback>
                                        {notification.user.username.slice(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold">@{notification.user.username}</span>
                                    {notification.user.isVerified && (
                                      <Badge
                                        variant="secondary"
                                        className="w-4 h-4 p-0 flex items-center justify-center"
                                      >
                                        ✓
                                      </Badge>
                                    )}
                                  </div>
                                ) : (
                                  <div className="mb-1">
                                    <span className="font-semibold text-primary">Lumina</span>
                                  </div>
                                )}

                                <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>

                                {/* Achievement Details */}
                                {notification.achievement && (
                                  <div className="bg-muted/50 rounded-lg p-3 mb-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-2xl">{notification.achievement.icon}</span>
                                      <div>
                                        <p className="font-semibold">{notification.achievement.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          {notification.achievement.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Community Details */}
                                {notification.community && (
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                      <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium">{notification.community.name}</span>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">{notification.time}</span>

                                  {/* Action Buttons */}
                                  {notification.type === "collaboration" && (
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        <X className="w-3 h-3 mr-1" />
                                        Decline
                                      </Button>
                                      <Button size="sm">
                                        <Check className="w-3 h-3 mr-1" />
                                        Accept
                                      </Button>
                                    </div>
                                  )}

                                  {notification.type === "follow" && (
                                    <Button size="sm" variant="outline">
                                      Follow Back
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {/* Post Thumbnail */}
                              {notification.post && (
                                <div className="flex-shrink-0 ml-4">
                                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                                      <span className="text-xs text-muted-foreground">Post</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Unread Indicator */}
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
