"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Palette, Sparkles, ImageIcon, Layers, Wand2, ArrowRight, Github, Twitter, Instagram } from "lucide-react"
import { ThreeBackground } from "@/components/three-background"
import { ImageEditor } from "@/components/image-editor"

export default function GlitchifyApp() {
  const [showEditor, setShowEditor] = useState(false)

  if (showEditor) {
    return <ImageEditor onBack={() => setShowEditor(false)} />
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ThreeBackground />

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Glitchify</span>
        </div>
        <nav className="hidden md:flex space-x-6">
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 border-orange-500/30 text-orange-400 bg-orange-500/10">
            ✨ AI-Powered Image Manipulation
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent animate-pulse">
            Glitchify
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">Edit. Distort. Create.</p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your images with cutting-edge glitch effects, cartoon filters, and professional editing tools.
            Unleash your creativity with our powerful web-based image editor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setShowEditor(true)}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
            >
              Start Creating
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional-grade tools designed for creators, artists, and digital enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Glitch Effects Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Glitch Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Create stunning digital distortions with customizable glitch intensity, horizontal shifts, and RGB
                  channel separation for that perfect cyberpunk aesthetic.
                </p>
              </CardContent>
            </Card>

            {/* Cartoon Filter Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Cartoon Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Transform photos into cartoon-style artwork with advanced edge detection, color quantization, and
                  customizable line thickness controls.
                </p>
              </CardContent>
            </Card>

            {/* Professional Tools Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Professional Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Fine-tune your images with precision controls for brightness, contrast, saturation, and advanced color
                  manipulation tools.
                </p>
              </CardContent>
            </Card>

            {/* Pixelation Effects Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Pixelation Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Create retro 8-bit style artwork with customizable pixel sizes, perfect for game assets, digital art,
                  and nostalgic aesthetics.
                </p>
              </CardContent>
            </Card>

            {/* Noise & Texture Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Noise & Texture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Add film grain, digital noise, and texture overlays to give your images character and vintage appeal
                  with precise control.
                </p>
              </CardContent>
            </Card>

            {/* Layer Management Card */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Smart Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  Unlimited undo/redo, real-time preview, drag-and-drop support, and instant export options for seamless
                  creative workflow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Create?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who use Glitchify to transform their images into digital masterpieces.
          </p>
          <Button
            onClick={() => setShowEditor(true)}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
          >
            Launch Editor
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Glitchify</span>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Glitchify. All rights reserved. Built with Next.js and creativity.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
