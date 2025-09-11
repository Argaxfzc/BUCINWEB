"use client";
import { useState, useEffect } from "react";
import { Heart, Home, BookOpen, Image, Play, Pause, X } from "lucide-react";

let audio;
if (typeof window !== "undefined") {
  audio = new Audio("/music/backsound.mp3"); // ganti sesuai nama file mp3 lo
  audio.loop = true;
}

const LoveWebsite = () => {
  const [page, setPage] = useState("home");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Typing animation for homepage title
  const [typedTitle, setTypedTitle] = useState("");
  const fullTitle = "For My Love, Trisna Arsya ❤️";
  
  useEffect(() => {
    if (page !== "home") return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(typingInterval);
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [page]);
  
  // Heart particle animation
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    if (page !== "home") return;
    
    const addHeart = () => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 5 + 5
      };
      setHearts((prev) => [...prev, newHeart]);
    };
    
    const interval = setInterval(addHeart, 300);
    return () => clearInterval(interval);
  }, [page]);
  
  // Handle music toggle
 const toggleMusic = () => {
  if (!audio) return;
  if (musicPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  setMusicPlaying(!musicPlaying);
};

  // Handle gallery navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };
  
  // Render the current page
  const renderPage = () => {
    switch (page) {
      case "longtext":
        return <LongTextPage onBack={() => setPage("home")} />;
      case "gallery":
        return <GalleryPage 
          currentSlide={currentSlide} 
          onNext={nextSlide}
          onPrev={prevSlide}
          onBack={() => setPage("home")} 
        />;
      default:
        return <HomePage 
          typedTitle={typedTitle}
          hearts={hearts}
          onNavigate={setPage}
        />;
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Music Button */}
      {showMusicButton && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 bg-pink-200 bg-opacity-60 backdrop-blur-sm rounded-full p-3 text-pink-700 hover:bg-pink-300 transition-all shadow-lg hover:shadow-pink-300/50"
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      )}
      
      {/* Close music button */}
      <button
        onClick={() => setShowMusicButton(false)}
        className="fixed top-4 right-16 z-50 bg-pink-200 bg-opacity-60 backdrop-blur-sm rounded-full p-3 text-pink-700 hover:bg-pink-300 transition-all shadow-lg hover:shadow-pink-300/50"
        aria-label="Remove music button"
      >
        <X size={20} />
      </button>
      
      {/* Render the current page */}
      {renderPage()}
    </div>
  );
};

// Home Page Component
const HomePage = ({ typedTitle, hearts, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-amber-50 relative overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-10%',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}
      
      <div className="text-center z-10 p-6 max-w-2xl">
        <h1 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-pink-700 mb-4 min-h-[4rem]">
          {typedTitle}
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-pink-600 mb-10">
          A little website just for you
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button 
            onClick={() => onNavigate("longtext")}
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-medium py-3 px-6 rounded-full shadow-md transition-all hover:shadow-lg hover:shadow-pink-300/50 flex items-center justify-center gap-2"
          >
            <BookOpen size={20} />
            <span>💌 Long Text</span>
          </button>
          
          <button 
            onClick={() => onNavigate("gallery")}
            className="bg-purple-200 hover:bg-purple-300 text-purple-700 font-medium py-3 px-6 rounded-full shadow-md transition-all hover:shadow-lg hover:shadow-purple-300/50 flex items-center justify-center gap-2"
          >
            <Image size={20} />
            <span>📸 Gallery</span>
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear forwards;
        }
      `}</style>
    </div>
  );
};

// Long Text Page Component
const LongTextPage = ({ onBack }) => {
  const paragraphs = [
    "Halo sayangku,",
    "Aku cuma mau cerita sedikit tentang betapa bersyukurnya aku punya kamu sekarang. Walaupun kita baru aja jadian, rasanya aku kayak udah lama kenal kamu. Kamu datang di waktu yang pas, di saat aku nggak nyangka kalau aku bakal nemuin seseorang yang bisa bikin aku ngerasa sebahagia ini.",
    "Aku bersyukur karena kamu hadir bukan cuma sebagai pasangan, tapi juga teman, tempat cerita, dan sosok yang bikin aku nyaman jadi diriku sendiri. Dari kamu, aku belajar kalau kebahagiaan itu sederhana—kadang cuma dari senyum kamu, atau sekadar obrolan singkat, aku udah bisa ngerasa lebih baik.",
    "Aku sadar perjalanan kita masih panjang, masih banyak hal yang harus kita lalui sama-sama. Aku masih belajar buat ngerti kamu lebih dalam, belajar buat sabar, dan belajar buat selalu jadi yang terbaik untuk kamu. Aku mungkin nggak sempurna, tapi aku janji aku akan selalu berusaha ada buat kamu, dalam keadaan apa pun.",
    "Sayangku, aku pengen hubungan ini nggak cuma berhenti di awal yang indah, tapi terus berlanjut jadi cerita panjang yang kita bangun bersama. Aku pengen kita saling nguatkan, saling jaga, dan saling dukung, apapun yang nanti bakal kita hadapi. Aku percaya kalau selama kita sama-sama mau berusaha, kita bisa jalanin semuanya.",
    "Terima kasih ya, karena kamu udah milih aku. Terima kasih juga udah mau nerima aku dengan segala kekurangan dan kelebihanku. Aku bersyukur banget bisa ketemu kamu, dan aku harap kamu juga ngerasain hal yang sama. Semoga langkah kecil kita ini jadi awal dari banyak hal indah yang bakal kita lalui berdua.",
    "Aku sayang kamu, Trisna Arsya. Dan aku bener-bener bersyukur karena sekarang aku bisa nyebut kamu sebagai bagian dari hidup aku."
  ];
  
  const [visibleParagraphs, setVisibleParagraphs] = useState([]);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < paragraphs.length) {
        setVisibleParagraphs(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-cursive text-3xl text-pink-700">Halo sayangku,</h2>
        </div>
        
        <div className="space-y-6 text-gray-700 font-sans">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index}
              className={`transition-opacity duration-700 ${visibleParagraphs.includes(index) ? 'opacity-100' : 'opacity-0'}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button 
            onClick={onBack}
            className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-medium py-3 px-6 rounded-full shadow-md transition-all hover:shadow-lg hover:shadow-pink-300/50 flex items-center justify-center gap-2 mx-auto"
          >
            <Home size={20} />
            <span>⬅ Back Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Gallery Page Component
const GalleryPage = ({ currentSlide, onNext, onPrev, onBack }) => {
  const galleryData = [
    const galleryData = [
  {
    image: "/images/foto1.jpg",
    alt: "Foto 1",
    caption: "Every moment with you feels like a dream"
  },
  {
    image: "/images/foto2.jpg",
    alt: "Foto 2",
    caption: "Walking through life with you is my greatest joy"
  },
  {
    image: "/images/foto3.jpg",
    alt: "Foto 3",
    caption: "In your eyes, I found my home"
  },
  {
    image: "/images/foto4.jpg",
    alt: "Foto 4",
    caption: "With you, every sunrise brings new hope"
  }
];

  
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Navigation Arrows */}
      <button 
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-3 text-white hover:bg-opacity-50 transition-all"
        aria-label="Previous photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-3 text-white hover:bg-opacity-50 transition-all"
        aria-label="Next photo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slides */}
      {galleryData.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative h-full w-full">
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            {/* Glowing border */}
            <div className="absolute inset-0 border-8 border-pink-200 border-opacity-30 rounded-lg"></div>
            
            {/* Caption */}
            <div className="absolute bottom-20 left-0 right-0 text-center px-4">
              <p className="font-cursive text-2xl text-white drop-shadow-md">
                {slide.caption}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-white bg-opacity-30 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-full hover:bg-opacity-50 transition-all flex items-center gap-2"
      >
        <Home size={20} />
        <span>Back Home</span>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {galleryData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoveWebsite;