'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Heart, Camera, BookOpen, Sparkles, Mail, Volume2, VolumeX, Download, Share2, X, LockKeyhole, Gift, Star, MessageCircle, Calendar } from 'lucide-react'
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

/* -------------------- Helper Functions -------------------- */

const calculateTimeLeft = () => {
  const startDate = new Date('2025-10-14T02:34:00')
  const now = new Date()
  
  let years = now.getFullYear() - startDate.getFullYear()
  let months = now.getMonth() - startDate.getMonth()
  let days = now.getDate() - startDate.getDate()
  let hours = now.getHours() - startDate.getHours()
  let minutes = now.getMinutes() - startDate.getMinutes()
  let seconds = now.getSeconds() - startDate.getSeconds()

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds }
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

/* -------------------- Sub-Components -------------------- */

function MilestoneCounter() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft()
      
      // Trigger confetti on month anniversary
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
      
      setTimeLeft(newTime)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: random(-100, 100), opacity: 1, rotate: 0 }}
              animate={{ 
                y: 150, 
                opacity: 0, 
                rotate: random(0, 360),
                scale: random(0.5, 1.5)
              }}
              transition={{ duration: random(2, 4), delay: random(0, 1) }}
              className="absolute top-0 left-1/2"
            >
              {i % 3 === 0 ? (
                <Heart className="text-rose-500 fill-rose-500" size={random(10, 24)} />
              ) : i % 3 === 1 ? (
                <Star className="text-yellow-400 fill-yellow-400" size={random(10, 24)} />
              ) : (
                <Sparkles className="text-purple-400 fill-purple-400" size={random(10, 24)} />
              )}
            </motion.div>
          ))}
        </div>
      )}
      
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
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="flex flex-col items-center p-2"
          >
            <div className="bg-white/60 backdrop-blur-md w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg border border-white/50">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600 tabular-nums">
                {item.value < 10 ? `0${item.value}` : item.value}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-600 uppercase mt-2 tracking-widest">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)
  
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    
    ctx.fillStyle = '#f472b6'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.font = 'bold 24px sans-serif'; 
    ctx.fillStyle = '#ffffff'; 
    ctx.textAlign = 'center'
    ctx.fillText('Scratch for a Secret ❤️', canvas.width / 2, canvas.height / 2)

    ctx.fillStyle = '#fbcfe8';
    for(let i=0; i<30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath(); ctx.arc(x,y, 2, 0, Math.PI*2); ctx.fill();
    }

    let scratchedPixels = 0
    const totalPixels = canvas.width * canvas.height
    
    const scratch = (e: MouseEvent | TouchEvent) => {
      if (e.cancelable) e.preventDefault(); 
      
      const rect = canvas.getBoundingClientRect()
      const clientX = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      const clientY = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
      
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const x = (clientX - rect.left) * scaleX
      const y = (clientY - rect.top) * scaleY

      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.fill()
      
      scratchedPixels += Math.PI * 30 * 30
      const progress = Math.min((scratchedPixels / (totalPixels * 0.5)) * 100, 100)
      setScratchProgress(Math.floor(progress))
      
      if (progress >= 100 && !revealed) {
        setRevealed(true)
      }
    }
    
    canvas.addEventListener('mousemove', scratch as any); 
    canvas.addEventListener('touchmove', scratch as any, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', scratch as any);
      canvas.removeEventListener('touchmove', scratch as any);
    }
  }, [revealed])

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {scratchProgress > 0 && scratchProgress < 100 && (
        <div className="mb-2 text-center">
          <p className="text-xs text-rose-500 font-bold">{scratchProgress}% revealed</p>
        </div>
      )}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-10 group transform transition-transform hover:scale-[1.02]">
        <div className="absolute inset-0 bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            animate={revealed ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            <Heart className="text-rose-500 mb-2 fill-rose-500 animate-pulse" size={40} />
          </motion.div>
          <h3 className="text-rose-700 font-bold text-lg leading-tight">My Favorite Surprise</h3>
          <p className="text-gray-600 text-sm mt-2 italic font-medium">
            Every second I spend with you is my favorite. I love you more than words can say. 💕
          </p>
        </div>
        <canvas ref={canvasRef} width={400} height={225} className="absolute inset-0 w-full h-full cursor-crosshair touch-none" />
      </div>
    </div>
  )
}

function LoveNotes() {
  const notes = [
    "You make my heart smile 😊",
    "Forever isn't long enough with you 💕",
    "You're my favorite notification 📱",
    "Home is wherever you are 🏡",
    "You're my happy place ☀️",
    "Every love song reminds me of you 🎵",
    "You're my favorite adventure 🌟",
    "With you, every moment is magic ✨"
  ]
  
  const [currentNote, setCurrentNote] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNote((prev) => (prev + 1) % notes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [notes.length])
  
  return (
    <motion.div 
      className="my-8 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-6 rounded-3xl shadow-lg max-w-md mx-auto relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute top-2 right-2">
        <Heart className="text-white/30 fill-white/30 w-20 h-20" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentNote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-white text-xl font-bold text-center relative z-10"
        >
          {notes[currentNote]}
        </motion.p>
      </AnimatePresence>
      <div className="flex justify-center gap-1 mt-4">
        {notes.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${i === currentNote ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

function MemoryCounter() {
  const [stats, setStats] = useState({
    photos: allPhotos.length,
    smiles: 1000,
    laughs: 500,
    hugs: 200
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        smiles: prev.smiles + 1,
        laughs: prev.laughs + (Math.random() > 0.7 ? 1 : 0),
        hugs: prev.hugs + (Math.random() > 0.9 ? 1 : 0)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 max-w-3xl mx-auto">
      {[
        { label: 'Photos', value: stats.photos, icon: '📸', color: 'from-blue-400 to-blue-600' },
        { label: 'Smiles', value: stats.smiles, icon: '😊', color: 'from-yellow-400 to-orange-500' },
        { label: 'Laughs', value: stats.laughs, icon: '😂', color: 'from-pink-400 to-rose-600' },
        { label: 'Hugs', value: stats.hugs, icon: '🤗', color: 'from-purple-400 to-purple-600' }
      ].map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`bg-gradient-to-br ${item.color} p-5 rounded-2xl shadow-lg text-center text-white relative overflow-hidden`}
        >
          <motion.div 
            className="absolute inset-0 bg-white/20"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="text-4xl mb-2 relative z-10">{item.icon}</div>
          <div className="text-3xl font-bold relative z-10">{item.value.toLocaleString()}</div>
          <div className="text-xs uppercase tracking-wider font-semibold mt-1 relative z-10">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

function DailyLoveMessage() {
  const messages = [
    { day: 'Monday', msg: 'Starting the week thinking of you 💝', color: 'from-rose-400 to-pink-500' },
    { day: 'Tuesday', msg: 'You make every day feel like a dream ✨', color: 'from-purple-400 to-indigo-500' },
    { day: 'Wednesday', msg: 'Halfway through the week, completely in love 💕', color: 'from-pink-400 to-rose-500' },
    { day: 'Thursday', msg: 'Almost the weekend, but I miss you every day 🌟', color: 'from-amber-400 to-orange-500' },
    { day: 'Friday', msg: 'Every Friday feels like celebration with you 🎉', color: 'from-teal-400 to-cyan-500' },
    { day: 'Saturday', msg: 'Weekend vibes with my favorite person 🌈', color: 'from-violet-400 to-purple-500' },
    { day: 'Sunday', msg: 'Lazy Sundays are better with you 🌸', color: 'from-rose-400 to-pink-500' }
  ]
  
  const today = new Date().getDay()
  const todayMessage = messages[today === 0 ? 6 : today - 1]
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${todayMessage.color} p-6 rounded-3xl shadow-xl max-w-md mx-auto my-8 text-white relative overflow-hidden`}
    >
      <MessageCircle className="absolute top-2 right-2 w-16 h-16 text-white/20" />
      <div className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-wider mb-2">{todayMessage.day}'s Love Note</p>
        <p className="text-lg font-bold">{todayMessage.msg}</p>
      </div>
    </motion.div>
  )
}

function UpcomingMilestones() {
  const milestones = [
    { name: '6 Months', date: new Date('2026-04-14'), emoji: '🎊' },
    { name: '1 Year', date: new Date('2026-10-14'), emoji: '🎂' },
    { name: 'Valentine\'s Day', date: new Date('2026-02-14'), emoji: '💝' },
    { name: 'Christmas', date: new Date('2026-12-25'), emoji: '🎄' }
  ]
  
  const now = new Date()
  const upcoming = milestones
    .map(m => ({ ...m, daysUntil: Math.ceil((m.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) }))
    .filter(m => m.daysUntil > 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3)
  
  return (
    <div className="my-8 max-w-md mx-auto">
      <h3 className="text-rose-500 font-bold text-sm uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-2">
        <Calendar size={16} /> Upcoming Milestones
      </h3>
      <div className="space-y-3">
        {upcoming.map((milestone, i) => (
          <motion.div
            key={milestone.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{milestone.emoji}</span>
              <div>
                <p className="font-bold text-gray-800">{milestone.name}</p>
                <p className="text-xs text-gray-500">{milestone.date.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-rose-600">{milestone.daysUntil}</p>
              <p className="text-xs text-gray-500 uppercase">days</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RandomMemoryButton({ photos, onClick }: { photos: any[], onClick: (url: string) => void }) {
  const [isSpinning, setIsSpinning] = useState(false)
  
  const handleClick = () => {
    setIsSpinning(true)
    setTimeout(() => {
      const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
      onClick(randomPhoto.url)
      setIsSpinning(false)
    }, 500)
  }
  
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="my-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
    >
      <motion.div
        animate={isSpinning ? { rotate: 360 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Gift size={24} />
      </motion.div>
      Random Memory
    </motion.button>
  )
}

/* -------------------- Main Page -------------------- */

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(true) // Start unlocked by default
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Check localStorage on mount - only lock if explicitly locked before
  useEffect(() => { 
    setMounted(true)
    const wasLocked = localStorage.getItem('loveStoryLocked')
    if (wasLocked === 'true') {
      setIsUnlocked(false)
    }
  }, [])

  // Interactive Cursor Trail
  useEffect(() => {
    if (!isUnlocked) return;

    let lastTime = 0;
    const trailChars = ['❤️', '✨', '💕', '💖', '🌟', '💫'];

    const createTrail = (e: MouseEvent | TouchEvent) => {
      if (Date.now() - lastTime < 80) return;
      lastTime = Date.now();

      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const heart = document.createElement('span');
      heart.innerText = trailChars[Math.floor(Math.random() * trailChars.length)];
      heart.style.position = 'fixed';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${Math.random() * 12 + 12}px`;
      heart.style.pointerEvents = 'none';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.transition = 'all 1s ease-out';
      heart.style.zIndex = '9999';
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.style.transform = `translate(-50%, -${Math.random() * 60 + 60}px) scale(0.3) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
      }, 10);

      setTimeout(() => heart.remove(), 1000);
    };

    window.addEventListener('mousemove', createTrail);
    window.addEventListener('touchmove', createTrail, { passive: true });

    return () => {
      window.removeEventListener('mousemove', createTrail);
      window.removeEventListener('touchmove', createTrail);
    }
  }, [isUnlocked]);

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning, my love ☀️"
    if (hour < 18) return "Good afternoon, beautiful 🌸"
    return "Late night thoughts of you 🌙"
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio play prevented by browser')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Our Love Story',
          text: 'Check out our beautiful love story! 💕',
          url: window.location.href
        })
      } catch (err) {
        console.log('Share failed', err)
      }
    } else {
      setShowShareMenu(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard! 💕')
    setShowShareMenu(false)
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput === '1410') {
      setIsUnlocked(true)
      localStorage.removeItem('loveStoryLocked') // Remove locked state
    } else {
      setPinError(true)
      setPinInput('')
      setTimeout(() => setPinError(false), 500)
    }
  }

  const bubbleConfigs = useMemo(() => {
    if (!mounted) return []
    return [...Array(20)].map((_, i) => ({
      id: i,
      photo: allPhotos[i % allPhotos.length],
      size: random(60, 130),
      duration: random(18, 32),
      delay: random(0, 18),
      startX: random(5, 95), 
    }))
  }, [mounted])

  // Lock Screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden" suppressHydrationWarning>
        {/* Animated background */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: random(0, 100) + 'vw', y: random(0, 100) + 'vh', opacity: 0.3 }}
                animate={{ 
                  y: [random(0, 100) + 'vh', random(0, 100) + 'vh'],
                  x: [random(0, 100) + 'vw', random(0, 100) + 'vw'],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: random(5, 10), repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="text-rose-300 fill-rose-300/50" size={random(20, 40)} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={pinError ? { x: [-10, 10, -10, 10, 0], scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border-2 border-white/50 text-center max-w-sm w-full relative z-10"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LockKeyhole className="text-white w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Only For Us 💕</h2>
          <p className="text-gray-500 mb-8 text-sm font-medium">Enter our special date (DDMM) to unlock.</p>
          
          <form onSubmit={handleUnlock}>
            <input 
              type="password" 
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-3xl tracking-[1em] p-4 rounded-2xl bg-white border-2 border-rose-100 focus:border-rose-400 focus:outline-none transition-colors shadow-sm mb-6"
              placeholder="••••"
              autoFocus
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-rose-500/30 transition-all"
            >
              Unlock My Heart 💝
            </motion.button>
          </form>
          
          {pinError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-4 font-medium"
            >
              Oops! Try our special date (DD/MM) 💭
            </motion.p>
          )}
        </motion.div>
      </div>
    )
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col items-center justify-start py-12 px-4 overflow-x-hidden relative" suppressHydrationWarning>
      
      <audio ref={audioRef} loop suppressHydrationWarning>
        <source src="/music/raabta.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Controls */}
      <div className="fixed top-4 right-4 z-[60] flex gap-2">
        <motion.button 
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg border border-white transition-all text-rose-500"
          aria-label="Toggle music"
        >
          <motion.div
            animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.div>
        </motion.button>
        
        <motion.button 
          onClick={handleShare}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg border border-white transition-all text-purple-500"
          aria-label="Share"
        >
          <Share2 size={24} />
        </motion.button>

        <motion.button 
          onClick={() => {
            localStorage.setItem('loveStoryLocked', 'true')
            setIsUnlocked(false)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg border border-white transition-all text-gray-600"
          aria-label="Lock page"
          title="Lock page"
        >
          <LockKeyhole size={24} />
        </motion.button>
      </div>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="fixed top-20 right-4 z-[70] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white"
          >
            <button 
              onClick={() => setShowShareMenu(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 rounded-lg transition-colors w-full"
            >
              <Download size={18} className="text-rose-500" />
              <span className="text-sm font-medium">Copy Link</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Bubbles */}
      {mounted && bubbleConfigs.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {bubbleConfigs.map((bubble) => (
            <motion.div
              key={bubble.id}
              onClick={() => setSelectedPhoto(bubble.photo.url)}
              className="absolute pointer-events-auto cursor-pointer"
              initial={{ x: `${bubble.startX}vw`, y: '110vh', opacity: 0, scale: 0.6 }}
              animate={{ 
                y: '-20vh',
                x: [`${bubble.startX}vw`, `${bubble.startX + 5}vw`, `${bubble.startX - 5}vw`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" }}
              whileHover={{ scale: 1.4, zIndex: 40 }}
            >
              <div className="relative rounded-full border-4 border-white shadow-xl overflow-hidden" style={{ width: bubble.size, height: bubble.size }}>
                <Image src={bubble.photo.url} alt="Memory bubble" fill className="object-cover" sizes="150px" priority />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-40" />
                <div className="absolute top-[20%] left-[20%] w-[15%] h-[8%] bg-white/50 rounded-full rotate-[-45deg]" />
              </div>
            </motion.div>
          ))}
          
          {[...Array(15)].map((_, i) => (
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

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-5xl w-full relative z-50"
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
        
        {mounted && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-500 font-bold mb-2 tracking-widest uppercase text-sm"
          >
            {getGreeting()}
          </motion.p>
        )}

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-2 tracking-tighter drop-shadow-sm">
          Our Love Story
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-600 mb-6 font-medium italic">
          "From an awkward hello to forever together"
        </p>

        {/* Counter */}
        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-[2rem] border border-white/50 shadow-sm inline-block w-full max-w-4xl">
           <MilestoneCounter />
           <p className="text-rose-500 font-bold mt-4 tracking-widest uppercase flex items-center justify-center gap-2 text-sm md:text-base">
             <Sparkles size={16} /> Since 14th Oct, 2:34 AM <Sparkles size={16} />
           </p>
        </div>

        {/* Daily Love Message */}
        <DailyLoveMessage />

        {/* Love Notes Carousel */}
        <LoveNotes />

        {/* Memory Stats */}
        <MemoryCounter />

        {/* Upcoming Milestones */}
        <UpcomingMilestones />

        {/* Random Memory Button */}
        <RandomMemoryButton photos={allPhotos} onClick={setSelectedPhoto} />

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-12 px-2">
          {[
            { href: '/gallery', icon: Camera, color: 'text-rose-500', gradient: 'from-rose-400 to-pink-500', label: 'Gallery', sub: 'Memories' },
            { href: '/story', icon: BookOpen, color: 'text-purple-500', gradient: 'from-purple-400 to-indigo-500', label: 'Timeline', sub: 'Journey' },
            { href: '/letter', icon: Mail, color: 'text-amber-500', gradient: 'from-amber-400 to-orange-500', label: 'Letter', sub: 'My Heart' },
            { href: '/quotes', icon: Sparkles, color: 'text-indigo-500', gradient: 'from-indigo-400 to-purple-500', label: 'Quotes', sub: 'Notes' },
          ].map((item) => (
            <Link href={item.href} key={item.label}>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white cursor-pointer group hover:shadow-xl transition-all relative overflow-hidden"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <item.icon className={`w-10 h-10 ${item.color} mx-auto mb-3 group-hover:scale-110 transition-transform relative z-10`} />
                <h3 className="font-bold text-lg text-gray-800 relative z-10">{item.label}</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest relative z-10">{item.sub}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Scratch Card */}
        <div className="mb-16">
           <h2 className="text-rose-500 font-black text-sm uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-2">
             <Heart size={16} fill="currentColor" /> A Secret for You <Heart size={16} fill="currentColor" />
           </h2>
           <ScratchCard />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="p-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-[2.5rem] shadow-2xl mx-2 md:mx-auto max-w-3xl relative overflow-hidden"
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, rotate: 5 }}
              className="relative w-full max-w-2xl aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedPhoto} alt="Memory" fill className="object-contain" />
              
              <motion.button 
                onClick={() => setSelectedPhoto(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors z-50"
                aria-label="Close"
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}