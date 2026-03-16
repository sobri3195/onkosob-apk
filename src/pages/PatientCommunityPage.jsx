import { useMemo, useState } from 'react'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'

const faqItems = [
  {
    q: 'Apakah radioterapi selalu menyebabkan rambut rontok?',
    a: 'Tidak selalu. Rambut biasanya rontok hanya pada area yang terkena radiasi.',
    tag: 'Efek Samping',
  },
  {
    q: 'Bolehkah olahraga saat terapi?',
    a: 'Boleh dengan intensitas ringan-sedang sesuai kondisi fisik dan anjuran dokter.',
    tag: 'Aktivitas',
  },
  {
    q: 'Perlukah diet khusus?',
    a: 'Fokus pada gizi seimbang, cukup protein, dan hidrasi. Konsultasikan ke ahli gizi klinis.',
    tag: 'Nutrisi',
  },
]

const mythFacts = [
  { myth: 'Kanker menular lewat kontak fisik.', fact: 'Kanker tidak menular dari orang ke orang.' },
  { myth: 'Semua pasien pasti mual berat saat terapi.', fact: 'Efek samping bervariasi dan banyak yang bisa dikontrol.' },
  { myth: 'Kalau sudah merasa lebih baik, terapi bisa dihentikan sendiri.', fact: 'Terapi harus sesuai rencana dokter agar hasil optimal.' },
]

const glossary = [
  { term: 'Biopsi', meaning: 'Pengambilan sampel jaringan untuk diperiksa di laboratorium.' },
  { term: 'Metastasis', meaning: 'Penyebaran sel kanker ke organ atau jaringan lain.' },
  { term: 'Remisi', meaning: 'Kondisi gejala kanker berkurang atau tidak terdeteksi.' },
]

const supportServices = [
  { name: 'Hotline Edukasi Onkologi', contact: '1500-120', hours: '08.00 - 20.00' },
  { name: 'Layanan Konseling Psikoonkologi', contact: 'WA 0812-0000-1001', hours: 'By appointment' },
  { name: 'Komunitas Penyintas', contact: 'komunitas@onkosob.id', hours: 'Online group' },
]

const learningResources = [
  { title: 'Panduan Singkat Radioterapi untuk Pasien', type: 'PDF' },
  { title: 'Video: Mengelola Kelelahan Saat Terapi', type: 'Video' },
  { title: 'Checklist Persiapan Kontrol Mingguan', type: 'Checklist' },
]

const PatientCommunityPage = () => {
  const [symptoms, setSymptoms] = useState({
    nyeri: false,
    mual: false,
    lelah: false,
    nafsuMakanTurun: false,
  })
  const [medicinePlan, setMedicinePlan] = useState('08.00 obat pagi • 13.00 hidrasi • 20.00 obat malam')
  const [waterIntake, setWaterIntake] = useState(5)
  const [mealScore, setMealScore] = useState(3)
  const [mood, setMood] = useState(4)
  const [energy, setEnergy] = useState(3)
  const [faqKeyword, setFaqKeyword] = useState('')
  const [visitChecklist, setVisitChecklist] = useState([
    { id: 1, text: 'Bawa daftar obat yang sedang dikonsumsi', done: true },
    { id: 2, text: 'Catat gejala sejak kunjungan terakhir', done: false },
    { id: 3, text: 'Siapkan pertanyaan untuk dokter', done: false },
    { id: 4, text: 'Bawa hasil lab / radiologi terbaru', done: true },
  ])

  const symptomCount = Object.values(symptoms).filter(Boolean).length
  const filteredFaq = useMemo(
    () => faqItems.filter((item) => `${item.q} ${item.tag}`.toLowerCase().includes(faqKeyword.toLowerCase())),
    [faqKeyword],
  )

  return (
    <div className="page">
      <SectionHeader
        title="Pasien & Masyarakat"
        subtitle="10 fitur praktis untuk edukasi, pemantauan mandiri, dan dukungan harian."
      />

      <Card title="1) Tracker Gejala Harian" subtitle="Centang gejala yang dirasakan hari ini">
        <div className="form-grid">
          {Object.keys(symptoms).map((key) => (
            <label key={key} className="check-item">
              <input
                type="checkbox"
                checked={symptoms[key]}
                onChange={() => setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }))}
              />
              <span>{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
        <p className="result">Gejala aktif: <strong>{symptomCount}</strong></p>
      </Card>

      <Card title="2) Rencana Obat & Terapi" subtitle="Catat jadwal sederhana harian">
        <textarea className="input textarea" value={medicinePlan} onChange={(e) => setMedicinePlan(e.target.value)} />
      </Card>

      <Card title="3) FAQ Pasien" subtitle="Cari pertanyaan yang sering ditanyakan">
        <input className="input" placeholder="Cari FAQ..." value={faqKeyword} onChange={(e) => setFaqKeyword(e.target.value)} />
        <ul className="list">
          {filteredFaq.map((item) => (
            <li key={item.q}>
              <div>
                <strong>{item.q}</strong>
                <p className="hint">{item.a}</p>
              </div>
              <small>{item.tag}</small>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="4) Tracker Hidrasi" subtitle="Target 8 gelas per hari">
        <input type="range" min="0" max="12" value={waterIntake} onChange={(e) => setWaterIntake(Number(e.target.value))} />
        <p className="result">{waterIntake} gelas hari ini</p>
      </Card>

      <Card title="5) Skor Asupan Nutrisi" subtitle="Penilaian cepat kualitas makan (1-5)">
        <input type="range" min="1" max="5" value={mealScore} onChange={(e) => setMealScore(Number(e.target.value))} />
        <p className="result">Skor nutrisi: {mealScore}/5</p>
      </Card>

      <Card title="6) Mood & Energi" subtitle="Pantau kondisi psikologis dan stamina">
        <label>
          Mood ({mood}/5)
          <input type="range" min="1" max="5" value={mood} onChange={(e) => setMood(Number(e.target.value))} />
        </label>
        <label>
          Energi ({energy}/5)
          <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} />
        </label>
      </Card>

      <Card title="7) Checklist Kunjungan" subtitle="Persiapan sebelum kontrol ke fasilitas kesehatan">
        <ul className="list">
          {visitChecklist.map((item) => (
            <li key={item.id}>
              <label className="check-item">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => setVisitChecklist((prev) => prev.map((it) => it.id === item.id ? { ...it, done: !it.done } : it))}
                />
                <span>{item.text}</span>
              </label>
              <small>{item.done ? 'Siap' : 'Belum'}</small>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="8) Direktori Dukungan" subtitle="Akses bantuan non-medis dan komunitas">
        <ul className="list">
          {supportServices.map((item) => (
            <li key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <p className="hint">{item.contact}</p>
              </div>
              <small>{item.hours}</small>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="9) Mitos vs Fakta" subtitle="Lawan informasi yang salah">
        <div className="stack">
          {mythFacts.map((item) => (
            <div key={item.myth} className="fact-box">
              <p><strong>Mitos:</strong> {item.myth}</p>
              <p><strong>Fakta:</strong> {item.fact}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="10) Pojok Edukasi" subtitle="Materi belajar ringkas untuk pasien & keluarga">
        <ul className="list">
          {learningResources.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <small>{item.type}</small>
            </li>
          ))}
        </ul>
        <h4 style={{ marginBottom: 8 }}>Kamus Istilah</h4>
        <ul className="list">
          {glossary.map((item) => (
            <li key={item.term}>
              <div>
                <strong>{item.term}</strong>
                <p className="hint">{item.meaning}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default PatientCommunityPage
