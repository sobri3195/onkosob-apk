import { useEffect } from 'react'

const AD_CLIENT = import.meta.env.VITE_ADMOB_CLIENT_ID
const AD_SLOT = import.meta.env.VITE_ADMOB_BANNER_SLOT_ID

const loadAdScript = () => {
  if (!AD_CLIENT || document.querySelector('script[data-admob-banner="true"]')) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
  script.crossOrigin = 'anonymous'
  script.dataset.admobBanner = 'true'
  document.head.appendChild(script)
}

const AdMobBanner = () => {
  useEffect(() => {
    if (!AD_CLIENT || !AD_SLOT) {
      return
    }

    loadAdScript()

    if (window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])

  if (!AD_CLIENT || !AD_SLOT) {
    return null
  }

  return (
    <div className="admob-banner">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdMobBanner
