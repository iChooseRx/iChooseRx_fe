'use client';
import PublicPageLayout from "@/components/layouts/PublicPageLayout";

export default function WhyIChooseRxPage() {
  return (
    <PublicPageLayout title="Why I Built iChooseRx">
      <p className="mb-4">
        iChooseRx was born out of my own personal experience navigating medications. I started noticing how many FDA-approved drugs contain ingredients I wanted to avoid—artificial dyes and colors, sweeteners, flavors, animal byproducts, titanium dioxide, added sugars, sugar alcohols, endocrine disruptors, gluten, preservatives, and other potentially harmful additives.

        At first, I was not even aware of all these categories. But as I dug deeper, I realized I was not alone—others were concerned about these ingredients too. And yet, there was no easy way to search or filter drugs based on these concerns.

        So I built one. Because these inactive ingredients—also called excipients—<strong>may</strong> actually interfere with the reason you are taking the medication in the first place.
      </p>
      <p className="mb-4">
        This platform empowers you to align your prescriptions with your values, allergies,
        and health goals—whether that is avoiding dyes, allergens, additives, etc or finding local pharmacies who carry a specific NDC.
      </p>
      <p className="mb-4 italic text-sm text-gray-500 dark:text-gray-400">
        iChooseRx is not about labeling drugs “clean” or “dirty.” It is about **conscious choice**— giving you the data and control to make informed decisions in collaboration with your doctor or pharmacist.
      </p>
    </PublicPageLayout>
  );
}