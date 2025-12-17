'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ConsultationModal from '@/components/ConsultationModal'
import Footer from '@/components/Footer'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonColor, setButtonColor] = useState<'black' | 'blue'>('black')
  const [showButton, setShowButton] = useState(true)
  const footerRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !mainRef.current) return

      const footerTop = footerRef.current.offsetTop
      const viewportBottom = window.scrollY + window.innerHeight

      // 푸터가 뷰포트에 들어오면 버튼 숨기기
      const isFooterVisible = viewportBottom >= footerTop - 100 // 푸터가 100px 전에 도달하면 숨김
      setShowButton(!isFooterVisible)

      // 메인 영역의 중간 지점을 기준으로 색상 변경
      const mainMiddle = mainRef.current.offsetTop + mainRef.current.offsetHeight / 2
      if (window.scrollY < mainMiddle) {
        setButtonColor('black')
      } else {
        setButtonColor('blue')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 상태 설정

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center" style={{ maxWidth: '1000px' }}>
          <div className="flex items-center">
            <Image
              src="/logo2.png"
              alt="Eduvisors Logo"
              width={200}
              height={30}
              className="h-auto w-auto max-h-5 md:max-h-8"
              priority
            />
          </div>
          {/* <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">채용공고</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">지원하기</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">문의하기</a>
          </nav> */}
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main ref={mainRef} className="flex flex-col items-center justify-center">
        <div className="text-center space-y-8 w-full" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* 채용공고 이미지 */}
          <div className=" flex justify-center">
            <img
              src="/main__desktop.png"
              alt="강남지점 채용공고"
              className="max-w-full h-auto  object-cover"
              style={{ maxWidth: '1000px', width: '100%' }}
            />
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <Footer ref={footerRef} />

      {/* 고정 버튼 - 항상 따라다님 (데스크톱) */}
      {showButton && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white text-center font-bold shadow-lg hover:shadow-xl transition-opacity duration-300"
          style={{
            width: '780px',
            height: '150px',
            borderRadius: '20px',
            backgroundColor: '#000',
            fontSize: '48px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 700,
            lineHeight: 'normal',
            animation: 'blinkBg 0.8s infinite',
            opacity: showButton ? 1 : 0,
          }}
        >
          면접 지원하기 &gt;
        </button>
      )}

      {/* 고정 버튼 - 항상 따라다님 (모바일) */}
      {showButton && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white text-center font-bold shadow-lg hover:shadow-xl transition-opacity duration-300"
          style={{
            width: '90%',
            maxWidth: '400px',
            height: '80px',
            borderRadius: '20px',
            backgroundColor: '#000',
            fontSize: '28px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 700,
            lineHeight: 'normal',
            animation: 'blinkBg 0.8s infinite',
            opacity: showButton ? 1 : 0,
          }}
        >
          면접 지원하기 &gt;
        </button>
      )}

      {/* 상담 신청 모달 */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
