import { Locale } from '@/config/i18n.config';

export type { Locale };

export interface Dictionary {
  common: {
    loading: string;
    error: string;
    retry: string;
    notFound: string;
    viewAll: string;
    readMore: string;
    showLess: string;
    done: string;
    close: string;
    search: string;
    previous: string;
    next: string;
    all: string;
    perMonth: string;
    squareMeters: string;
    bedrooms: string;
    bathrooms: string;
    garage: string;
  };
  nav: {
    brandName: string;
    buy: string;
    rent: string;
    sell: string;
    savedHomes: string;
    searchAria: string;
    notificationsAria: string;
    profileAria: string;
    openMenuAria: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    searchPlaceholder: string;
    searchButton: string;
  };
  categories: {
    all: string;
    house: string;
    apartment: string;
    villa: string;
    penthouse: string;
    filtersButton: string;
  };
  featured: {
    title: string;
    subtitle: string;
    viewAllButton: string;
    exclusiveBadge: string;
    newArrivalBadge: string;
  };
  market: {
    title: string;
    subtitleFresh: string;
    showingRange: string;
    tabAll: string;
    tabSale: string;
    tabRent: string;
    badgeSale: string;
    badgeRent: string;
    emptyState: string;
    pageIndicator: string;
  };
  propertyCard: {
    forSaleBadge: string;
    forRentBadge: string;
    addFavoriteAria: string;
    removeFavoriteAria: string;
    bedsShort: string;
    bathsShort: string;
    areaUnit: string;
  };
  filtersModal: {
    title: string;
    closeAria: string;
    locationLabel: string;
    locationPlaceholder: string;
    priceRangeLabel: string;
    minPriceLabel: string;
    maxPriceLabel: string;
    propertyTypeLabel: string;
    anyTypeOption: string;
    propertyTypeHouse: string;
    propertyTypeApartment: string;
    propertyTypeCondo: string;
    propertyTypeTownhouse: string;
    propertyTypeVilla: string;
    propertyTypePenthouse: string;
    bedroomsLabel: string;
    bathroomsLabel: string;
    anyCount: string;
    amenitiesLabel: string;
    clearAll: string;
    showHomesButton: string;
    showHomeButtonSingle: string;
  };
  amenities: {
    swimmingPool: string;
    gym: string;
    parking: string;
    airConditioning: string;
    highSpeedWifi: string;
    patioTerrace: string;
    smartHome: string;
    centralHeatingCooling: string;
    evCharging: string;
    wineCellar: string;
  };
  propertyDetails: {
    premiumBadge: string;
    newBadge: string;
    viewAllPhotos: string;
    photoCounter: string;
    previousPhotoAria: string;
    nextPhotoAria: string;
    featuresTitle: string;
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;
    aboutParagraph3: string;
    amenitiesTitle: string;
  };
  mortgage: {
    title: string;
    subtitle: string;
    calculateButton: string;
    modalTitle: string;
    homePriceLabel: string;
    downPaymentLabel: string;
    interestRateLabel: string;
    loanTermLabel: string;
    term15Years: string;
    term30Years: string;
    monthlyPaymentLabel: string;
  };
  agent: {
    topRatedBadge: string;
    chatAria: string;
    callAria: string;
    scheduleVisitButton: string;
    contactAgentButton: string;
    scheduleModalTitle: string;
    contactModalTitle: string;
    yourNameLabel: string;
    yourNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    preferredDateLabel: string;
    messageLabel: string;
    defaultScheduleMessage: string;
    defaultContactMessage: string;
    sendInquiryButton: string;
    successTitle: string;
    successMessage: string;
  };
  map: {
    leafletBadge: string;
    loading: string;
    viewOnMap: string;
    interactiveTitle: string;
  };
  footer: {
    copyright: string;
    homeLink: string;
    propertiesLink: string;
    privacyLink: string;
    termsLink: string;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    propertyNotFoundTitle: string;
    propertyNotFoundDescription: string;
  };
}
