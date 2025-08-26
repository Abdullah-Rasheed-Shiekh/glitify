"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Palette, Sparkles, ArrowRight, Github, Twitter } from "lucide-react"
import ThreeBackground from "./three-background"

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Glitch Effects",
      description: "Create stunning digital distortions with customizable intensity and patterns",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Cartoon Filters",
      description: "Transform photos into artistic cartoon-style illustrations with edge detection",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Advanced Effects",
      description: "Apply pixelation, noise, brightness, contrast, and color manipulation",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThreeBackground />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-glow">
              <span className="glitch-text">Glitchify</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">Edit. Distort. Create.</p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12">
              Transform your images with powerful glitch effects, cartoon filters, and advanced editing tools. Create
              stunning digital art with our browser-based image editor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg pulse-glow"
            >
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg bg-transparent"
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">Powerful Creative Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 float-animation"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-4 text-accent transition-transform duration-300 ${
                      hoveredFeature === index ? "scale-110" : ""
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-card/30 backdrop-blur-sm border-accent/30">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-glow">Ready to Create Something Amazing?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators using Glitchify to transform their images into digital masterpieces.
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-4 text-lg pulse-glow"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-2xl font-bold text-glow">Glitchify</h4>
              <p className="text-muted-foreground">Edit. Distort. Create.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground">© 2024 Glitchify. Built with Next.js and creativity.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
