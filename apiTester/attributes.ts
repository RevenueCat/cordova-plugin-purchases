import Purchases from "../www/plugin";

function checkAttributes(purchases: Purchases) {
  const attributes: { [key: string]: string | null } = {};
  const stringOrNull: string | null = "";

  Purchases.setAttributes(attributes);
  Purchases.setEmail(stringOrNull);
  Purchases.setPhoneNumber(stringOrNull);
  Purchases.setDisplayName(stringOrNull);
  Purchases.setPushToken(stringOrNull);
  Purchases.setAdjustID(stringOrNull);
  Purchases.setAppsflyerID(stringOrNull);
  Purchases.setFBAnonymousID(stringOrNull);
  Purchases.setMparticleID(stringOrNull);
  Purchases.setOnesignalID(stringOrNull);
  Purchases.setAirshipChannelID(stringOrNull);
  Purchases.setCleverTapID(stringOrNull);
  Purchases.setMixpanelDistinctID(stringOrNull);
  Purchases.setFirebaseAppInstanceID(stringOrNull);
  Purchases.setMediaSource(stringOrNull);
  Purchases.setCampaign(stringOrNull);
  Purchases.setAdGroup(stringOrNull);
  Purchases.setAd(stringOrNull);
  Purchases.setKeyword(stringOrNull);
  Purchases.setCreative(stringOrNull);

  Purchases.collectDeviceIdentifiers();
  Purchases.enableAdServicesAttributionTokenCollection();
}
