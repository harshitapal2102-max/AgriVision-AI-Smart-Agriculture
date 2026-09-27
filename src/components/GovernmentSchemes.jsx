import React, { useMemo, useState } from "react";
import {
  Search,
  ExternalLink,
  Landmark,
  Sprout,
  ShieldCheck,
  CreditCard,
  Droplets,
  Tractor,
  Leaf,
  Wheat,
  Sun,
  Building2,
  X
} from "lucide-react";

const schemes = [
  {
    name: "PM-KISAN Samman Nidhi",
    category: "Income Support",
    icon: Sprout,
    description:
      "Income support scheme for eligible landholding farmer families.",
    benefit:
      "Eligible farmers can receive financial support under the scheme.",
    eligibility:
      "Eligibility depends on the PM-KISAN guidelines and applicable exclusions.",
    portal: "https://pmkisan.gov.in/",
    source: "Government of India"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    category: "Crop Insurance",
    icon: ShieldCheck,
    description:
      "Crop insurance support against specified crop losses and risks.",
    benefit:
      "Provides insurance protection for eligible notified crops and areas.",
    eligibility:
      "Eligibility depends on notified crops, areas, season and applicable rules.",
    portal: "https://pmfby.gov.in/",
    source: "Government of India"
  },
  {
    name: "Kisan Credit Card",
    category: "Agricultural Credit",
    icon: CreditCard,
    description:
      "Provides timely agricultural credit for cultivation and related farm needs.",
    benefit:
      "Credit can support crop production, post-harvest expenses and eligible allied activities.",
    eligibility:
      "Includes eligible owner cultivators, tenant farmers, sharecroppers and certain farmer groups.",
    portal: "https://www.myscheme.gov.in/schemes/kcc",
    source: "Government of India"
  },
  {
    name: "Pradhan Mantri Krishi Sinchayee Yojana",
    category: "Irrigation",
    icon: Droplets,
    description:
      "Supports irrigation and improved water-use efficiency in agriculture.",
    benefit:
      "Supports irrigation development and efficient use of available water resources.",
    eligibility:
      "Eligibility varies according to the particular component and implementing authority.",
    portal: "https://pmksy.gov.in/",
    source: "Government of India"
  },
  {
    name: "PM-KUSUM",
    category: "Solar Agriculture",
    icon: Sun,
    description:
      "Supports solar energy applications connected with agriculture and irrigation.",
    benefit:
      "Supports eligible solar energy and agricultural infrastructure components.",
    eligibility:
      "Eligibility and assistance depend on the applicable PM-KUSUM component.",
    portal: "https://pmkusum.mnre.gov.in/",
    source: "Government of India"
  },
  {
    name: "Agriculture Infrastructure Fund",
    category: "Farm Infrastructure",
    icon: Building2,
    description:
      "Financing support for eligible agricultural infrastructure projects.",
    benefit:
      "Supports investment in eligible post-harvest and agricultural infrastructure.",
    eligibility:
      "Eligible beneficiaries and projects are subject to scheme guidelines.",
    portal: "https://agriinfra.dac.gov.in/",
    source: "Government of India"
  },
  {
    name: "Sub-Mission on Agricultural Mechanization",
    category: "Farm Equipment",
    icon: Tractor,
    description:
      "Supports access to agricultural machinery and farm mechanization.",
    benefit:
      "Assistance may be available for eligible agricultural machinery and mechanization activities.",
    eligibility:
      "Eligibility and assistance vary by component and applicable government guidelines.",
    portal: "https://agrimachinery.nic.in/",
    source: "Government of India"
  },
  {
    name: "Soil Health Card",
    category: "Soil & Fertility",
    icon: Leaf,
    description:
      "Provides information about soil health and recommended nutrient management.",
    benefit:
      "Helps farmers understand soil nutrient status and fertilizer recommendations.",
    eligibility:
      "Available through the soil-health programme and its implementing system.",
    portal: "https://soilhealth.dac.gov.in/",
    source: "Government of India"
  },
  {
    name: "National Agriculture Market (e-NAM)",
    category: "Agricultural Market",
    icon: Wheat,
    description:
      "Online agricultural market platform connecting participating markets.",
    benefit:
      "Provides an electronic platform for agricultural commodity trading and market information.",
    eligibility:
      "Participation depends on the applicable market and registration requirements.",
    portal: "https://www.enam.gov.in/",
    source: "Government of India"
  },
  {
    name: "Paramparagat Krishi Vikas Yojana",
    category: "Organic Farming",
    icon: Leaf,
    description:
      "Supports eligible organic farming activities and cluster-based approaches.",
    benefit:
      "Supports development of organic farming practices under applicable programme guidelines.",
    eligibility:
      "Eligibility depends on the programme guidelines and implementing arrangements.",
    portal: "https://pgsindia-ncof.gov.in/",
    source: "Government of India"
  },
  {
    name: "National Food Security Mission",
    category: "Crop Development",
    icon: Wheat,
    description:
      "Supports productivity and production of selected agricultural crops.",
    benefit:
      "Provides support through applicable crop-development interventions.",
    eligibility:
      "Eligibility depends on notified crops, locations and programme components.",
    portal: "https://nfsm.gov.in/",
    source: "Government of India"
  },
  {
    name: "Mission for Integrated Development of Horticulture",
    category: "Horticulture",
    icon: Leaf,
    description:
      "Supports development of horticultural crops and related activities.",
    benefit:
      "Support may cover eligible horticulture development components.",
    eligibility:
      "Eligibility depends on the relevant component and implementing authority.",
    portal: "https://midh.gov.in/",
    source: "Government of India"
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    category: "Agriculture Development",
    icon: Landmark,
    description:
      "Supports agriculture and allied-sector development through approved projects.",
    benefit:
      "Supports eligible agriculture and allied-sector development initiatives.",
    eligibility:
      "Eligibility depends on the particular approved component or project.",
    portal: "https://rkvy.nic.in/",
    source: "Government of India"
  }
];

const categories = [
  "All",
  "Income Support",
  "Crop Insurance",
  "Agricultural Credit",
  "Irrigation",
  "Solar Agriculture",
  "Farm Infrastructure",
  "Farm Equipment",
  "Soil & Fertility",
  "Agricultural Market",
  "Organic Farming",
  "Crop Development",
  "Horticulture",
  "Agriculture Development"
];

function getCategoryIcon(category) {
  const icons = {
    "Income Support": Sprout,
    "Crop Insurance": ShieldCheck,
    "Agricultural Credit": CreditCard,
    Irrigation: Droplets,
    "Solar Agriculture": Sun,
    "Farm Infrastructure": Building2,
    "Farm Equipment": Tractor,
    "Soil & Fertility": Leaf,
    "Agricultural Market": Wheat,
    "Organic Farming": Leaf,
    "Crop Development": Wheat,
    Horticulture: Leaf,
    "Agriculture Development": Landmark
  };

  return icons[category] || Sprout;
}

export default function GovernmentSchemes() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const categoryMatch =
        selectedCategory === "All" ||
        scheme.category === selectedCategory;

      const searchMatch =
        !query ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex items-start gap-4">

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #dcfce7, #bbf7d0)"
              }}
            >
              <Landmark className="w-7 h-7 text-green-700" />
            </div>

            <div>
              <h2
                className="text-2xl font-bold text-gray-800"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Government Schemes for Farmers
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Find agriculture schemes available across India.
              </p>

              <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-green-700">
                <ShieldCheck className="w-4 h-4" />
                Government scheme information
              </div>
            </div>

          </div>

          <div className="text-sm font-semibold text-gray-500">
            {filteredSchemes.length} schemes
          </div>

        </div>

        {/* Search */}
        <div className="relative mt-7">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search PM-KISAN, insurance, irrigation, credit..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-green-500 transition-all"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}

        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-2">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Scheme cards */}
      {filteredSchemes.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredSchemes.map((scheme) => {
            const Icon = scheme.icon || getCategoryIcon(scheme.category);

            return (
              <div
                key={scheme.name}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >

                <div className="p-6 flex-1">

                  <div className="flex items-start justify-between gap-3 mb-5">

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                      }}
                    >
                      <Icon className="w-6 h-6 text-green-700" />
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                      {scheme.category}
                    </span>

                  </div>

                  <h3
                    className="text-lg font-bold text-gray-800 leading-snug"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {scheme.name}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-3">
                    {scheme.description}
                  </p>

                  <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">

                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Benefit
                    </p>

                    <p className="text-sm text-gray-700 leading-5">
                      {scheme.benefit}
                    </p>

                  </div>

                </div>

                <div className="px-6 pb-6">

                  <button
                    type="button"
                    onClick={() => setSelectedScheme(scheme)}
                    className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="bg-white rounded-3xl border border-gray-100 p-14 text-center">

          <Search className="w-10 h-10 mx-auto text-gray-300 mb-4" />

          <h3 className="font-bold text-gray-700 text-lg">
            No schemes found
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Try another search or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-5 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold"
          >
            Show All Schemes
          </button>

        </div>

      )}

      {/* Information */}
      <div className="bg-green-50 border border-green-100 rounded-3xl p-6">

        <div className="flex gap-3">

          <ShieldCheck className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />

          <div>

            <h3 className="font-bold text-green-900 text-sm">
              Important information
            </h3>

            <p className="text-xs text-green-800/80 leading-5 mt-1">
              Scheme eligibility, benefits, application deadlines and
              implementation can vary by scheme, state, crop and farmer
              category. Always verify the latest information on the
              official government portal before applying.
            </p>

          </div>

        </div>

      </div>

      {/* Details modal */}
      {selectedScheme && (

        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedScheme(null)}
        >

          <div
            className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="p-7">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                    {selectedScheme.category}
                  </span>

                  <h2
                    className="text-2xl font-bold text-gray-800 mt-4"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {selectedScheme.name}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() => setSelectedScheme(null)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

              </div>

              <div className="space-y-5 mt-7">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    About
                  </p>
                  <p className="text-sm text-gray-600 leading-6 mt-1">
                    {selectedScheme.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Benefit
                  </p>
                  <p className="text-sm text-gray-600 leading-6 mt-1">
                    {selectedScheme.benefit}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Eligibility
                  </p>
                  <p className="text-sm text-gray-600 leading-6 mt-1">
                    {selectedScheme.eligibility}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Source
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {selectedScheme.source}
                  </p>
                </div>

              </div>

              <div className="flex gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => setSelectedScheme(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm"
                >
                  Close
                </button>

                <a
                  href={selectedScheme.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                  Official Portal
                  <ExternalLink className="w-4 h-4" />
                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}