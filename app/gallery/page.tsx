'use client'

import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Heart,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'

/* -------------------- Photos -------------------- */

const herPhotos = [
  { id: 1, url: '/photos/her/her1.jpg', caption: 'That beautiful smile that makes my heart skip 😍' },
  { id: 2, url: '/photos/her/her2.jpg', caption: 'The most gorgeous person I know ✨' },
  { id: 3, url: '/photos/her/her3.jpg', caption: 'When you look this beautiful effortlessly 💕' },
  { id: 4, url: '/photos/her/her4.jpeg', caption: 'My favorite view in the world 🌸' },
  { id: 5, url: '/photos/her/her5.jpg', caption: 'The girl who stole my heart ❤️' },
  { id: 6, url: '/photos/her/her6.jpeg', caption: 'Beauty inside and out 🌟' },
]

const ourPhotos = [
  { id: 1, url: '/photos/us/us1.jpeg', caption: 'Our first photo as a couple 💑' },
  { id: 2, url: '/photos/us/us2.jpeg', caption: 'Making memories together ✨' },
  { id: 3, url: '/photos/us/us3.jpeg', caption: 'Adventures with you are the best 🌟' },
  { id: 4, url: '/photos/us/us4.jpeg', caption: 'Forever creating moments like these ❤️' },
  { id: 5, url: '/photos/us/us5.jpeg', caption: 'Us against the world 🌍' },
  { id: 6, url: '/photos/us/us6.jpeg', caption: 'Every moment with you is magical ✨' },
  { id: 7, url: '/photos/us/us7.jpeg', caption: 'Together is my favorite place to be 💝' },
  { id: 8, url: '/photos/us/us8.jpeg', caption: 'Creating our forever, one moment at a time 🌹' },
]

type PhotoSection = 'her' | 'us'

/* -------------------- Component -------------------- */

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<PhotoSection>('us')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const dragX = useMotionValue(0)

  const currentPhotos = activeTab === 'her' ? herPhotos : ourPhotos

  // 🔒 SAFETY: clamp index so it NEVER goes out of bounds
  const safeIndex = Math.min(currentIndex, currentPhotos.length - 1)

  /* -------------------- Autoplay -------------------- */

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % currentPhotos.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentPhotos.length])

  /* -------------------- Navigation -------------------- */

  const nextPhoto = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % currentPhotos.length)
    setIsAutoPlaying(false)
  }

  const prevPhoto = () => {
    setDirection(-1)
    setCurrentIndex(
      (prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length
    )
    setIsAutoPlaying(false)
  }

  const goToPhoto = (index: number) => {
    setDirection(index > safeIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handleDragEnd = () => {
    const x = dragX.get()
    if (x < -100) nextPhoto()
    if (x > 100) prevPhoto()
  }

  const toggleAutoPlay = () => setIsAutoPlaying((p) => !p)

  /* -------------------- Animation Variants -------------------- */

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.85,
    }),
  }

  /* -------------------- Render -------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-gray-600 hover:text-rose-500"
            >
              <ArrowLeft /> Back
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={toggleAutoPlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
              isAutoPlaying
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span className="hidden md:inline">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('us')
              setCurrentIndex(0)
              setDirection(0)
            }}
            className={`px-6 py-3 rounded-2xl font-semibold ${
              activeTab === 'us'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            💑 Us Together ({ourPhotos.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('her')
              setCurrentIndex(0)
              setDirection(0)
            }}
            className={`px-6 py-3 rounded-2xl font-semibold ${
              activeTab === 'her'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            👑 My Queen ({herPhotos.length})
          </button>
        </div>

        {/* Main Image */}
        <div className="relative h-[70vh] max-h-[800px] mb-8">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${activeTab}-${safeIndex}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x: dragX }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">

                <Image
                  src={currentPhotos[safeIndex].url}
                  alt={currentPhotos[safeIndex].caption}
                  fill
                  className="object-contain"
                  priority
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-8">
                  <p className="text-white text-xl md:text-3xl text-center font-semibold">
                    {currentPhotos[safeIndex].caption}
                  </p>
                </div>

                <div className="absolute top-6 right-6 bg-black/50 px-4 py-2 rounded-full text-white">
                  {safeIndex + 1} / {currentPhotos.length}
                </div>

                <div className="absolute top-6 left-6">
                  <Heart className="w-8 h-8 text-rose-500 fill-current" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow">
            <ChevronLeft />
          </button>

          <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
