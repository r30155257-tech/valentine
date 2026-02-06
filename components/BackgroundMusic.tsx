'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react'

const playlist = [
  { title: 'Raabta', file: '/music/raabta.mp3' },
  { title: 'Deewani Ki Deewaniyat', file: '/music/deewani.mp3' },
  { title: 'Tum Hi Ho', file: '/music/tumhiho.mp3' },
  { title: 'Hawayein', file: '/music/hawayein.mp3' },
  { title: 'Pehla Nasha', file: '/music/pehlanasha.mp3' },
]

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasAttemptedPlay = useRef(false)

  // Aggressive autoplay on mount and on ANY user interaction
  useEffect(() => {
    const tryPlay = async () => {
      if (audioRef.current && !hasAttemptedPlay.current) {
        hasAttemptedPlay.current = true
        try {
          audioRef.current.volume = 0.7 // Set volume to 70%
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          // If autoplay fails, try again on first interaction
          const playOnInteraction = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play()
                setIsPlaying(true)
              } catch (e) {
                console.log('Play failed')
              }
            }
          }

          // Listen for ANY user interaction
          const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove']
          events.forEach(event => {
            document.addEventListener(event, playOnInteraction, { once: true })
          })
        }
      }
    }

    // Try to play immediately
    tryPlay()

    // Also try after a tiny delay
    const timer = setTimeout(tryPlay, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentTrack])

  // Auto-play new track when it changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [currentTrack])

  return (
    <>
      {/* Floating Music Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPlayer(!showPlayer)}
          className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-2xl text-white relative"
          animate={isPlaying ? { 
            boxShadow: [
              '0 20px 25px -5px rgba(244, 63, 94, 0.3)',
              '0 20px 25px -5px rgba(244, 63, 94, 0.6)',
              '0 20px 25px -5px rgba(244, 63, 94, 0.3)',
            ]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          
          {/* Playing indicator */}
          {isPlaying && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Music Player Panel */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-80 border border-rose-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Now Playing 🎵</h3>
              <button 
                onClick={() => setShowPlayer(false)} 
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Music className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-lg">
                    {playlist[currentTrack].title}
                  </p>
                  <p className="text-sm text-rose-500">Love Songs 💕</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-600" />
                ) : (
                  <Volume2 className="w-5 h-5 text-rose-500" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTrack}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            <div className="text-xs text-gray-500 text-center mb-3">
              Track {currentTrack + 1} of {playlist.length}
            </div>

            {/* Playlist */}
            <div className="mt-4 pt-4 border-t border-gray-200 max-h-48 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-600 mb-2">Playlist</p>
              {playlist.map((song, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                    index === currentTrack 
                      ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 font-semibold' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index === currentTrack && isPlaying && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        🎵
                      </motion.div>
                    )}
                    <span className="text-sm truncate">{song.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Volume visualizer */}
            {isPlaying && !isMuted && (
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-rose-500 rounded-full"
                    animate={{
                      height: [4, 16, 8, 20, 4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={playlist[currentTrack].file}
        loop={false}
        preload="auto"
        playsInline
        autoPlay
      />
    </>
  )
}