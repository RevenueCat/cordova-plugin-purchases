import Purchases, { PurchasesPackage, PurchasesStoreProduct, PURCHASE_TYPE } from '../src/plugin/plugin';

const exec = jest.fn();
const product = { identifier: 'product' } as PurchasesStoreProduct;
const aPackage = { identifier: 'monthly', offeringIdentifier: 'offering' } as PurchasesPackage;
const token = 'header.deny.signature';

beforeEach(() => {
  exec.mockReset();
  window.cordova = { exec, platformId: 'ios' };
});

const paths = [
  ['product id', (jws: string | null | undefined, success: any, error: any) => Purchases.purchaseProduct('product', success, error, null, PURCHASE_TYPE.SUBS, jws)],
  ['store product', (jws: string | null | undefined, success: any, error: any) => Purchases.purchaseStoreProduct(product, success, error, null, false, jws)],
  ['package', (jws: string | null | undefined, success: any, error: any) => Purchases.purchasePackage(aPackage, success, error, null, null, false, jws)],
] as const;

describe.each(paths)('eligibility JWS: %s', (name, purchase) => {
  test.each(['ios'])('forwards unchanged on %s', platform => {
    window.cordova.platformId = platform;
    purchase(token, jest.fn(), jest.fn());
    expect(exec).toHaveBeenCalledTimes(1);
    expect(exec.mock.calls[0][3]).toBe('purchaseWithIntroductoryOfferEligibilityJWS');
    expect(exec.mock.calls[0][4][0].introductoryOfferEligibilityJWS).toBe(token);
    expect(exec.mock.calls[0][4][0][name === 'package' ? 'packageIdentifier' : 'productIdentifier']).toBe(name === 'package' ? 'monthly' : 'product');
    if (name === 'package') expect(exec.mock.calls[0][4][0].presentedOfferingContext.offeringIdentifier).toBe('offering');
  });
  test.each([null, undefined])('keeps legacy bridge for %s', token => {
    purchase(token, jest.fn(), jest.fn());
    expect(exec.mock.calls[0][3]).toBe(name === 'package' ? 'purchasePackage' : 'purchaseProduct');
  });
  test.each(['android', 'browser', 'osx', undefined])('rejects %s before exec', platform => {
    window.cordova.platformId = platform;
    const error = jest.fn();
    purchase(token, jest.fn(), error);
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ error: expect.objectContaining({ code: 24 }), userCancelled: false }));
    expect(exec).not.toHaveBeenCalled();
  });
  test.each(['', 123, false, {}])('rejects invalid token %s', token => {
    const error = jest.fn();
    purchase(token as string, jest.fn(), error);
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ error: expect.objectContaining({ code: 4 }) }));
    expect(exec).not.toHaveBeenCalled();
  });
  test('preserves native rejection without retry', () => {
    const error = jest.fn();
    purchase(token, jest.fn(), error);
    exec.mock.calls[0][1]({ code: 24, message: 'unsupported' });
    expect(error).toHaveBeenCalledWith({ error: { code: 24, message: 'unsupported' }, userCancelled: false });
    expect(exec).toHaveBeenCalledTimes(1);
  });
});
