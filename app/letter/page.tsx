'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Heart, Sparkles } from 'lucide-react'

export default function LoveLetter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 mb-8"
          >
            <ArrowLeft /> Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-16 border-4 border-rose-200"
        >
          {/* Letter Header */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              A Letter to My Love
            </h1>
            <div className="flex items-center justify-center gap-2 text-rose-500">
              <Sparkles className="w-5 h-5" />
              <p className="text-lg italic">Written from the depths of my heart</p>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-serif">
            <p className="text-xl text-rose-600 font-semibold">
              My Dearest Love,
            </p>

            <p>
              I still remember the first time I saw you at that wedding. I was nervous, awkward, maybe even a bit embarrassed by how clumsy I was around you. Little did I know that this awkward encounter would become the beginning of the most beautiful chapter of my life. You were a stranger then, but something about you stayed with me long after that day ended.
            </p>

            <p>
              Then came that magical evening at Dear Momos. Every word we shared, every laugh, every moment of comfortable silence - it all felt like the universe was telling me that you were meant to be in my life.
            </p>

            <p>
              During BOSM, my sports fest, we spent that unforgettable all-nighter together. Those quality moments we shared under the stars, talking about everything and nothing, laughing until our stomachs hurt - that's when I realized you weren't just someone special, you were MY someone special. The way we connected, the way you understood me, the way being with you felt like home... it was in those moments that my heart knew it had found its other half.
            </p>

            <p>
              And then came 14th October - the day you made all my dreams come true. When you confessed your feelings, when you chose me, when you made us "us" - I became the luckiest person alive. You didn't just give me your heart; you gave me a reason to believe in forever.
            </p>

            <p>
              Our first movie together, Deewani Ki Deewaniyat, was perfect not because of the film, but because I got to sit next to you, hold your hand, and steal glances at you in the dark. Every movie date, every adventure, every moment we've shared since then has been a treasure I hold close to my heart.
            </p>

            <p>
              Those intimate moments we share, those stolen kisses, the way you look at me like I'm your whole world - these are the moments that make my heart race even as I write this. The passion between us, the connection we have, it's something I never knew existed until I found you.
            </p>

            <p>
              You are not just my girlfriend - you are my best friend, my confidant, my safe place, my adventure buddy, my everything. You've seen me at my worst and loved me anyway. You've celebrated my victories and held me through my defeats. You've made me a better person just by being yourself.
            </p>

            <p>
              Every photo we take together, every song we share, every inside joke, every late-night conversation, every plan for the future - they all add up to this incredible love story that I'm so grateful to be living with you.
            </p>

            <p>
              I promise to love you through every season of life. I promise to make you laugh when you're sad, to hold you when you need comfort, to adventure with you when you're restless, and to simply be there, always. I promise to choose you, every single day, for the rest of my life.
            </p>

            <p>
              Thank you for turning my awkward hello into a beautiful forever. Thank you for being patient with me, for loving me, for choosing me. Thank you for being the most amazing person I've ever known.
            </p>

            <p className="text-xl text-rose-600 font-semibold mt-8">
              Forever and always yours,
            </p>

            <p className="text-2xl text-rose-700 font-bold italic">
              Your Love 💕
            </p>

            <div className="mt-12 pt-8 border-t-2 border-rose-200 text-center">
              <p className="text-rose-500 italic text-xl">
                "In a sea of people, my eyes will always search for you."
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 360] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              >
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}