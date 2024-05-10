const domains = [
  { id: 0, name: 'Core Person', slug: 'core-person' },
  { id: 1, name: 'Risk', slug: 'risk' },
  { id: 2, name: 'Court/Legal', slug: 'court-legal' },
  { id: 3, name: 'Running a Prison', slug: 'running-a-prison' },
  { id: 4, name: 'Security', slug: 'security' },
  { id: 5, name: 'Person Plan', slug: 'person-plan' },
  { id: 6, name: 'Prisoner Specific', slug: 'prisoner-specific' },
  { id: 7, name: 'CT/SOCT', slug: 'ct-soct' },
  {
    id: 8,
    name: 'Intelligence & Corruption',
    slug: 'intelligence-&-corruption'
  },
  { id: 9, name: 'Interventions', slug: 'interventions' },
  { id: 10, name: 'Sentence/Offence', slug: 'sentence-offence' },
  {
    id: 11,
    name: 'License/Breach/Parole',
    slug: 'license-breach-parole'
  },
  {
    id: 12,
    name: 'Electronic Monitoring',
    slug: 'electronic-monitoring'
  },
  { id: 13, name: 'Court/Legal', slug: 'court-legal' },
  { id: 14, name: 'Prison WorkForce', slug: 'prison-workforce' },
  { id: 15, name: 'Prison Facing', slug: 'prison-facing' }
]

const subDomains =
  [
    {
      id: 0,
      name: 'person register',
      parentId: 0,
      slug: 'person-register'
    },
    {
      id: 1,
      name: 'person risks & categories',
      parentId: 1,
      slug: 'person-risks-&-categories'
    },
    {
      id: 2,
      name: 'person assessments',
      parentId: 1,
      slug: 'person-assessments'
    },
    {
      id: 3,
      name: 'person parole hearings',
      parentId: 2,
      slug: 'person-parole-hearings'
    },
    {
      id: 4,
      name: 'court schedules',
      parentId: 2,
      slug: 'court-schedules'
    },
    {
      id: 5,
      name: 'cross border transfers',
      parentId: 2,
      slug: 'cross-border-transfers'
    },
    {
      id: 6,
      name: 'prison capacity',
      parentId: 3,
      slug: 'prison-capacity'
    },
    {
      id: 7,
      name: 'prisoner location',
      parentId: 3,
      slug: 'prisoner-location'
    },
    {
      id: 8,
      name: 'restricted patients',
      parentId: 3,
      slug: 'restricted-patients'
    },
    {
      id: 9,
      name: 'prisoner property',
      parentId: 3,
      slug: 'prisoner-property'
    },
    {
      id: 10,
      name: 'prisoner non-associations & restrictions',
      parentId: 4,
      slug: 'prisoner-non-associations-&-restrictions'
    },
    {
      id: 11,
      name: 'prisoner moves',
      parentId: 4,
      slug: 'prisoner-moves'
    },
    {
      id: 12,
      name: 'interventions plan',
      parentId: 5,
      slug: 'interventions-plan'
    },
    {
      id: 13,
      name: 'person professional relationships',
      parentId: 0,
      slug: 'person-professional-relationships'
    },
    {
      id: 14,
      name: 'person personal relationships',
      parentId: 0,
      slug: 'person-personal-relationships'
    },
    {
      id: 15,
      name: 'prisoner incentives',
      parentId: 6,
      slug: 'prisoner-incentives'
    },
    {
      id: 16,
      name: 'mercury/ims/intelligence management',
      parentId: 8,
      slug: 'mercury-ims-intelligence-management'
    },
    { id: 17, name: 'education', parentId: 5, slug: 'education' },
    { id: 18, name: 'skills', parentId: 5, slug: 'skills' },
    { id: 19, name: 'work', parentId: 5, slug: 'work' },
    {
      id: 20,
      name: 'limited/restricted access',
      parentId: 0,
      slug: 'limited-restricted-access'
    },
    { id: 21, name: 'prisoner pay', parentId: 6, slug: 'prisoner-pay' },
    {
      id: 22,
      name: 'prisoner activities',
      parentId: 9,
      slug: 'prisoner-activities'
    },
    {
      id: 23,
      name: 'person protected characteristics',
      parentId: 0,
      slug: 'person-protected-characteristics'
    },
    {
      id: 24,
      name: 'person health & medication',
      parentId: 0,
      slug: 'person-health-&-medication'
    },
    {
      id: 25,
      name: 'person omic/pom/com',
      parentId: 0,
      slug: 'person-omic-pom-com'
    },
    { id: 26, name: 'drugs', parentId: 5, slug: 'drugs' },
    { id: 27, name: 'alcohol', parentId: 5, slug: 'alcohol' },
    { id: 28, name: 'health', parentId: 5, slug: 'health' },
    { id: 29, name: 'mental health', parentId: 5, slug: 'mental-health' },
    {
      id: 30,
      name: 'history of these things',
      parentId: 5,
      slug: 'history-of-these-things'
    },
    {
      id: 31,
      name: 'person sentence & calcs',
      parentId: 10,
      slug: 'person-sentence-&-calcs'
    },
    {
      id: 32,
      name: 'person offences/convictions',
      parentId: 10,
      slug: 'person-offences-convictions'
    },
    {
      id: 33,
      name: 'person sentence calculations',
      parentId: 10,
      slug: 'person-sentence-calculations'
    },
    {
      id: 34,
      name: 'person mappa management',
      parentId: 1,
      slug: 'person-mappa-management'
    },
    {
      id: 35,
      name: 'public protection',
      parentId: 1,
      slug: 'public-protection'
    },
    {
      id: 36,
      name: 'person breaches/recalls/enforcement',
      parentId: 11,
      slug: 'person-breaches-recalls-enforcement'
    },
    {
      id: 37,
      name: 'person licences',
      parentId: 11,
      slug: 'person-licences'
    },
    { id: 38, name: 'parole', parentId: 11, slug: 'parole' },
    {
      id: 39,
      name: 'electronic tagging',
      parentId: 12,
      slug: 'electronic-tagging'
    },
    {
      id: 40,
      name: 'person court schedules',
      parentId: 2,
      slug: 'person-court-schedules'
    },
    {
      id: 41,
      name: 'person court records',
      parentId: 2,
      slug: 'person-court-records'
    },
    {
      id: 42,
      name: 'immigration referrals',
      parentId: 2,
      slug: 'immigration-referrals'
    },
    {
      id: 43,
      name: 'cross-border transfers',
      parentId: 2,
      slug: 'cross-border-transfers'
    },
    {
      id: 44,
      name: 'video court appearances',
      parentId: 2,
      slug: 'video-court-appearances'
    },
    {
      id: 45,
      name: 'person key workers',
      parentId: 14,
      slug: 'person-key-workers'
    },
    {
      id: 46,
      name: 'prisoner shopping',
      parentId: 15,
      slug: 'prisoner-shopping'
    },
    {
      id: 47,
      name: 'prisoner money',
      parentId: 6,
      slug: 'prisoner-money'
    },
    {
      id: 48,
      name: 'prisoner activities (schedule)',
      parentId: 9,
      slug: 'prisoner-activities-schedule'
    },
    {
      id: 49,
      name: 'prisoner incidents (<irs>)',
      parentId: 4,
      slug: 'prisoner-incidents-irs'
    },
    {
      id: 50,
      name: 'prison security events',
      parentId: 4,
      slug: 'prison-security-events'
    },
    {
      id: 51,
      name: 'prisoner adjudication outcomes',
      parentId: 6,
      slug: 'prisoner-adjudication-outcomes'
    }
  ]

const products = [
  {
    id: 0, slug: 'move-a-prisoner', name: 'Move a Prisoner', subDomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 1, slug: 'visit-someone-in-prison', name: 'Visit Someone in Prison', subDomains: [12, 0, 13, 14, 10, 15, 16, 16]
  },
  {
    id: 2, slug: 'manage-activities', name: 'Manage Activities', subDomains: [17, 18, 19, 12, 0, 20, 1, 2, 10, 21, 15, 22]
  },
  {
    id: 3, slug: 'manage-a-custodial-sentence', name: 'Manage a Custodial Sentence', subDomains: [0, 13, 14, 23, 24, 20, 25, 26, 27, 17, 18, 19, 28, 29, 12, 30, 31, 32, 33, 1, 2, 34, 35, 36, 37, 38, 39, 3, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 4, slug: 'prisoner-finance', name: 'Prisoner Finance', subDomains: [46, 16, 21, 47, 15, 48, 0]
  },
  {
    id: 5, slug: 'manage-safety', name: 'Manage Safety', subDomains: [10, 49, 50, 40, 41, 44, 51, 15, 1, 2, 26, 27, 17, 18, 19, 28, 29, 12, 30]
  },
  {
    id: 6, slug: 'dps-platform', name: 'DPS Platform', subDomains: [0]
  }
]

module.exports = {
  products,
  domains,
  subDomains
}
