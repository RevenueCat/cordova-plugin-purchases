RevenueCat for Cordova v3 is here!! 

![Dancing cats](https://media.giphy.com/media/lkbNG2zqzHZUA/giphy.gif)

[Full Changelog](https://github.com/revenuecat/cordova-plugin-purchases/compare/2.4.1...3.0.0)

### Updating plugin for the most recent RevenueCat frameworks released!
#### StoreKit 2 support
This version of the SDK automatically uses StoreKit 2 APIs under the hood only for APIs that the RevenueCat team has determined work better than StoreKit 1.

#### New types and cleaned up naming
New types that wrap native types from Apple, Google and Amazon, and we cleaned up the naming of other types and methods for a more consistent experience.

### Removed APIs
- `identify` and `createAlias` have been removed in favor of `logIn`.
- `reset` has been removed in favor of `logOut`.
- `getEntitlements` has been removed in favor of `getOfferings`.
- `attributionKey` and `Purchases.addAttributionData` have been removed in favor of `set<NetworkID> methods`.

### Renamed APIs
| 2.x | 3.0.0 |
| :-: | :-: |
| `PurchaserInfo` | `CustomerInfo` |
| `PurchasesTransaction` | `PurchasesStoreTransaction` |
| `PurchasesProduct` | `PurchasesStoreProduct` |
| `Purchases.RestoreTransactions` | `Purchases.restorePurchases` |
| `Purchases.GetPaymentDiscount` | `Purchases.getPromotionalOffer` |
| `Purchases.UpdatedPurchaserInfoListener` | `Purchases.updatedCustomerInfoListener` |
| `Purchases.getProductInfo` | `Purchases.getProducts` |
| `Purchases.setup` | `Purchases.configure` |
| `PurchasesStoreProduct.intro_price` | `PurchasesStoreProduct.introPrice` |
| `PurchasesStoreProduct.price_string` | `PurchasesStoreProduct.priceString` |
| `PurchasesStoreProduct.currency_code` | `PurchasesStoreProduct.currencyCode` |

### Bugfixes
* Configure should be called in the current thread and not in a UI thread (#193) via Cesar de la Vega (@vegaro)
### New Features
* Add support for Firebase, Mixpanel, and CleverTap integrations (#177) via Joshua Liebowitz (@taquitos)
* Apple AdServices support (#167)
### Other Changes
* Improve purchase tester (#186) via Andy Boedo (@aboedo)
* cordova-plugin-purchases requires Xcode 13.0+ and minimum targets iOS 11.0+ and macOS 10.13+ (#160) via NachoSoto (@NachoSoto)