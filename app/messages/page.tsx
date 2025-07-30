"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, ImageIcon, Smile, Phone, Video } from "lucide-react"

const conversations = [
  {
    id: 1,
    user: { name: "Alex Johnson", username: "alex_photo", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Hey! Love your latest post 📸",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    user: { name: "Sarah Wilson", username: "sarah_travels", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Thanks for the collaboration!",
    time: "1h",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    user: { name: "Mike Chen", username: "mike_fitness", avatar: "/placeholder.svg?height=40&width=40" },
    lastMessage: "Voice message",
    time: "3h",
    unread: 1,
    online: true,
  },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: "alex_photo", content: "Hey! Love your latest post 📸", time: "2:30 PM", type: "text" },
    { id: 2, sender: "me", content: "Thank you! It was taken during golden hour", time: "2:32 PM", type: "text" },
    {
      id: 3,
      sender: "alex_photo",
      content: "The colors are amazing! Did you use AI enhancement?",
      time: "2:33 PM",
      type: "text",
    },
    { id: 4, sender: "me", content: "Yes! Lumina's AI enhancement is incredible", time: "2:35 PM", type: "text" },
    { id: 5, sender: "alex_photo", content: "", time: "2:36 PM", type: "voice", duration: "0:15" },
  ])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "me",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Conversations List */}
            <div className="w-80 border-r bg-muted/20">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Messages</h2>
              </div>
              <div className="overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation)}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedChat.id === conversation.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={conversation.user.avatar || "/placeholder.svg"}
                            alt={conversation.user.name}
                          />
                          <AvatarFallback>
                            {conversation.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.user.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="w-5 h-5 p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChat.user.avatar || "/placeholder.svg"} alt={selectedChat.user.name} />
                    <AvatarFallback>
                      {selectedChat.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedChat.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedChat.online ? "Active now" : "Active 1h ago"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.type === "text" ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mic className="w-4 h-4" />
                          <span className="text-sm">{message.duration}</span>
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button variant="ghost" size="icon">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button size="icon" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
