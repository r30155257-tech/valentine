'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { Heart, Camera, BookOpen, Sparkles, Music, Mail } from 'lucide-react'
import Image from 'next/image'

/* -------------------- Image Data -------------------- */
const herPhotos = [
  { id: 'h1', url: '/photos/her/her1.jpg' },
  { id: 'h2', url: '/photos/her/her2.jpg' },
  { id: 'h3', url: '/photos/her/her3.jpg' },
  { id: 'h4', url: '/photos/her/her4.jpeg' },
  { id: 'h5', url: '/photos/her/her5.jpg' },
  { id: 'h6', url: '/photos/her/her6.jpeg' },
]

const ourPhotos = [
  { id: 'u1', url: '/photos/us/us1.jpeg' },
  { id: 'u2', url: '/photos/us/us2.jpeg' },
  { id: 'u3', url: '/photos/us/us3.jpeg' },
  { id: 'u4', url: '/photos/us/us4.jpeg' },
  { id: 'u5', url: '/photos/us/us5.jpeg' },
  { id: 'u6', url: '/photos/us/us6.jpeg' },
  { id: 'u7', url: '/photos/us/us7.jpeg' },
  { id: 'u8', url: '/photos/us/us8.jpeg' },
  { id: 'u9', url: '/photos/us/us9.jpeg' },
  { id: 'u10', url: '/photos/us/us10.jpeg' },
  { id: 'u11', url: '/photos/us/us11.jpeg' },
  { id: 'u12', url: '/photos/us/us12.jpeg' },
  { id: 'u13', url: '/photos/us/us13.jpeg' },
  { id: 'u14', url: '/photos/us/us14.jpeg' },
  { id: 'u15', url: '/photos/us/us15.jpeg' },
  { id: 'u16', url: '/photos/us/us16.jpeg' },
  { id: 'u17', url: '/photos/us/us17.jpeg' },
  { id: 'u18', url: '/photos/us/us18.jpeg' },
  { id: 'u19', url: '/photos/us/us19.jpeg' },
  { id: 'u20', url: '/photos/us/us20.jpeg' },
]

const allPhotos = [...herPhotos, ...ourPhotos];

/* -------------------- Sub-Components -------------------- */

function MilestoneCounter() {
  const [timeLeft, setTimeLeft] = useState({ 
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 
  })

  useEffect(() => {
    // Start Date: Oct 14, 2025, 02:34:00 AM
    const startDate = new Date('2025-10-14T02:34:00')

    const timer = setInterval(() => {
      const now = new Date()
      
      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      let days = now.getDate() - startDate.getDate()
      let hours = now.getHours() - startDate.getHours()
      let minutes = now.getMinutes() - startDate.getMinutes()
      let seconds = now.getSeconds() - startDate.getSeconds()

      // Adjust for negative values (borrowing from previous unit)
      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += prevMonth.getDate()
        months--;
      }
      if (months < 0) { months += 12; years--; }

      setTimeLeft({ years, months, days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 my-8 max-w-4xl mx-auto">
      {[
        { label: 'Years', value: timeLeft.years },
        { label: 'Months', value: timeLeft.months },
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((item) => (
        <motion.div 
          key={item.label} 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center p-2"
        >
          <div className="bg-white/60 backdrop-blur-md w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg border border-white/50">
            <span className="text-3xl md:text-4xl font-bold text-rose-600 tabular-nums">
              {item.value < 10 ? `0${item.value}` : item.value}
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase mt-2 tracking-widest">{item.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    
    // Set up the scratch layer
    ctx.fillStyle = '#f472b6'; // Rose-400
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add text on top of the scratch layer
    ctx.font = 'bold 24px sans-serif'; 
    ctx.fillStyle = '#ffffff'; 
    ctx.textAlign = 'center'
    ctx.fillText('Scratch for a Secret ❤️', canvas.width / 2, canvas.height / 2)

    // Sparkles on the scratch layer
    ctx.fillStyle = '#fbcfe8';
    for(let i=0; i<20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath(); ctx.arc(x,y, 2, 0, Math.PI*2); ctx.fill();
    }

    const scratch = (e: any) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2); ctx.fill()
    }
    
    canvas.addEventListener('mousemove', scratch); 
    canvas.addEventListener('touchmove', scratch)
  }, [])

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-10 group transform transition-transform hover:scale-[1.02]">
      {/* Hidden Content */}
      <div className="absolute inset-0 bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
        <Heart className="text-rose-500 mb-2 fill-rose-500 animate-pulse" size={32} />
        <h3 className="text-rose-700 font-bold text-lg leading-tight">My Favorite Surprise</h3>
        <p className="text-gray-600 text-sm mt-2 italic font-medium">
        Every second I spend with you is my favorite. I love you more than words can say. 💕
        </p>
      </div>
      {/* Canvas Layer */}
      <canvas ref={canvasRef} width={400} height={225} className="absolute inset-0 w-full h-full cursor-crosshair touch-none" />
    </div>
  )
}

/* -------------------- Main Page -------------------- */

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Generate Bubbles
  const bubbleConfigs = useMemo(() => {
    return [...Array(18)].map((_, i) => ({
      id: i,
      photo: allPhotos[i % allPhotos.length],
      size: random(60, 120),
      duration: random(18, 30),
      delay: random(0, 15),
      startX: random(5, 95), 
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col items-center justify-start py-12 px-4 overflow-x-hidden relative">
      
      {/* --- BACKGROUND LAYER: BUBBLES --- */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {bubbleConfigs.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute pointer-events-auto"
              initial={{ x: `${bubble.startX}vw`, y: '110vh', opacity: 0, scale: 0.6 }}
              animate={{ 
                y: '-20vh',
                x: [`${bubble.startX}vw`, `${bubble.startX + 5}vw`, `${bubble.startX - 5}vw`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" }}
              whileHover={{ scale: 1.4, zIndex: 50 }}
            >
              <div className="relative rounded-full border-4 border-white shadow-xl overflow-hidden" style={{ width: bubble.size, height: bubble.size }}>
                <Image src={bubble.photo.url} alt="Bubble" fill className="object-cover" sizes="150px" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-40" />
                <div className="absolute top-[20%] left-[20%] w-[15%] h-[8%] bg-white/50 rounded-full rotate-[-45deg]" />
              </div>
            </motion.div>
          ))}
          {/* Background Floating Hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute"
              initial={{ x: random(0, 100) + 'vw', y: '110vh' }}
              animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
              transition={{ duration: random(10, 20), repeat: Infinity, delay: random(0, 5) }}
            >
              <Heart className="text-rose-300 fill-rose-300/50 w-6 h-6" />
            </motion.div>
          ))}
        </div>
      )}

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-5xl w-full relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-4 flex justify-center"
        >
          <div className="relative">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-2xl" />
            <div className="absolute inset-0 bg-rose-400 blur-xl opacity-30 animate-pulse" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-2 tracking-tighter drop-shadow-sm">
          Our Love Story
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-600 mb-6 font-medium italic">
          "From an awkward hello to forever together"
        </p>

        {/* --- FEATURE #4: DETAILED COUNTER --- */}
        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-[2rem] border border-white/50 shadow-sm inline-block w-full max-w-4xl">
           <MilestoneCounter />
           <p className="text-rose-500 font-bold mt-4 tracking-widest uppercase flex items-center justify-center gap-2 text-sm md:text-base">
             <Sparkles size={16} /> Since 14th Oct, 2:34 AM <Sparkles size={16} />
           </p>
        </div>

        {/* --- NAVIGATION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-12 px-2">
          {[
            { href: '/gallery', icon: Camera, color: 'text-rose-500', label: 'Gallery', sub: 'Memories' },
            { href: '/story', icon: BookOpen, color: 'text-purple-500', label: 'Timeline', sub: 'Journey' },
            { href: '/letter', icon: Mail, color: 'text-amber-500', label: 'Letter', sub: 'My Heart' },
            { href: '/quotes', icon: Sparkles, color: 'text-indigo-500', label: 'Quotes', sub: 'Notes' },
          ].map((item) => (
            <Link href={item.href} key={item.label}>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white cursor-pointer group hover:shadow-xl hover:shadow-rose-100 transition-all"
              >
                <item.icon className={`w-10 h-10 ${item.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-lg text-gray-800">{item.label}</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.sub}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* --- FEATURE #5: SCRATCH REVEAL --- */}
        <div className="mb-16">
           <h2 className="text-rose-500 font-black text-sm uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-2">
             <Heart size={16} fill="currentColor" /> A Secret for You <Heart size={16} fill="currentColor" />
           </h2>
           <ScratchCard />
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="p-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-[2.5rem] shadow-2xl mx-2 md:mx-auto max-w-3xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-white font-bold leading-tight">
              To the girl who turned my awkward moments into beautiful memories 💕
            </p>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}