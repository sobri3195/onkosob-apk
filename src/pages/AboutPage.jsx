import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'

const AboutPage = () => {
  const exportData = () => {
    const payload = {
      bookmarks: JSON.parse(localStorage.getItem('onkosob_bookmarks') || '[]'),
      history: JSON.parse(localStorage.getItem('onkosob_calc_history') || '[]'),
      notes: JSON.parse(localStorage.getItem('onkosob_notes') || '[]'),
      recent: JSON.parse(localStorage.getItem('onkosob_recent_activity') || '[]'),
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'onkosob-backup.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const importData = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const payload = JSON.parse(text)

    if (payload.bookmarks) localStorage.setItem('onkosob_bookmarks', JSON.stringify(payload.bookmarks))
    if (payload.history) localStorage.setItem('onkosob_calc_history', JSON.stringify(payload.history))
    if (payload.notes) localStorage.setItem('onkosob_notes', JSON.stringify(payload.notes))
    if (payload.recent) localStorage.setItem('onkosob_recent_activity', JSON.stringify(payload.recent))
    window.location.reload()
  }

  return (
    <div className="page">
      <SectionHeader title="About OnkoSob" subtitle="Aplikasi mobile-first untuk edukasi dan referensi cepat onkologi radiasi." />
      <Card title="Deskripsi">
        <p>
          OnkoSob dirancang untuk mahasiswa, residen, dan tenaga kesehatan yang ingin mengakses ringkasan konsep radioterapi,
          kalkulator edukatif, serta catatan pribadi dalam satu antarmuka modern.
        </p>
      </Card>
      <Card title="Disclaimer Edukasi">
        <p>
          OnkoSob <strong>bukan</strong> alat keputusan klinis resmi dan tidak menggantikan penilaian klinis dokter,
          fisikawan medis, ataupun panduan terapi resmi. Gunakan hanya untuk pembelajaran, referensi, dan pencatatan pribadi.
        </p>
      </Card>
      <Card title="Backup & Restore">
        <p className="hint">Ekspor semua data lokal Anda, lalu impor kembali saat berganti perangkat/browser.</p>
        <div className="action-row">
          <button className="btn" onClick={exportData}>Export data</button>
          <label className="btn btn--ghost">
            Import data
            <input type="file" accept="application/json" onChange={importData} hidden />
          </label>
        </div>
      </Card>
      <Card title="Teknis">
        <ul className="list">
          <li><span>Frontend only</span><small>React + Vite + React Router</small></li>
          <li><span>Penyimpanan lokal</span><small>localStorage (bookmark, history, notes, recent)</small></li>
          <li><span>Deploy ready</span><small>Vercel static deployment</small></li>
        </ul>
      </Card>
    </div>
  )
}

export default AboutPage
