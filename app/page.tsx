'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Camera, BookOpen, Sparkles, Music, Mail } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating hearts animation - only render after mount */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0 
              }}
              animate={{ 
                y: -100,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 1 
          }}
          className="mb-8 flex justify-center"
        >
          <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-lg" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-4"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(244, 63, 94, 0.3)",
              "0 0 40px rgba(244, 63, 94, 0.5)",
              "0 0 20px rgba(244, 63, 94, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Our Love Story
        </motion.h1>
        
        <p className="text-xl md:text-3xl text-gray-600 mb-4">
          From an awkward hello to forever together
        </p>
        <p className="text-lg md:text-xl text-rose-500 font-semibold mb-12">
          Since 14th October ✨
        </p>

        {/* Navigation Cards - Centered Layout */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 max-w-4xl mx-auto">
          <Link href="/gallery">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all group w-40"
            >
              <Camera className="w-10 h-10 text-rose-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-800">Gallery</h3>
              <p className="text-gray-600 text-sm mt-2">Our memories</p>
            </motion.div>
          </Link>

          <Link href="/story">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all group w-40"
            >
              <BookOpen className="w-10 h-10 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-800">Timeline</h3>
              <p className="text-gray-600 text-sm mt-2">Our journey</p>
            </motion.div>
          </Link>

          

          <Link href="/letter">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all group w-40"
            >
              <Mail className="w-10 h-10 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-800">Love Letter</h3>
              <p className="text-gray-600 text-sm mt-2">From my heart</p>
            </motion.div>
          </Link>

          <Link href="/quotes">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all group w-40"
            >
              <Sparkles className="w-10 h-10 text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-800">Quotes</h3>
              <p className="text-gray-600 text-sm mt-2">Love notes</p>
            </motion.div>
          </Link>
        </div>

        {/* Special message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 p-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl shadow-2xl"
        >
          <p className="text-2xl md:text-3xl text-white font-semibold">
            To the girl who turned my awkward moments into beautiful memories 💕
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}