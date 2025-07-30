"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Upload, Sparkles, Users, Clock, MapPin, Palette, Wand2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePage() {
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [mood, setMood] = useState("")
  const [aiEnhance, setAiEnhance] = useState(false)
  const [collaborative, setCollaborative] = useState(false)
  const [timeCapsule, setTimeCapsule] = useState(false)
  const [unlockDate, setUnlockDate] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6 md:ml-64">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Create New Post</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Drag photos and videos here</p>
                <p className="text-sm text-muted-foreground mb-4">or</p>
                <Button>Select from computer</Button>
              </div>

              {/* AI Enhancement */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <div>
                    <Label className="text-base font-medium">AI Enhancement</Label>
                    <p className="text-sm text-muted-foreground">Automatically enhance colors, lighting, and details</p>
                  </div>
                </div>
                <Switch checked={aiEnhance} onCheckedChange={setAiEnhance} />
              </div>

              {/* Collaborative Post */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <Label className="text-base font-medium">Collaborative Post</Label>
                    <p className="text-sm text-muted-foreground">Allow friends to contribute to this post</p>
                  </div>
                </div>
                <Switch checked={collaborative} onCheckedChange={setCollaborative} />
              </div>

              {/* Time Capsule */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <Label className="text-base font-medium">Time Capsule</Label>
                    <p className="text-sm text-muted-foreground">Schedule this post to unlock in the future</p>
                  </div>
                </div>
                <Switch checked={timeCapsule} onCheckedChange={setTimeCapsule} />
              </div>

              {timeCapsule && (
                <div className="space-y-2">
                  <Label htmlFor="unlock-date">Unlock Date</Label>
                  <Input
                    id="unlock-date"
                    type="date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                  />
                </div>
              )}

              {/* Caption */}
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Add Location</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Where was this taken?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Mood */}
              <div className="space-y-2">
                <Label>Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="happy">😊 Happy</SelectItem>
                    <SelectItem value="chill">😌 Chill</SelectItem>
                    <SelectItem value="adventure">🏔️ Adventure</SelectItem>
                    <SelectItem value="creative">🎨 Creative</SelectItem>
                    <SelectItem value="food">🍕 Food</SelectItem>
                    <SelectItem value="fitness">💪 Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Advanced Editing */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Advanced Editing</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    Adjust
                  </Button>
                  <Button variant="outline" size="sm">
                    Crop
                  </Button>
                  <Button variant="outline" size="sm">
                    Effects
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save Draft
                </Button>
                <Button className="flex-1">Share Post</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
