"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, MessageCircle, Camera, Heart, Zap, ArrowRight, Star, Globe, Shield } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/main")
    }
  }, [router])

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Enhance your photos and videos with cutting-edge AI technology",
      color: "text-purple-500",
    },
    {
      icon: Users,
      title: "Smart Communities",
      description: "Connect with like-minded people through intelligent matching",
      color: "text-blue-500",
    },
    {
      icon: MessageCircle,
      title: "Real-time Messaging",
      description: "Chat instantly with friends and discover new connections",
      color: "text-green-500",
    },
    {
      icon: Camera,
      title: "Stories & Reels",
      description: "Share your moments with beautiful stories and engaging reels",
      color: "text-pink-500",
    },
    {
      icon: Heart,
      title: "Mood-Based Feed",
      description: "Content that adapts to your current mood and interests",
      color: "text-red-500",
    },
    {
      icon: Globe,
      title: "Local Discovery",
      description: "Discover events, places, and people in your area",
      color: "text-indigo-500",
    },
  ]

  const stats = [
    { label: "Active Users", value: "10M+", icon: Users },
    { label: "Posts Shared", value: "500M+", icon: Camera },
    { label: "Messages Sent", value: "2B+", icon: MessageCircle },
    { label: "Communities", value: "50K+", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white font-bold shadow-lg">
              B
            </div>
            <span className="text-xl font-bold gradient-text">BvIBE</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="gradient-bg">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            <Zap className="w-3 h-3 mr-1" />
            Next Generation Social Media
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connect, Share, <span className="gradient-text">Discover</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience social media like never before with AI-powered features, mood-based content, and meaningful
            connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gradient-bg text-lg px-8">
                Join BvIBE Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">BvIBE</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make BvIBE the most innovative social platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Millions of <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-xl text-muted-foreground">Be part of the fastest-growing social community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Star className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators, artists, and innovators who are already building their communities on BvIBE.
            </p>
            <Link href="/register">
              <Button size="lg" className="gradient-bg text-lg px-12">
                Create Your Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg text-white font-bold">
                B
              </div>
              <span className="text-xl font-bold gradient-text">BvIBE</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 BvIBE. All rights reserved.</span>
              <Shield className="w-4 h-4" />
              <span>Privacy & Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
