'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// --- CONFIGURATION ---
const AUTOPLAY_DELAY = 5000; // 5 seconds per slide
const SWIPE_THRESHOLD = 50;  // Pixels needed to trigger a swipe

/* -------------------- Data (Simplified for brevity) -------------------- */
const herPhotos = [
  { id: 1, url: '/photos/her/her1.jpg', caption: 'That beautiful smile 😍' },
  { id: 2, url: '/photos/her/her2.jpg', caption: 'The most gorgeous person ✨' },
  { id: 3, url: '/photos/her/her3.jpeg', caption: 'Effortlessly beautiful 💕' },
  { id: 4, url: '/photos/her/her4.jpeg', caption: 'My favorite view 🌸' },
  { id: 5, url: '/photos/her/her5.jpg', caption: 'Stole my heart ❤️' },
  { id: 6, url: '/photos/her/her6.jpeg', caption: 'Beauty inside and out 🌟' },
]

const ourPhotos = [
  { id: 1, url: '/photos/us/us1.jpeg', caption: 'Our first photo 💑' },
  { id: 2, url: '/photos/us/us2.jpeg', caption: 'Making memories ✨' },
  { id: 3, url: '/photos/us/us3.jpeg', caption: 'Adventures with you 🌟' },
  { id: 4, url: '/photos/us/us4.jpeg', caption: 'Creating moments ❤️' },
  { id: 5, url: '/photos/us/us5.jpeg', caption: 'Us against the world 🌍' },
  { id: 6, url: '/photos/us/us6.jpeg', caption: 'Every moment is magical ✨' },
  { id: 7, url: '/photos/us/us7.jpeg', caption: 'My favorite place 💝' },
  { id: 8, url: '/photos/us/us8.jpeg', caption: 'Our forever 🌹' },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'her' | 'us'>('us')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const dragX = useMotionValue(0)
  // This helps make the image tilt slightly while dragging for a "physical" feel
  const rotation = useTransform(dragX, [-200, 200], [-10, 10])

  const currentPhotos = activeTab === 'her' ? herPhotos : ourPhotos
  const safeIndex = Math.min(currentIndex, currentPhotos.length - 1)

  // Preload logic
  const adjacentIndexes = useMemo(() => {
    const next = (safeIndex + 1) % currentPhotos.length
    const prev = (safeIndex - 1 + currentPhotos.length) % currentPhotos.length
    return [prev, next]
  }, [safeIndex, currentPhotos])

  /* -------------------- Handlers -------------------- */
  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + currentPhotos.length) % currentPhotos.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => paginate(1), AUTOPLAY_DELAY)
    return () => clearInterval(interval)
  }, [isAutoPlaying, safeIndex, currentPhotos.length])

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x
    if (swipe < -SWIPE_THRESHOLD) {
      setIsAutoPlaying(false)
      paginate(1)
    } else if (swipe > SWIPE_THRESHOLD) {
      setIsAutoPlaying(false)
      paginate(-1)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
      zIndex: 0
    }),
  }

  return (
    <div className="min-h-screen bg-rose-50/30 overflow-x-hidden">
      <div className="max-w-5xl mx-auto p-4 md:p-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-gray-500 hover:text-rose-500 flex items-center gap-2">
            <ArrowLeft size={20} /> <span>Back</span>
          </Link>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-3 rounded-full bg-white shadow-sm text-rose-500"
          >
            {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {['us', 'her'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setCurrentIndex(0); }}
              className={`px-8 py-2 rounded-full font-medium transition-all ${
                activeTab === tab ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-gray-400'
              }`}
            >
              {tab === 'us' ? 'Together' : 'Her'}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative aspect-[4/5] md:aspect-[16/10] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`${activeTab}-${safeIndex}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x: dragX, rotate: rotation }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={currentPhotos[safeIndex].url}
                  alt="Gallery Image"
                  fill
                  priority
                  className="object-cover md:object-contain bg-neutral-100"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 pt-20">
                  <p className="text-white text-xl md:text-2xl text-center font-medium">
                    {currentPhotos[safeIndex].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Arrows */}
          <div className="hidden md:block">
            <button onClick={() => { setIsAutoPlaying(false); paginate(-1); }} className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 text-rose-300 hover:text-rose-500 transition-colors">
              <ChevronLeft size={40} />
            </button>
            <button onClick={() => { setIsAutoPlaying(false); paginate(1); }} className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 text-rose-300 hover:text-rose-500 transition-colors">
              <ChevronRight size={40} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {currentPhotos.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === safeIndex ? 'w-8 bg-rose-500' : 'w-2 bg-rose-200'}`} 
            />
          ))}
        </div>

        {/* Invisible Preloader */}
        <div className="hidden">
          {adjacentIndexes.map((idx) => (
            <img key={currentPhotos[idx].url} src={currentPhotos[idx].url} alt="" />
          ))}
        </div>
      </div>
    </div>
  )
}