import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'

const AboutPage = () => (
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
    <Card title="Teknis">
      <ul className="list">
        <li><span>Frontend only</span><small>React + Vite + React Router</small></li>
        <li><span>Penyimpanan lokal</span><small>localStorage (bookmark, history, notes, recent)</small></li>
        <li><span>Deploy ready</span><small>Vercel static deployment</small></li>
      </ul>
    </Card>
  </div>
)

export default AboutPage
