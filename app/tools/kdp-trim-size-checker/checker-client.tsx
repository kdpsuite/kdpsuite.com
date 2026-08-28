"use client";

import { useState } from "react";

interface TrimSize {
  label: string;
  width: number;
  height: number;
}

const kdpTrimSizes: TrimSize[] = [
  { label: '5" × 8"', width: 5, height: 8 },
  { label: '5.06" × 7.81"', width: 5.06, height: 7.81 },
  { label: '5.25" × 8"', width: 5.25, height: 8 },
  { label: '5.5" × 8.5"', width: 5.5, height: 8.5 },
  { label: '6" × 9"', width: 6, height: 9 },
  { label: '6.14" × 9.21"', width: 6.14, height: 9.21 },
  { label: '6.69" × 9.61"', width: 6.69, height: 9.61 },
  { label: '7" × 10"', width: 7, height: 10 },
  { label: '7.44" × 9.69"', width: 7.44, height: 9.69 },
  { label: '7.5" × 9.25"', width: 7.5, height: 9.25 },
  { label: '8" × 10"', width: 8, height: 10 },
  { label: '8.25" × 11"', width: 8.25, height: 11 },
  { label: '8.5" × 11"', width: 8.5, height: 11 },
  { label: '8.27" × 11.69"', width: 8.27, height: 11.69 },
];

const TOLERANCE = 0.02;

function findMatch(width: number, height: number): TrimSize | null {
  for (const size of kdpTrimSizes) {
    const directMatch =
      Math.abs(width - size.width) <= TOLERANCE &&
      Math.abs(height - size.height) <= TOLERANCE;
    const rotatedMatch =
      Math.abs(width - size.height) <= TOLERANCE &&
      Math.abs(height - size.width) <= TOLERANCE;
    if (directMatch || rotatedMatch) {
      return size;
    }
  }
  return null;
}

function findClosest(width: number, height: number): TrimSize {
  let closest = kdpTrimSizes[0];
  let minDistance = Number.POSITIVE_INFINITY;

  for (const size of kdpTrimSizes) {
    const directDistance = Math.hypot(width - size.width, height - size.height);
    const rotatedDistance = Math.hypot(width - size.height, height - size.width);
    const distance = Math.min(directDistance, rotatedDistance);
    if (distance < minDistance) {
      minDistance = distance;
      closest = size;
    }
  }

  return closest;
}

export default function TrimSizeCheckerClient() {
  const [width, setWidth] = useState("6");
  const [height, setHeight] = useState("9");

  const parsedWidth = Number.parseFloat(width) || 0;
  const parsedHeight = Number.parseFloat(height) || 0;
  const hasInput = parsedWidth > 0 && parsedHeight > 0;
  const match = hasInput ? findMatch(parsedWidth, parsedHeight) : null;
  const closest = hasInput && !match ? findClosest(parsedWidth, parsedHeight) : null;

  return (
    <div className="rounded-2xl border border-gray-200 p-6 bg-white">
      <h2 className="text-2xl font-bold font-heading mb-6 text-neutral">
        Check Your Dimensions
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <label className="font-body text-gray-700">
          Width (inches)
          <input
            type="number"
            step="0.01"
            min="0"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </label>
        <label className="font-body text-gray-700">
          Height (inches)
          <input
            type="number"
            step="0.01"
            min="0"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </label>
      </div>
      <div className="rounded-xl bg-gray-50 p-5 mb-6">
        {!hasInput ? (
          <p className="text-gray-600 font-body">
            Enter valid width and height values to check your trim size.
          </p>
        ) : match ? (
          <>
            <p className="text-sm text-green-700 font-body mb-2">Match found</p>
            <p className="text-2xl font-bold text-neutral font-heading">
              {match.label}
            </p>
            <p className="text-sm text-gray-600 font-body mt-2">
              Your dimensions match a common KDP trim size.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-amber-700 font-body mb-2">No exact match</p>
            <p className="text-lg font-semibold text-neutral font-heading">
              Closest: {closest?.label}
            </p>
            <p className="text-sm text-gray-600 font-body mt-2">
              Adjust your layout to a supported KDP trim size before exporting
              your print-ready PDF.
            </p>
          </>
        )}
      </div>
      <h3 className="font-semibold text-neutral font-body mb-3">
        Common KDP trim sizes
      </h3>
      <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 font-body">
        {kdpTrimSizes.map((size) => (
          <li key={size.label} className="rounded-lg bg-gray-50 px-3 py-2">
            {size.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
