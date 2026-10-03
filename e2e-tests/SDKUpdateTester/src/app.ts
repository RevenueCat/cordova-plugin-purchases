// Created by Antonio Pallares. Copyright (c) 2026 RevenueCat, Inc.
import type { CustomerInfo, PurchasesPackage, PurchasesOfferings, LogInResult } from 'cordova-plugin-purchases';

declare const Purchases: typeof import('cordova-plugin-purchases').default;
declare const LaunchArgs: {
  getArgument(name: string, success: (value: string) => void, error: (error: unknown) => void): void;
};
declare global {
  interface Window {
    sdkUpdateConfig: { apiKey: string; sdkVersion: string };
  }
}
const config = window.sdkUpdateConfig;

interface State {
  sdkVersion: string;
  appUserID: string;
  entitlements: string;
  screen: 'home' | 'purchase';
  canLogIn: boolean;
  busy: boolean;
  error: string;
}

const app = document.getElementById('app')!;
const state: State = {
  sdkVersion: config.sdkVersion,
  appUserID: 'Loading...',
  entitlements: 'Loading...',
  screen: 'home',
  canLogIn: false,
  busy: true,
  error: '',
};
let loginID: string | null = null;
let monthly: PurchasesPackage | null = null;

function render() {
  app.replaceChildren();
  const label = (text: string, heading = false) => {
    const element = document.createElement(heading ? 'h1' : 'p');
    element.textContent = text;
    app.append(element);
  };
  const button = (text: string, action: string) => {
    const element = document.createElement('button');
    element.textContent = text;
    element.disabled = state.busy;
    element.addEventListener('click', () => void perform(action));
    app.append(element);
  };
  if (state.screen === 'purchase') {
    label('Purchase subscription', true);
    label(`Entitlements: ${state.entitlements}`);
    button('Purchase', 'purchase');
    button('Back', 'back');
  } else {
    label('SDK Update Tester', true);
    label(`RevenueCat SDK ${state.sdkVersion}`);
    label(`App User ID: ${state.appUserID}`);
    if (state.canLogIn) button('Log in', 'log_in');
    button('Purchase screen', 'purchase_screen');
  }
  if (state.error) label(state.error);
}

function updateCustomerInfo(info: CustomerInfo) {
  state.entitlements = Object.keys(info.entitlements.active).sort().join(', ') || 'None';
}

async function perform(action: string) {
  if (state.busy) return;
  state.busy = true;
  state.error = '';
  try {
    if (action === 'purchase_screen') {
      state.screen = 'purchase';
      state.entitlements = 'Loading...';
      render();
      const [offerings, result] = await Promise.all([
        new Promise<PurchasesOfferings>((resolve, reject) => Purchases.getOfferings(resolve, reject)),
        new Promise<CustomerInfo>((resolve, reject) => Purchases.getCustomerInfo(resolve, reject)),
      ]);
      monthly = offerings.all.no_paywall?.monthly ?? null;
      if (
        !monthly ||
        monthly.identifier !== '$rc_monthly' ||
        monthly.product.identifier !== 'pro_monthly_subscription'
      ) {
        throw new Error('no_paywall must provide the monthly pro_monthly_subscription package');
      }
      updateCustomerInfo(result);
    } else if (action === 'log_in' && loginID) {
      const result = await new Promise<LogInResult>((resolve, reject) => Purchases.logIn(loginID!, resolve, reject));
      state.appUserID = await new Promise<string>((resolve) => Purchases.getAppUserID(resolve));
      updateCustomerInfo(result.customerInfo);
    } else if (action === 'purchase' && monthly) {
      const result = await new Promise<{ customerInfo: CustomerInfo }>((resolve, reject) =>
        Purchases.purchasePackage(monthly!, resolve, ({ error }) => reject(error)),
      );
      updateCustomerInfo(result.customerInfo);
    } else if (action === 'back') {
      state.screen = 'home';
    }
  } catch (error) {
    state.error = error instanceof Error ? error.message : JSON.stringify(error);
  } finally {
    state.busy = false;
    render();
  }
}

async function initialize() {
  try {
    loginID = await new Promise<string>((resolve, reject) =>
      LaunchArgs.getArgument('app_user_id_to_log_in', resolve, reject),
    );
    state.canLogIn = Boolean(loginID);
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configureWith({ apiKey: config.apiKey });
    state.appUserID = await new Promise<string>((resolve) => Purchases.getAppUserID(resolve));
  } catch (error) {
    state.error = error instanceof Error ? error.message : JSON.stringify(error);
  } finally {
    state.busy = false;
    render();
  }
}

document.addEventListener('deviceready', () => void initialize(), { once: true });
