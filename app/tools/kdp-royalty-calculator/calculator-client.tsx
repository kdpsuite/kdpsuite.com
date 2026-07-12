"use client";

import { useState } from "react";

const royaltyOptions = [
  { label: "35%", value: 0.35 },
  { label: "70%", value: 0.7 },
];

export default function RoyaltyCalculatorClient() {
  const [listPrice, setListPrice] = useState("8.99");
  const [estimatedCost, setEstimatedCost] = useState("2.40");
  const [royaltyRate, setRoyaltyRate] = useState(0.7);

  const parsedPrice = Number.parseFloat(listPrice) || 0;
  const parsedCost = Number.parseFloat(estimatedCost) || 0;
  const estimatedRoyalty = parsedPrice * royaltyRate - parsedCost;

  return (
    <div className="rounded-2xl border border-gray-200 p-6 bg-white">
      <h2 className="text-2xl font-bold font-heading mb-6 text-neutral">
        KDP Royalty Calculator
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <label className="font-body text-gray-700">
          List price (USD)
          <input
            type="number"
            step="0.01"
            min="0"
            value={listPrice}
            onChange={(event) => setListPrice(event.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </label>
        <label className="font-body text-gray-700">
          Estimated cost (USD)
          <input
            type="number"
            step="0.01"
            min="0"
            value={estimatedCost}
            onChange={(event) => setEstimatedCost(event.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </label>
        <label className="font-body text-gray-700">
          Royalty rate
          <select
            value={royaltyRate}
            onChange={(event) => setRoyaltyRate(Number(event.target.value))}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {royaltyOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-600 font-body mb-2">
          Estimated royalty per sale
        </p>
        <p className="text-3xl font-bold text-neutral font-heading">
          ${estimatedRoyalty.toFixed(2)}
        </p>
      </div>
      <p className="text-sm text-gray-600 font-body mt-4">
        This estimate is for planning only. Final royalties depend on format and
        marketplace-specific fees.
      </p>
    </div>
  );
}
