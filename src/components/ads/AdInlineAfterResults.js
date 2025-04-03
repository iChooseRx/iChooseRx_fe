import React from "react";
import AdSlot from "./AdSlot";

export function insertAdsInResults(results, frequency = 5, positionPrefix = "results") {
  const resultWithAds = [];

  results.forEach((result, index) => {
    resultWithAds.push(result);
    if ((index + 1) % frequency === 0) {
      resultWithAds.push(
        <li key={`ad-${index}`}>
          <AdSlot
            position={`${positionPrefix}-${index + 1}`}
            className="h-24"
          />
        </li>
      );
    }
  });

  if (results.length < frequency) {
    resultWithAds.push(
      <li key="ad-fallback">
        <AdSlot position={`${positionPrefix}-fallback`} className="h-28" />
      </li>
    );
  }

  return resultWithAds;
}
