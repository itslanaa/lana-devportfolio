
import React, { useEffect, useRef } from 'react'

const CustomCursor = () => {
    const cursorDotRef = useRef(null)
    const cursorOutlineRef = useRef(null)

    useEffect(() => {
        const cursorDot = cursorDotRef.current
        const cursorOutline = cursorOutlineRef.current

        if (!cursorDot || !cursorOutline) return;

        // Movement
        const moveCursor = (e) => {
            const posX = e.clientX
            const posY = e.clientY

            // Dot follows immediately
            cursorDot.style.left = `${posX}px`
            cursorDot.style.top = `${posY}px`

            // Outline follows with delay (animation in CSS)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" })
        }

        // Hover effects
        const addHoverClass = () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
            cursorOutline.style.backgroundColor = "rgba(124, 58, 237, 0.1)"
            cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"
        }

        const removeHoverClass = () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
            cursorOutline.style.backgroundColor = "transparent"
            cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        }

        window.addEventListener('mousemove', moveCursor)

        // Add event listeners to all clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, .clickable')
        clickables.forEach(el => {
            el.addEventListener('mouseenter', addHoverClass)
            el.addEventListener('mouseleave', removeHoverClass)
        })

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newClickables = document.querySelectorAll('a, button, input, textarea, .clickable');
                    newClickables.forEach(el => {
                        el.removeEventListener('mouseenter', addHoverClass); // Avoid duplicates
                        el.removeEventListener('mouseleave', removeHoverClass);
                        el.addEventListener('mouseenter', addHoverClass);
                        el.addEventListener('mouseleave', removeHoverClass);
                    })
                }
            })
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', addHoverClass)
                el.removeEventListener('mouseleave', removeHoverClass)
            })
            observer.disconnect();
        }
    }, [])

    return (
        <>
            <div ref={cursorDotRef} className="cursor-dot"></div>
            <div ref={cursorOutlineRef} className="cursor-outline"></div>
        </>
    )
}

export default CustomCursor
