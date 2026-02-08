'use client'

import React, { useRef, useEffect, useState } from 'react'

interface ParticleEffectProps {
    className?: string
}

export function ParticleEffect({ className }: ParticleEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mousePositionRef = useRef({ x: 0, y: 0 })
    const isTouchingRef = useRef(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateCanvasSize = () => {
            const rect = container.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
            setIsMobile(window.innerWidth < 768)
        }

        updateCanvasSize()

        let particles: {
            x: number
            y: number
            baseX: number
            baseY: number
            size: number
            color: string
            scatteredColor: string
            life: number
            glitterPhase: number
        }[] = []

        let asteroids: {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            rotation: number
            rotationSpeed: number
            opacity: number
        }[] = []

        let textImageData: ImageData | null = null

        function createTextImage() {
            if (!ctx || !canvas) return 0

            ctx.fillStyle = 'white'
            ctx.save()

            const fontSize = isMobile ? 48 : 128
            ctx.font = `italic bold ${fontSize}px Georgia, serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            const text = 'Heisenbug'
            const x = canvas.width / 2
            const y = canvas.height / 2

            ctx.fillText(text, x, y)
            ctx.restore()

            textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            return fontSize / 128
        }

        function createAsteroid() {
            if (!canvas) return null
            return {
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 1,
                vy: Math.random() * 1 + 0.5,
                size: Math.random() * 2 + 1,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.2 + 0.1
            }
        }

        function drawAsteroid(asteroid: any) {
            if (!ctx) return
            ctx.save()
            ctx.translate(asteroid.x, asteroid.y)
            ctx.rotate(asteroid.rotation)
            ctx.globalAlpha = asteroid.opacity

            ctx.fillStyle = '#666'
            ctx.beginPath()
            const points = 6
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2
                const radius = asteroid.size * (0.8 + Math.random() * 0.4)
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.closePath()
            ctx.fill()

            ctx.restore()
        }

        function createParticle(scale: number) {
            if (!ctx || !canvas || !textImageData) return null

            const data = textImageData.data

            for (let attempt = 0; attempt < 100; attempt++) {
                const x = Math.floor(Math.random() * canvas.width)
                const y = Math.floor(Math.random() * canvas.height)

                if (data[(y * canvas.width + x) * 4 + 3] > 128) {
                    return {
                        x: x,
                        y: y,
                        baseX: x,
                        baseY: y,
                        size: Math.random() * 1.5 + 0.5,
                        color: 'white',
                        scatteredColor: Math.random() > 0.5 ? '#87CEEB' : '#E0F6FF',
                        glitterPhase: Math.random() * Math.PI * 2,
                        life: Math.random() * 100 + 50
                    }
                }
            }

            return null
        }

        function createInitialParticles(scale: number) {
            if (!canvas) return
            const baseParticleCount = isMobile ? 2000 : 5000
            const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (800 * 200)))
            for (let i = 0; i < particleCount; i++) {
                const particle = createParticle(scale)
                if (particle) particles.push(particle)
            }
        }

        let animationFrameId: number

        function animate(scale: number) {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Spawn new asteroids occasionally
            if (Math.random() < 0.01) {
                const asteroid = createAsteroid()
                if (asteroid) asteroids.push(asteroid)
            }

            // Update asteroids
            for (let i = asteroids.length - 1; i >= 0; i--) {
                const asteroid = asteroids[i]
                asteroid.x += asteroid.vx
                asteroid.y += asteroid.vy
                asteroid.rotation += asteroid.rotationSpeed

                drawAsteroid(asteroid)

                if (asteroid.y > canvas.height + 20) {
                    asteroids.splice(i, 1)
                }
            }

            const { x: mouseX, y: mouseY } = mousePositionRef.current
            const maxDistance = 120

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                const dx = mouseX - p.x
                const dy = mouseY - p.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                p.glitterPhase += 0.1

                if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
                    const force = (maxDistance - distance) / maxDistance
                    const angle = Math.atan2(dy, dx)
                    const moveX = Math.cos(angle) * force * 40
                    const moveY = Math.sin(angle) * force * 40
                    p.x = p.baseX - moveX
                    p.y = p.baseY - moveY

                    const glitterIntensity = (Math.sin(p.glitterPhase) + 1) / 2
                    const isBlue = Math.sin(p.glitterPhase * 2) > 0
                    if (isBlue) {
                        const blueIntensity = Math.floor(135 + glitterIntensity * 120)
                        ctx.fillStyle = `rgb(${Math.floor(blueIntensity * 0.6)}, ${Math.floor(blueIntensity * 0.8)}, ${blueIntensity})`
                    } else {
                        const whiteIntensity = Math.floor(200 + glitterIntensity * 55)
                        ctx.fillStyle = `rgb(${whiteIntensity}, ${whiteIntensity}, ${whiteIntensity})`
                    }
                } else {
                    p.x += (p.baseX - p.x) * 0.1
                    p.y += (p.baseY - p.y) * 0.1
                    ctx.fillStyle = 'white'
                }

                ctx.fillRect(p.x, p.y, p.size, p.size)

                p.life--
                if (p.life <= 0) {
                    const newParticle = createParticle(scale)
                    if (newParticle) {
                        particles[i] = newParticle
                    } else {
                        particles.splice(i, 1)
                        i--
                    }
                }
            }

            const baseParticleCount = isMobile ? 2000 : 5000
            const targetParticleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (800 * 200)))
            while (particles.length < targetParticleCount) {
                const newParticle = createParticle(scale)
                if (newParticle) particles.push(newParticle)
            }

            animationFrameId = requestAnimationFrame(() => animate(scale))
        }

        const scale = createTextImage()
        createInitialParticles(scale)
        animate(scale)

        const handleResize = () => {
            updateCanvasSize()
            const newScale = createTextImage()
            particles = []
            asteroids = []
            createInitialParticles(newScale)
        }

        const handleMove = (x: number, y: number) => {
            const rect = canvas.getBoundingClientRect()
            mousePositionRef.current = { x: x - rect.left, y: y - rect.top }
        }

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY)
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                e.preventDefault()
                handleMove(e.touches[0].clientX, e.touches[0].clientY)
            }
        }

        const handleTouchStart = () => {
            isTouchingRef.current = true
        }

        const handleTouchEnd = () => {
            isTouchingRef.current = false
            mousePositionRef.current = { x: 0, y: 0 }
        }

        const handleMouseLeave = () => {
            if (!('ontouchstart' in window)) {
                mousePositionRef.current = { x: 0, y: 0 }
            }
        }

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('mouseleave', handleMouseLeave)
        canvas.addEventListener('touchstart', handleTouchStart)
        canvas.addEventListener('touchend', handleTouchEnd)

        return () => {
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('touchmove', handleTouchMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
            canvas.removeEventListener('touchstart', handleTouchStart)
            canvas.removeEventListener('touchend', handleTouchEnd)
            cancelAnimationFrame(animationFrameId)
        }
    }, [isMobile])

    return (
        <div ref={containerRef} className={className}>
            <canvas
                ref={canvasRef}
                className="w-full h-full touch-none"
                aria-label="Interactive particle effect with Heisenbug text"
            />
        </div>
    )
}
