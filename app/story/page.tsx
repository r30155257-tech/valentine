'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'

const timeline = [
  {
    date: 'The Beginning',
    title: 'A Wedding & An Awkward Start',
    description: "Who knew that an awkward encounter at someone's wedding would be the start of something so beautiful? I was embarrassed, nervous, maybe a bit clumsy... but somehow, that moment stuck with me. You stuck with me. We didn't have photos together that day, but I remember every detail of seeing you for the first time. Looking back, I wouldn't change a single awkward second of it.",
    color: 'from-rose-400 to-pink-500',
    emoji: '💒'
  },
  {
    date: 'The Second Chance',
    title: 'Dear Momos - Where It All Changed',
    description: "The night at Dear Momos... I still remember every detail. The way you smiled, the conversations that flowed so naturally, the feeling that this was different. This was special. We didn't capture that night in photos, but it's captured forever in my heart. That evening changed everything for me. Being with you felt like coming home.",
    color: 'from-purple-400 to-pink-500',
    emoji: '🌸'
  },
  {
    date: 'BOSM Magic',
    title: 'That All-Nighter at My Sports Fest',
    description: "During BOSM, my sports fest, we spent that unforgettable all-nighter together. The quality time we shared, the late-night conversations, the laughter that echoed through the campus - those moments were when we truly grew closer. Under the stars, sharing stories and dreams, I realized you weren't just special, you were MY special person. That night, my heart found its home.",
    color: 'from-pink-400 to-rose-500',
    emoji: '🌟'
  },
  {
    date: '14th October',
    title: 'The Day You Made Me Yours',
    description: "14th October - a date forever etched in my heart. The day you confessed, the day everything became real, the day I became the luckiest person alive. Your words, your courage, your love... you gave me everything I ever dreamed of and so much more. This is when our photos together started, when our official journey began. Best day of my life.",
    color: 'from-rose-500 to-pink-600',
    emoji: '💝'
  },
  {
    date: 'Our First Movie',
    title: 'Deewani Ki Deewaniyat Together',
    description: "Our first movie date - Deewani Ki Deewaniyat. But honestly, I barely remember the film because all I could think about was you sitting next to me. Your hand in mine, your laughter, your presence... you were the only story I wanted to watch. The beginning of so many beautiful dates.",
    color: 'from-purple-500 to-rose-500',
    emoji: '🎬'
  },
  {
    date: 'Intimate Moments',
    title: 'Our Special Connection',
    description: "Those stolen moments, those passionate kisses, those times when it was just us and the world disappeared... The way you look at me, the way you touch me, the way we lose ourselves in each other. These are the moments that make my heart race, the memories that keep me warm. Our connection goes beyond words.",
    color: 'from-rose-600 to-pink-700',
    emoji: '🔥'
  },
  {
    date: 'Every Day Since',
    title: 'Creating Our Forever',
    description: "Every movie date, every photo we take, every adventure, every laugh, every kiss, every moment we share - they all add up to this beautiful story that is uniquely ours. From awkward wedding encounters to the deepest love, from no photos together to countless memories captured, you've shown me what it means to truly connect with someone.",
    color: 'from-pink-500 to-purple-600',
    emoji: '✨'
  },
  {
    date: 'Forever & Always',
    title: 'Our Future Together',
    description: "This is just the beginning of our story, my love. Every day with you is a gift, every moment a treasure. I promise to love you through every season, every challenge, every joy. From that awkward hello at the wedding to this beautiful forever, you are my always, my everything.",
    color: 'from-rose-500 to-purple-700',
    emoji: '♾️'
  }
]

export default function Story() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4 md:p-8">
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Our Journey Together
          </h1>
          <p className="text-xl text-gray-600 italic">
            From awkward wedding hellos to forever I love yous
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-400 to-purple-300" />

          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-16 flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-row`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white font-semibold`}>
                      {event.date}
                    </div>
                    <span className="text-3xl">{event.emoji}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{event.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
                </motion.div>
              </div>

              {/* Center dot */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${event.color} shadow-lg border-4 border-white`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-12 text-white shadow-2xl">
            <Heart className="w-16 h-16 mx-auto mb-6 fill-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">I Love You</h2>
            <p className="text-xl md:text-2xl opacity-90">
              More than words could ever express 💕
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}