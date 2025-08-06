import {
  PurchasesVirtualCurrency
} from "../www/plugin";

function checkVirtualCurrency(virtualCurrency: PurchasesVirtualCurrency) {
    const balance: number = virtualCurrency.balance;
    const name: string = virtualCurrency.name;
    const code: string = virtualCurrency.code;
    const serverDescription: string | null = virtualCurrency.serverDescription;
}
