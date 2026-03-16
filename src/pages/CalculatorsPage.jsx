import { useState } from 'react'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import BookmarkButton from '../components/BookmarkButton'
import { calculateBed, calculateDoseFraction, calculateEqd2 } from '../utils/calculations'
import { useBookmarks, useCalculatorHistory, useRecentActivity } from '../hooks/useAppData'

const baseForm = { totalDose: 60, fractions: 30, alphaBeta: 10 }

const CalculatorsPage = () => {
  const [form, setForm] = useState(baseForm)
  const [helper, setHelper] = useState({ knownDose: 50, knownFraction: 25, targetFraction: 20 })
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { history, addHistory } = useCalculatorHistory()
  const { addRecent } = useRecentActivity()

  const bed = calculateBed(form)
  const eqd2 = calculateEqd2(form)
  const helperResult = calculateDoseFraction(helper)

  const saveCalc = (type, value) => {
    addHistory({ type, value, input: type === 'Dose/Fraction' ? helper : form })
    addRecent('Saved calculator history', `${type}: ${value.toFixed(2)}`)
  }

  return (
    <div className="page">
      <SectionHeader title="Calculators" subtitle="Untuk pembelajaran radiobiologi dan estimasi konsep dosis/fraksi." />

      <Card title="BED Calculator" subtitle="Biologically Effective Dose">
        <div className="form-grid">
          <label>Total dose (Gy)<input className="input" type="number" value={form.totalDose} onChange={(e) => setForm({ ...form, totalDose: Number(e.target.value) })} /></label>
          <label>Fractions<input className="input" type="number" value={form.fractions} onChange={(e) => setForm({ ...form, fractions: Number(e.target.value) })} /></label>
          <label>Alpha/Beta (Gy)<input className="input" type="number" value={form.alphaBeta} onChange={(e) => setForm({ ...form, alphaBeta: Number(e.target.value) })} /></label>
        </div>
        <p className="result">Hasil BED: <strong>{bed.toFixed(2)} Gy</strong></p>
        <p className="hint">Interpretasi edukatif: BED meningkat saat dosis/fraksi meningkat.</p>
        <div className="action-row">
          <button className="btn" onClick={() => saveCalc('BED', bed)}>Simpan history</button>
          <BookmarkButton
            isBookmarked={isBookmarked({ id: 'bed-calculator', type: 'calculator' })}
            onClick={() => toggleBookmark({ id: 'bed-calculator', type: 'calculator', title: 'BED Calculator' })}
          />
        </div>
      </Card>

      <Card title="EQD2 Calculator" subtitle="Equivalent Dose in 2 Gy Fractions">
        <p className="result">Hasil EQD2: <strong>{eqd2.toFixed(2)} Gy</strong></p>
        <p className="hint">Interpretasi edukatif: EQD2 memudahkan perbandingan skema fraksinasi berbeda.</p>
        <div className="action-row">
          <button className="btn" onClick={() => saveCalc('EQD2', eqd2)}>Simpan history</button>
          <BookmarkButton
            isBookmarked={isBookmarked({ id: 'eqd2-calculator', type: 'calculator' })}
            onClick={() => toggleBookmark({ id: 'eqd2-calculator', type: 'calculator', title: 'EQD2 Calculator' })}
          />
        </div>
      </Card>

      <Card title="Dose/Fraction Helper" subtitle="Estimasi total dose berdasarkan target fraction">
        <div className="form-grid">
          <label>Known dose<input className="input" type="number" value={helper.knownDose} onChange={(e) => setHelper({ ...helper, knownDose: Number(e.target.value) })} /></label>
          <label>Known fraction<input className="input" type="number" value={helper.knownFraction} onChange={(e) => setHelper({ ...helper, knownFraction: Number(e.target.value) })} /></label>
          <label>Target fraction<input className="input" type="number" value={helper.targetFraction} onChange={(e) => setHelper({ ...helper, targetFraction: Number(e.target.value) })} /></label>
        </div>
        <p className="result">Estimasi total dose: <strong>{helperResult.toFixed(2)} Gy</strong></p>
        <div className="action-row">
          <button className="btn" onClick={() => saveCalc('Dose/Fraction', helperResult)}>Simpan history</button>
          <BookmarkButton
            isBookmarked={isBookmarked({ id: 'dose-fraction-helper', type: 'calculator' })}
            onClick={() => toggleBookmark({ id: 'dose-fraction-helper', type: 'calculator', title: 'Dose/Fraction Helper' })}
          />
        </div>
      </Card>

      <Card title="Riwayat Kalkulasi">
        {history.length ? (
          <ul className="list">
            {history.slice(0, 6).map((entry, index) => (
              <li key={`${entry.createdAt}-${index}`}>
                <span>{entry.type}: {Number(entry.value).toFixed(2)}</span>
                <small>{new Date(entry.createdAt).toLocaleString('id-ID')}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="hint">Belum ada history tersimpan.</p>
        )}
      </Card>
    </div>
  )
}

export default CalculatorsPage
