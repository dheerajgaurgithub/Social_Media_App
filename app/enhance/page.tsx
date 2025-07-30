"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles, Wand2, Palette, Sun, Contrast, Zap, Download, RotateCcw, Eye } from "lucide-react"

export default function EnhancePage() {
  const [brightness, setBrightness] = useState([0])
  const [contrast, setContrast] = useState([0])
  const [saturation, setSaturation] = useState([0])
  const [aiEnhancement, setAiEnhancement] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState("")

  const presets = [
    { name: "Natural", description: "Subtle enhancement", icon: "🌿" },
    { name: "Vibrant", description: "Bold colors", icon: "🌈" },
    { name: "Vintage", description: "Classic film look", icon: "📸" },
    { name: "Portrait", description: "Perfect for people", icon: "👤" },
    { name: "Landscape", description: "Nature scenes", icon: "🏔️" },
    { name: "Night", description: "Low light boost", icon: "🌙" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6 md:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <span>AI Photo Enhancement</span>
            </h1>
            <p className="text-muted-foreground">Transform your photos with AI-powered enhancement tools</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Area */}
              <Card>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Upload your photo</p>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to select</p>
                    <Button>Choose File</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Area */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Preview</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Before/After
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Upload a photo to start editing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Enhanced
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Share to Feed
                </Button>
              </div>
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-6">
              {/* AI Enhancement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <span>AI Enhancement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enhancement Strength</Label>
                    <Slider
                      value={[aiEnhancement]}
                      onValueChange={(value) => setAiEnhancement(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtle</span>
                      <span>Dramatic</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Apply AI Enhancement
                  </Button>
                </CardContent>
              </Card>

              {/* Presets */}
              <Card>
                <CardHeader>
                  <CardTitle>Enhancement Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant={selectedPreset === preset.name ? "default" : "outline"}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                        onClick={() => setSelectedPreset(preset.name)}
                      >
                        <span className="text-lg">{preset.icon}</span>
                        <span className="text-xs font-medium">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Manual Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="w-5 h-5" />
                    <span>Manual Adjustments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <span>Brightness</span>
                    </Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Contrast className="w-4 h-4" />
                      <span>Contrast</span>
                    </Label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Palette className="w-4 h-4" />
                      <span>Saturation</span>
                    </Label>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      min={-100}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhancement History */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Enhancements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sunset Photo</p>
                      <p className="text-xs text-muted-foreground">Enhanced 2h ago</p>
                    </div>
                    <Badge className="bg-purple-500">AI</Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Portrait Shot</p>
                      <p className="text-xs text-muted-foreground">Enhanced 1d ago</p>
                    </div>
                    <Badge variant="outline">Manual</Badge>
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
