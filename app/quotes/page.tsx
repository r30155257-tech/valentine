'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const quotes = [
  {
    text: "From that awkward hello at the wedding to this beautiful forever - you've been the best plot twist of my life.",
    author: "My Unexpected Love"
  },
  {
    text: "That evening at Dear Momos wasn't just meet, it was the moment from where it started",
    author: "Our Blossom Evening"
  },
  {
    text: "During BOSM's all-nighter, somewhere between the laughs and the stars, I found my home in you.",
    author: "Under The Stars"
  },
  {
    text: "14th October - the day you chose me, the day my forever began, the day I became the luckiest person alive.",
    author: "Our Beginning"
  },
  {
    text: "Watching Deewani Ki Deewaniyat with you, I realized I was already living my own love story - and it's better than any movie.",
    author: "Our First Date"
  },
  {
    text: "Every photo we take together is a reminder that the best moments in life are the ones I spend with you.",
    author: "Captured Memories"
  },
  {
    text: "Your smile isn't just beautiful - it's my favorite view in the entire world.",
    author: "My Favorite Sight"
  },
  {
    text: "In a world full of temporary things, you are my forever constant.",
    author: "Always & Forever"
  },
  {
    text: "I don't just love you for who you are, I love you for who I am when I'm with you.",
    author: "Better With You"
  },
  {
    text: "You're not just my girlfriend - you're my best friend, my safe place, my adventure buddy, my everything.",
    author: "My Everything"
  },
  {
    text: "Every love song suddenly makes sense when I think of you.",
    author: "Our Soundtrack"
  },
  {
    text: "I fall in love with you more and more every single day - not because I have to, but because I can't help it.",
    author: "Endless Love"
  },
  {
    text: "The way you look at me like I'm your whole world makes me want to be worthy of that gaze every single day.",
    author: "Your Eyes"
  },
  {
    text: "Meeting you was fate, becoming your friend was choice, but falling in love with you was beyond my control.",
    author: "Destined"
  },
  {
    text: "You're the reason I believe in love stories, soulmates, and happily ever afters.",
    author: "My Believer"
  }
]

export default function Quotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length)
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextQuote()
    }
    if (isRightSwipe) {
      prevQuote()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 mb-4 md:mb-8 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" /> 
            <span className="text-sm md:text-base">Back to Home</span>
          </motion.button>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-16"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                  Love Notes
                </h1>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
              </div>
              <p className="text-base md:text-xl text-gray-600">
                Words from my heart to yours
              </p>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ duration: 0.5 }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 lg:p-16 text-center relative overflow-hidden touch-pan-y"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-rose-200 to-transparent rounded-full -translate-x-10 -translate-y-10 md:-translate-x-16 md:-translate-y-16 opacity-50" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-tl from-pink-200 to-transparent rounded-full translate-x-10 translate-y-10 md:translate-x-16 md:translate-y-16 opacity-50" />
                  
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-rose-500 fill-rose-500 mx-auto mb-6 md:mb-8 relative z-10" />
                  </motion.div>
                  
                  <p className="text-lg md:text-2xl lg:text-4xl font-serif text-gray-800 mb-6 md:mb-8 leading-relaxed relative z-10 italic px-2">
                    "{quotes[currentQuote].text}"
                  </p>
                  
                  <div className="relative z-10">
                    <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-3 md:mb-4" />
                    <p className="text-base md:text-lg lg:text-xl text-rose-500 font-semibold">
                      — {quotes[currentQuote].author}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-center gap-3 md:gap-6 mt-8 md:mt-12 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.1, x: -3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevQuote}
                      className="p-3 md:p-4 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 rounded-full transition-all shadow-lg touch-manipulation"
                      aria-label="Previous quote"
                    >
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-rose-600" />
                    </motion.button>

                    {/* Desktop dots - hidden on mobile */}
                    <div className="hidden sm:flex gap-2">
                      {quotes.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentQuote(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`transition-all rounded-full touch-manipulation ${
                            index === currentQuote 
                              ? 'bg-rose-500 w-8 md:w-10 h-3' 
                              : 'bg-rose-200 w-3 h-3 hover:bg-rose-300'
                          }`}
                          aria-label={`Go to quote ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Mobile counter - shown only on mobile */}
                    <div className="sm:hidden px-4 py-2 bg-rose-50 rounded-full">
                      <p className="text-sm font-semibold text-rose-600">
                        {currentQuote + 1} / {quotes.length}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, x: 3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextQuote}
                      className="p-3 md:p-4 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 rounded-full transition-all shadow-lg touch-manipulation"
                      aria-label="Next quote"
                    >
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-rose-600" />
                    </motion.button>
                  </div>

                  {/* Quote counter - desktop only */}
                  <p className="hidden sm:block text-sm text-gray-400 mt-6 md:mt-8 relative z-10">
                    {currentQuote + 1} of {quotes.length}
                  </p>

                  {/* Swipe hint - mobile only */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="sm:hidden text-xs text-gray-400 mt-4 relative z-10"
                  >
                    👈 Swipe to navigate 👉
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* Side cards preview - desktop only */}
              <div className="hidden xl:block">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 0.3, x: 0 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 w-64 h-96 bg-white rounded-2xl shadow-xl -rotate-6 pointer-events-none"
                >
                  <div className="p-8 h-full flex items-center justify-center">
                    <p className="text-gray-400 text-center italic">
                      {quotes[(currentQuote - 1 + quotes.length) % quotes.length].text.substring(0, 80)}...
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 0.3, x: 0 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 w-64 h-96 bg-white rounded-2xl shadow-xl rotate-6 pointer-events-none"
                >
                  <div className="p-8 h-full flex items-center justify-center">
                    <p className="text-gray-400 text-center italic">
                      {quotes[(currentQuote + 1) % quotes.length].text.substring(0, 80)}...
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* All quotes grid - bonus section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 md:mt-20"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">
                All My Love Notes 💕
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {quotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentQuote(index)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`cursor-pointer p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg transition-all touch-manipulation ${
                      currentQuote === index
                        ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white'
                        : 'bg-white hover:shadow-xl'
                    }`}
                  >
                    <p className={`text-xs md:text-sm mb-2 md:mb-3 italic line-clamp-3 ${
                      currentQuote === index ? 'text-white' : 'text-gray-700'
                    }`}>
                      "{quote.text}"
                    </p>
                    <p className={`text-xs font-semibold ${
                      currentQuote === index ? 'text-pink-100' : 'text-rose-500'
                    }`}>
                      — {quote.author}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}