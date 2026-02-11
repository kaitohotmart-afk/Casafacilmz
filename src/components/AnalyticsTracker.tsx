'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logEvent } from '@/app/dashboard/actions'

export default function AnalyticsTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    // Use a ref to track if we've already logged for this path/search combo to prevent double logging in React Strict Mode
    // deeper integration might need more robust session handling, but this is a good MVP
    const loggedRef = useRef<string>('')

    useEffect(() => {
        // Create a unique key for the current page state
        const currentRef = `${pathname}?${searchParams.toString()}`

        if (loggedRef.current === currentRef) return

        loggedRef.current = currentRef

        // Log the view
        const log = async () => {
            // basic source tracking
            let source = 'direct'
            if (document.referrer) {
                try {
                    const url = new URL(document.referrer)
                    if (url.hostname !== window.location.hostname) {
                        source = url.hostname
                    }
                } catch (e) {
                    // ignore invalid URLs
                    source = document.referrer
                }
            }

            // check for utm params
            const utmSource = searchParams.get('utm_source')
            if (utmSource) source = utmSource

            await logEvent('page_view', {
                path: pathname,
                search: searchParams.toString(),
                referrer: document.referrer,
                source: source,
                userAgent: navigator.userAgent
            })
        }

        log()
    }, [pathname, searchParams])

    return null
}
