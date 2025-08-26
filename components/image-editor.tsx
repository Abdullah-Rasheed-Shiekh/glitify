"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Upload, Download, RotateCcw, Undo, Redo, ArrowLeft, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageEditorProps {
  onBack: () => void
}

export function ImageEditor({ onBack }: ImageEditorProps) {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null)
  const [undoStack, setUndoStack] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Effect parameters
  const [brightness, setBrightness] = useState([1])
  const [contrast, setContrast] = useState([1])
  const [blur, setBlur] = useState([0])
  const [glitchIntensity, setGlitchIntensity] = useState([5])
  const [pixelSize, setPixelSize] = useState([10])
  const [noiseAmount, setNoiseAmount] = useState([0.05])
  const [cartoonLineSize, setCartoonLineSize] = useState([7])
  const [cartoonColors, setCartoonColors] = useState([8])

  const pushUndo = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setUndoStack((prev) => [...prev.slice(-9), imageData])
    setRedoStack([])
  }, [])

  const loadImage = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setOriginalImage(img)
        setCurrentImage(img)
        drawImageToCanvas(img)
        setUndoStack([])
        setRedoStack([])
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize canvas to fit image while maintaining aspect ratio
    const maxWidth = 800
    const maxHeight = 600
    let { width, height } = img

    if (width > maxWidth) {
      height = (height * maxWidth) / width
      width = maxWidth
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height
      height = maxHeight
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)
  }, [])

  const applyCartoonEffect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !currentImage) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Simple edge detection and color quantization
    const quantizedData = new Uint8ClampedArray(data.length)
    const colorStep = Math.floor(255 / cartoonColors[0])

    for (let i = 0; i < data.length; i += 4) {
      // Color quantization
      quantizedData[i] = Math.floor(data[i] / colorStep) * colorStep // R
      quantizedData[i + 1] = Math.floor(data[i + 1] / colorStep) * colorStep // G
      quantizedData[i + 2] = Math.floor(data[i + 2] / colorStep) * colorStep // B
      quantizedData[i + 3] = data[i + 3] // A
    }

    const newImageData = new ImageData(quantizedData, canvas.width, canvas.height)
    ctx.putImageData(newImageData, 0, 0)

    toast({ title: "Cartoon effect applied!" })
  }, [currentImage, cartoonColors, pushUndo, toast])

  const applyGlitchEffect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const width = canvas.width
    const height = canvas.height

    // Apply glitch effect by shifting random horizontal slices
    for (let i = 0; i < glitchIntensity[0]; i++) {
      const sliceHeight = Math.floor(Math.random() * (height / 10)) + 5
      const startY = Math.floor(Math.random() * (height - sliceHeight))
      const offset = Math.floor(Math.random() * 20) - 10

      // Create temporary canvas for the slice
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = width
      tempCanvas.height = sliceHeight
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) continue

      // Copy slice
      const sliceData = ctx.getImageData(0, startY, width, sliceHeight)
      tempCtx.putImageData(sliceData, 0, 0)

      // Draw shifted slice back
      ctx.drawImage(tempCanvas, offset, startY)
    }

    toast({ title: "Glitch effect applied!" })
  }, [glitchIntensity, pushUndo, toast])

  const applyBrightnessContrast = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness and contrast
      data[i] = Math.min(255, Math.max(0, (data[i] - 128) * contrast[0] + 128 + (brightness[0] - 1) * 255))
      data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * contrast[0] + 128 + (brightness[0] - 1) * 255))
      data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * contrast[0] + 128 + (brightness[0] - 1) * 255))
    }

    ctx.putImageData(imageData, 0, 0)
    toast({ title: "Brightness/Contrast applied!" })
  }, [brightness, contrast, pushUndo, toast])

  const applyPixelate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const size = pixelSize[0]

    // Create pixelated effect
    for (let y = 0; y < canvas.height; y += size) {
      for (let x = 0; x < canvas.width; x += size) {
        const pixelData = ctx.getImageData(x, y, 1, 1).data
        ctx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
        ctx.fillRect(x, y, size, size)
      }
    }

    toast({ title: "Pixelate effect applied!" })
  }, [pixelSize, pushUndo, toast])

  const applyNoise = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 255 * noiseAmount[0]
      data[i] = Math.min(255, Math.max(0, data[i] + noise))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
    }

    ctx.putImageData(imageData, 0, 0)
    toast({ title: "Noise effect applied!" })
  }, [noiseAmount, pushUndo, toast])

  const invertColors = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    pushUndo()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i] // R
      data[i + 1] = 255 - data[i + 1] // G
      data[i + 2] = 255 - data[i + 2] // B
    }

    ctx.putImageData(imageData, 0, 0)
    toast({ title: "Colors inverted!" })
  }, [pushUndo, toast])

  const undo = useCallback(() => {
    if (undoStack.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setRedoStack((prev) => [...prev, currentState])

    const previousState = undoStack[undoStack.length - 1]
    setUndoStack((prev) => prev.slice(0, -1))

    ctx.putImageData(previousState, 0, 0)
  }, [undoStack])

  const redo = useCallback(() => {
    if (redoStack.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setUndoStack((prev) => [...prev, currentState])

    const nextState = redoStack[redoStack.length - 1]
    setRedoStack((prev) => prev.slice(0, -1))

    ctx.putImageData(nextState, 0, 0)
  }, [redoStack])

  const resetImage = useCallback(() => {
    if (!originalImage) return
    pushUndo()
    drawImageToCanvas(originalImage)
    toast({ title: "Image reset to original!" })
  }, [originalImage, pushUndo, drawImageToCanvas, toast])

  const saveImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "glitchify-edited.png"
    link.href = canvas.toDataURL()
    link.click()

    toast({ title: "Image saved!" })
  }, [toast])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      loadImage(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      loadImage(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Glitchify Editor</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Canvas</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Load Image
                  </Button>
                  <Button
                    onClick={saveImage}
                    variant="outline"
                    disabled={!currentImage}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={undo}
                    variant="outline"
                    disabled={undoStack.length === 0}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Undo className="w-4 h-4 mr-2" />
                    Undo
                  </Button>
                  <Button
                    onClick={redo}
                    variant="outline"
                    disabled={redoStack.length === 0}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Redo className="w-4 h-4 mr-2" />
                    Redo
                  </Button>
                  <Button
                    onClick={resetImage}
                    variant="outline"
                    disabled={!originalImage}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center bg-gray-800/50"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {currentImage ? (
                    <canvas ref={canvasRef} className="max-w-full max-h-[600px] border border-gray-700 rounded" />
                  ) : (
                    <div>
                      <p className="text-gray-400 mb-4">Drag and drop an image here or click Load Image</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
                <TabsTrigger value="basic" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="effects"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Effects
                </TabsTrigger>
                <TabsTrigger
                  value="cartoon"
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  Cartoon
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Basic Adjustments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Brightness: {brightness[0].toFixed(2)}</Label>
                      <Slider
                        value={brightness}
                        onValueChange={setBrightness}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Contrast: {contrast[0].toFixed(2)}</Label>
                      <Slider
                        value={contrast}
                        onValueChange={setContrast}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={applyBrightnessContrast}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Apply Brightness/Contrast
                    </Button>
                    <Button
                      onClick={invertColors}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Invert Colors
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Glitch & Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Glitch Intensity: {glitchIntensity[0]}</Label>
                      <Slider
                        value={glitchIntensity}
                        onValueChange={setGlitchIntensity}
                        min={1}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={applyGlitchEffect}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Apply Glitch
                    </Button>

                    <div>
                      <Label className="text-gray-300">Pixel Size: {pixelSize[0]}</Label>
                      <Slider
                        value={pixelSize}
                        onValueChange={setPixelSize}
                        min={5}
                        max={50}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={applyPixelate}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Apply Pixelate
                    </Button>

                    <div>
                      <Label className="text-gray-300">Noise Amount: {noiseAmount[0].toFixed(3)}</Label>
                      <Slider
                        value={noiseAmount}
                        onValueChange={setNoiseAmount}
                        min={0.01}
                        max={0.1}
                        step={0.01}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={applyNoise}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Add Noise
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cartoon" className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Cartoon Effect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Line Size: {cartoonLineSize[0]}</Label>
                      <Slider
                        value={cartoonLineSize}
                        onValueChange={setCartoonLineSize}
                        min={3}
                        max={15}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Color Levels: {cartoonColors[0]}</Label>
                      <Slider
                        value={cartoonColors}
                        onValueChange={setCartoonColors}
                        min={4}
                        max={16}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={applyCartoonEffect}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!currentImage}
                    >
                      Apply Cartoon Effect
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
