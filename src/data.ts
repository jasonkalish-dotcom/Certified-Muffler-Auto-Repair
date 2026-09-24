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
};

export type Photo = (typeof photos)[keyof typeof photos];
