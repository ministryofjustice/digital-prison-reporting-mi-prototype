const domains = [
  'Core Person', // 0
  'Risk', // 1
  'Court/Legal', // 2
  'Running a Prison', // 3
  'Security', // 4
  'Person Plan', // 5
  'Prisoner Specific',// 6
  'CT/SOCT',// 7
  'Intelligence & Corruption',// 8
  'Interventions', // 9
  'Sentence/Offence', // 10
  'License/Breach/Parole', // 11
  'Electronic Monitoring', // 12
  'Court/Legal', // 13
  'Prison WorkForce', // 14
  'Prison Facing' // 15
]

const subDomains = [
  { id: 0, name: 'person register', parentId: 0 },
  { id: 1, name: 'person risks & categories', parentId: 1 },
  { id: 2, name: 'person assessments', parentId: 1 },
  { id: 3, name: 'person parole hearings', parentId: 2 },
  { id: 4, name: 'court schedules', parentId: 2 },
  { id: 5, name: 'cross border transfers', parentId: 2 },
  { id: 6, name: 'prison capacity', parentId: 3 },
  { id: 7, name: 'prisoner location', parentId: 3 },
  { id: 8, name: 'restricted patients', parentId: 3 },
  { id: 9, name: 'prisoner property', parentId: 3 },
  { id: 10, name: 'prisoner non-associations & restrictions', parentId: 4 },
  { id: 11, name: 'prisoner moves', parentId: 4 },
  { id: 12, name: 'interventions plan', parentId: 5 },
  { id: 13, name: 'person professional relationships', parentId: 0 },
  { id: 14, name: 'person personal relationships', parentId: 0 },
  { id: 15, name: 'prisoner incentives', parentId: 6 },
  { id: 16, name: 'mercury/ims/intelligence management', parentId: 8 },
  { id: 17, name: 'education', parentId: 5 },
  { id: 18, name: 'skills', parentId: 5 },
  { id: 19, name: 'work', parentId: 5 },
  { id: 20, name: 'limited/restricted access', parentId: 0 },
  { id: 21, name: 'prisoner pay', parentId: 6 },
  { id: 22, name: 'prisoner activities', parentId: 9 },
  { id: 23, name: 'person protected characteristics', parentId: 0 },
  { id: 24, name: 'person health & medication', parentId: 0 },
  { id: 25, name: 'person omic/pom/com', parentId: 0 },
  { id: 26, name: 'drugs', parentId: 5 },
  { id: 27, name: 'alcohol', parentId: 5 },
  { id: 28, name: 'health', parentId: 5 },
  { id: 29, name: 'mental health', parentId: 5 },
  { id: 30, name: 'history of these things', parentId: 5 },
  { id: 31, name: 'person sentence & calcs', parentId: 10 },
  { id: 32, name: 'person offences/convictions', parentId: 10 },
  { id: 33, name: 'person sentence calculations', parentId: 10 },
  { id: 34, name: 'person mappa management', parentId: 1 },
  { id: 35, name: 'public protection', parentId: 1 },
  { id: 36, name: 'person breaches/recalls/enforcement', parentId: 11 },
  { id: 37, name: 'person licences', parentId: 11 },
  { id: 38, name: 'parole', parentId: 11 },
  { id: 39, name: 'electronic tagging', parentId: 12 },
  { id: 40, name: 'person court schedules', parentId: 2 },
  { id: 41, name: 'person court records', parentId: 2 },
  { id: 42, name: 'immigration referrals', parentId: 2 },
  { id: 43, name: 'cross-border transfers', parentId: 2 },
  { id: 44, name: 'video court appearances', parentId: 2 },
  { id: 45, name: 'person key workers', parentId: 14 },
  { id: 46, name: 'prisoner shopping', parentId: 15 },
  { id: 47, name: 'prisoner money', parentId: 6 },
  { id: 48, name: 'prisoner activities (schedule)', parentId: 9 },
  { id: 49, name: 'prisoner incidents (<irs>)', parentId: 4 },
  { id: 50, name: 'prison security events', parentId: 4 },
  { id: 51, name: 'prisoner adjudication outcomes', parentId: 6 }
]

const products = [
  {
    id: 0, name: 'Move a Prisoner', subDomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 1, name: 'Visit Someone in Prison', subDomains: [12, 0, 13, 14, 10, 15, 16, 16]
  },
  {
    id: 2, name: 'Manage Activities', subDomains: [17, 18, 19, 12, 0, 20, 1, 2, 10, 21, 15, 22]
  },
  {
    id: 3, name: 'Manage a Custodial Sentence', subDomains: [0, 13, 14, 23, 24, 20, 25, 26, 27, 17, 18, 19, 28, 29, 12, 30, 31, 32, 33, 1, 2, 34, 35, 36, 37, 38, 39, 3, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 4, name: 'Prisoner Finance', subDomains: [46, 16, 21, 47, 15, 48, 0]
  },
  {
    id: 5, name: 'Manage Safety', subDomains: [10, 49, 50, 40, 41, 44, 51, 15, 1, 2, 26, 27, 17, 18, 19, 28, 29, 12, 30]
  },
  {
    id: 6, name: 'DPS Platform', subDomains: [0]
  }
]

module.exports = {
  products,
  domains,
  subDomains
}