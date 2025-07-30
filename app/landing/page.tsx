"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sparkles,
  Users,
  MessageCircle,
  Camera,
  MapPin,
  Clock,
  Zap,
  Heart,
  Share2,
  Play,
  ArrowRight,
  Star,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Enhanced Posts",
      description: "Transform your photos with AI-powered filters and enhancements",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Communities",
      description: "Join communities that match your interests and passions",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Real-time Messaging",
      description: "Connect instantly with friends through our advanced messaging system",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Local Discovery",
      description: "Discover events, places, and people in your area",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Capsules",
      description: "Create memories that unlock at the perfect moment",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Stories & Reels",
      description: "Share your moments with engaging stories and short videos",
    },
  ]

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50M+", label: "Posts Shared" },
    { number: "1M+", label: "Communities" },
    { number: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-2xl font-bold gradient-text">BvIBE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle className="md:hidden" />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Now with AI Enhancement
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connect, Share, and
            <span className="gradient-text block">Discover with BvIBE</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The next-generation social media platform that brings people together through meaningful connections,
            creative expression, and shared experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Join BvIBE Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Social Media</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BvIBE combines the best of social networking with cutting-edge technology to create an unparalleled user
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">{feature.icon}</div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose BvIBE?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                BvIBE isn't just another social media platform. We're building the future of digital connection with
                innovative features that put users first.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>Privacy-first approach with end-to-end encryption</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-3" />
                  <span>Global community with local discovery</span>
                </div>
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-3" />
                  <span>Seamless experience across all devices</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-3" />
                  <span>AI-powered content curation and enhancement</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <Heart className="h-8 w-8 text-red-500 mb-2" />
                    <div className="text-sm font-medium">Engagement</div>
                    <div className="text-2xl font-bold">+150%</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <Share2 className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-sm font-medium">Sharing</div>
                    <div className="text-2xl font-bold">+200%</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <Users className="h-8 w-8 text-green-500 mb-2" />
                    <div className="text-sm font-medium">Connections</div>
                    <div className="text-2xl font-bold">+300%</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <Clock className="h-8 w-8 text-purple-500 mb-2" />
                    <div className="text-sm font-medium">Time Spent</div>
                    <div className="text-2xl font-bold">+180%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join the BvIBE Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey today and discover a new way to connect with the world.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">BvIBE</span>
              </div>
              <p className="text-muted-foreground">Connecting the world through meaningful social experiences.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BvIBE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
