export const business = {
  name: 'Certified Muffler and Auto Repair, Inc.',
  shortName: 'Certified Muffler',
  rating: 4.9,
  reviewCount: 181,
  category: 'Auto repair shop',
  address: '9 Mill St, Port Chester, NY 10573',
  plusCode: '283R+P7 Port Chester, New York',
  phoneDisplay: '(914) 939-4632',
  phoneHref: 'tel:+19149394632',
  website: 'https://certifiedmufflerauto.com',
  websiteDisplay: 'certifiedmufflerauto.com',
  closesAt: '5:30 PM',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Certified+Muffler+and+Auto+Repair+9+Mill+St+Port+Chester+NY+10573',
};

export const services = [
  {
    name: 'Mufflers & Exhaust',
    description:
      'Repair and replacement of mufflers, pipes, hangers, and gaskets. We track down leaks, rattles, and drones so your car runs quiet again.',
  },
  {
    name: 'Custom & Performance Exhaust',
    description:
      'Cat-back systems, dual exhaust conversions, and polished tips, bent and welded in-house to fit your car and the sound you want.',
  },
  {
    name: 'Catalytic Converters',
    description:
      'Diagnosis and replacement of failed or stolen converters, with heat shields and O2 sensors checked so you pass emissions.',
  },
  {
    name: 'Diagnostics',
    description:
      'Check-engine lights, strange noises, and drivability problems found fast, with a straight explanation before any work starts.',
  },
  {
    name: 'General Auto Repair',
    description:
      'Brakes, suspension, and everyday maintenance handled by the same team that already knows your car from the bottom up.',
  },
];

// ---------------------------------------------------------------------------
// Online booking
// Booking requests go to the first option that is filled in:
//   1. formEndpoint – a form service URL (e.g. https://formspree.io/f/abcdwxyz).
//      Requests arrive in the shop's inbox automatically.
//   2. email – the visitor's email app opens with the request filled in,
//      addressed to this address; they press Send.
//   3. Neither set – the visitor sees their request summary and is asked to
//      call the shop to confirm.
// ---------------------------------------------------------------------------
export const booking = {
  formEndpoint: '',
  email: '',
};

export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  exhaustUnderside: {
    src: 'images/exhaust-underside.jpg',
    alt: 'Dual stainless exhaust with blue-tipped pipes seen from under a car on the lift',
  },
  supraOnLift: {
    src: 'images/supra-on-lift.jpg',
    alt: 'Toyota GR Supra on a lift inside the Certified Muffler shop',
  },
  durangoQuadTips: {
    src: 'images/durango-quad-tips.jpg',
    alt: 'Rear of a black Dodge Durango showing quad exhaust tips',
  },
  catHeatShield: {
    src: 'images/cat-heat-shield.jpg',
    alt: 'Underbody view of catalytic converters, heat shield and exhaust piping',
  },
  mufflerWall: {
    src: 'images/muffler-wall.jpg',
    alt: 'Shop wall stocked with exhaust tips, hose clamps and mufflers',
  },
  challengerHoodUp: {
    src: 'images/challenger-hood-up.jpg',
    alt: 'Red Dodge Challenger with its hood up outside the shop',
  },
  dualExhaustUnderside: {
    src: 'images/dual-exhaust-underside.jpg',
    alt: 'Underside of a car on the lift with a new muffler and dual exhaust pipes',
  },
  blueDualTips: {
    src: 'images/blue-dual-tips.jpg',
    alt: 'Close-up of burnt-blue dual exhaust tips',
  },
  purpleAccordQuadTips: {
    src: 'images/purple-accord-quad-tips.webp',
    alt: 'Purple Honda Accord with LED tail lights and four black exhaust tips in the shop',
  },
  weldingExhaust: {
    src: 'images/welding-exhaust.webp',
    alt: 'Mechanic welding a new exhaust pipe under a car on the lift, sparks flying',
  },
  yPipeUnderside: {
    src: 'images/y-pipe-underside.jpg',
    alt: 'Underside view of an exhaust Y-pipe and catalytic converter',
  },
  miniOilChange: {
    src: 'images/mini-oil-change.jpg',
    alt: 'Red Mini Cooper on the lift with Mobil oil ready for an oil change',
  },
} satisfies Record<string, Photo>;

// Photos shown in the Gallery section (and the scrolling photo rows).
// To add a photo: put the file in the images/ folder, add a line below,
// then run `npm run build` to update index.html.
export const gallery: Photo[] = [
  photos.weldingExhaust,
  photos.purpleAccordQuadTips,
  photos.supraOnLift,
  photos.blueDualTips,
  photos.exhaustUnderside,
  photos.challengerHoodUp,
  photos.miniOilChange,
  photos.durangoQuadTips,
  photos.dualExhaustUnderside,
  photos.yPipeUnderside,
  photos.mufflerWall,
  photos.catHeatShield,
  // { src: 'images/your-new-photo.jpg', alt: 'Short description of the photo' },
];
