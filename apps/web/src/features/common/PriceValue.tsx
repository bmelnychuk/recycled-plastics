import { FC } from "react";

interface Price {
    amount: number;
    currency: string;
}

const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "CHF",
    CNY: "¥",
};

const formatPrice = (price: Price): string => {
    const { amount, currency } = price;
    const value = amount / 100;
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${value.toFixed(2)}`;
};


export const PriceValue: FC<{ price: Price }> = ({ price }) => {
    return <>{formatPrice(price)}</>;
};