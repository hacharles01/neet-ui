export const initialState = {
  registrationForm: {
    // Personal Information
    registrationType: '', // 'KWIGA_IMYUGA' or 'GUSHAKIRWA_AKAZI'
    firstName: '',
    lastName: '',
    nationalId: '',
    gender: '',
    dateOfBirth: null,
    telephone: '',
    email: '',
    
    // Location Information
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    
    // Education Level
    educationLevel: '',
    
    // Skills/Professions
    primarySkill: '',
    secondarySkill: '',
    tertiarySkill: '',
    otherSkills: '',
  },

// nid
    nidVerification: {
    verifying: false,
    verified: false,
    verificationError: null,
    nidData: null,
  },
  
  // Form state
  formErrors: {},
  submitting: false,
  submitSuccess: false,
  submitError: null,
  submitResponse: null,
  
  // Location data
  locationData: {
    provinces: [
      'KIGALI',
      'SOUTHERN',
      'WESTERN',
      'NORTHERN',
      'EASTERN'
    ],
    districts: {
      'KIGALI': ['NYANZA', 'GISAGARA', 'NYARUGURU', 'HUYE', 'NYAMAGABE', 'RUHANGO', 'MUHANGA', 'KAMONYI'],
      'SOUTHERN': ['NYANZA', 'GISAGARA', 'NYARUGURU', 'HUYE', 'NYAMAGABE', 'RUHANGO', 'MUHANGA', 'KAMONYI'],
      'WESTERN': ['NYANZA', 'GISAGARA', 'NYARUGURU', 'HUYE', 'NYAMAGABE', 'RUHANGO', 'MUHANGA', 'KAMONYI'],
      'NORTHERN': ['NYANZA', 'GISAGARA', 'NYARUGURU', 'HUYE', 'NYAMAGABE', 'RUHANGO', 'MUHANGA', 'KAMONYI'],
      'EASTERN': ['NYANZA', 'GISAGARA', 'NYARUGURU', 'HUYE', 'NYAMAGABE', 'RUHANGO', 'MUHANGA', 'KAMONYI']
    },
    sectors: {
      'NYANZA': ['CYEZA', 'KABACUZI', 'KIBANGU', 'KIYUMBA', 'MUHANGA', 'MUSHISHIRO', 'NYABINONI', 'NYAMABUYE', 'NYARUSANGE', 'RONGIRU', 'GENDABARI', 'SHYOGWE']
    },
    cells: {
      'CYEZA': ['GASAVE', 'KANYANA', 'KIBAGA', 'MPINGANSANGA']
    },
    villages: {
      'GASAVE': ['GAKOMA', 'GASHARU', 'GITURWA', 'NYAGASOZI', 'NYAKIBUYE', 'NYAMATETE']
    }
  },
  
  // Education levels
  educationLevels: [
    'Utarageze mu ishuri',
    'Amashuri abanza',
    'Icyiciro rusange',
    'Amashuri yisumbuye',
    'Kaminuza (University)',
    'Uwize imyuga (Vocation Training)',
    'Amashuri yisumbuye y\'ubumenyi rusange (General Education)',
    'Amashuri yisumbuye ya Tekiniki (TSS)',
    'Amashuri makuru ya Tekiniki (Polytechnics)'
  ],
  
  // Available skills/professions
  availableSkills: [
    'Gucuranga (Music instruments playing)',
    'bugeni n\'ubuhanzi (Ceramic and sculpture making)',
    'Ubudozi (Tailoring)',
    'Gushushanya (Drawing)',
    'Ubugeni n\'ubukorikori (Fine and plastic arts)',
    'Gukora imitako (Jewery making)',
    'Kuboha (Knetting)',
    'Gutunganya amajwi n\'amashusho (Videography)',
    'Gusana no kwita kuri mudasobwa (Computer repair and maintenance)',
    'Gushyira camera z\'umutekano ku nyubako (CCTV installation)',
    'Gukora porogaramu zimikino yo kuri mudasobwa (Game application development)',
    'Gusana ibikoresho byo mu rugo bikoresha ingufu z\'amashanyarazi (Repair electrical household appliances)',
    'Gushyira amashanyarazi akomoka ku mirasire y\'izuba ku nyubako (Instal buildings solar energy)',
    'Gukora amakara muri nyiramugengeri n\'ibishingwe (Making briquette and purete)',
    'Gukora amashyiga ya kijyambere na Biyogaze (Making modern stoves and biogas)',
    'Gusana telefone (Phone repair)',
    'Gusana ibikoresho byo mu rugo bya eregitoronike (Repair Electronics household appliances)',
    'Gusudira (Welding)',
    'Gucura (Forging)',
    'Gucukura amabuye y\'agaciro (Mining)',
    'Gutunganya imisatsi (Hair dressing)',
    'Kogosha (Hair cutting)',
    'Gutunganya ubwiza bw\'umubiri (Body aestetic)',
    'Gukanika imodoka (Automobile repair and maintenance)',
    'Kugorora imodoka no gutera amarangi (Auto body works)',
    'Gukanika amapikipiki (Motorcycle repair and maintenance)',
    'Guteranya amapikipiki (Motorcycle assembling)',
    'Gukanika imashini nini, ibinyabiziga bidasanzwe (Heavy and special vehicle repair and maintenance)',
    'Gukanika amagare (Bicycles repairing)',
    'Gutwara imodoka (Driving)',
    'Gutwara amakamyo (Heavy duty vehicles driving)',
    'Gukanika amashanyarazi y\'imodoka (Electric hybrid vehicle repairing)',
    'Gutwara ibinyabiziga bidasanzwe (Heavy machinery operation)',
    'Ubwubatsi bw\'amazu (Building construction)',
    'Kubaka amakaro (Tiling)',
    'Kubaka Igisenge (Carpentry)',
    'Gukinga ibirahure (Glazing)',
    'Kubumba amatafari n\'amapave (Paves and blocks making)',
    'Gutaka inzu (Building decoration)',
    'Gusiga amarangi (Building painting)',
    'Gukora amazi (Plumbing)',
    'Ubworozi bw\'ingurube (Pig farming)',
    'Ubworozi bw\'inkoko (Poultry farming)',
    'Ubworozi bw\'amafi (Fish farming)',
    'Ubworozi bw\'inkwavu (Rabbit farming)',
    'Ubuvumvu (Beekeeping)',
    'Ubworozi bw\'amatungo yuza (Ruminant farming)',
    'Ubuhinzi bw\'imboga n\'imbuto (Fruits and vegetable crop cultivation)',
    'Ubuhinzi bw\'ibinyampeke n\'ibinyabijumba (Cereals, roots and tubers crops cultivation)',
    'Guhingisha imashini (Agriculture mechanization)',
    'Ubuhinzi bw\'ibihingwa ngengabukungu (Industrial crops cultivation)',
    'Gutunganya ibikomoka ku mbuto n\'imboga (Fruit and vegetable processing)',
    'Gutunganya inyama (Meat processing)',
    'Gutunganya ibikomoka ku mata (Milk processing)',
    'Gutunganya ibikomoka ku ifarini (Bakery)',
    'Gutunganya ikawa (Coffee processing)',
    'Gukora ibikoresho bikomoka ku mpu (Leather works)',
    'Kuhira imyaka (Irrigation)',
    'Gukora ibikoresho byo mu rugo no mu biro (Furniture making)',
    'Gukoresha imashini zumisha ibikomoka ku biti (Kiln operation)',
    'Guteka (Culinary arts)',
    'Kwakira abaje gushaka amafunguro muri hotel (Food and beverage services)',
    'Kwakira abaje gusura no gucumbika muri hotel (Front office)',
    'Kubungabunga isuku ya hoteri (Housekeeping)',
    'Ubukerarugendo (Tourism)'
  ],
  
  selectedSkills: []
};
