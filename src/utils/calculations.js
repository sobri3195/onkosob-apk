export const calculateBed = ({ totalDose, fractions, alphaBeta }) => {
  const dosePerFraction = totalDose / fractions
  const bed = totalDose * (1 + dosePerFraction / alphaBeta)
  return Number.isFinite(bed) ? bed : 0
}

export const calculateEqd2 = ({ totalDose, fractions, alphaBeta }) => {
  const bed = calculateBed({ totalDose, fractions, alphaBeta })
  const eqd2 = bed / (1 + 2 / alphaBeta)
  return Number.isFinite(eqd2) ? eqd2 : 0
}

export const calculateDoseFraction = ({ knownDose, knownFraction, targetFraction }) => {
  const dosePerFraction = knownDose / knownFraction
  const estimatedTotal = dosePerFraction * targetFraction
  return Number.isFinite(estimatedTotal) ? estimatedTotal : 0
}
