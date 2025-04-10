'use client';

import { useState, useMemo } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Types
interface Country {
  name: string;
  code: string;
}

type TariffCategory = 'low' | 'medium' | 'high';
type TariffRanges = Record<TariffCategory, string[]>;

// Constants
const TARIFF_RANGES = {
  LOW_MAX: 50,
  MEDIUM_MAX: 100,
};

const TARIFF_MIN = 10;
const TARIFF_MAX = 200;

// Data
const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo (Congo-Brazzaville)", code: "CG" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Korea", code: "KP" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine State", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" }
];

const tariffGifs: TariffRanges = {
  low: [
    "https://media3.giphy.com/media/l2JhIUyUs8KDCCf3W/giphy.gif",
    "https://media0.giphy.com/media/wJNGA01o1Zxp6/giphy.gif",
    "https://media.giphy.com/media/bXE0iECrH9xJe/giphy.gif",
  ],
  medium: [
    "https://media2.giphy.com/media/6L015gMEW3pFC/giphy.gif",
    "https://media.giphy.com/media/HYQaj17e7yaoE/giphy.gif",
    "https://media.giphy.com/media/21PUvPL6jCKHtsMr5N/giphy.gif",
  ],
  high: [
    "https://media.giphy.com/media/xTg8B9aULho7shlPmU/giphy.gif",
    "https://media.giphy.com/media/26tn8u4JaBPQmq8mY/giphy.gif",
  ]
};

// Utility functions
const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getRandomFromArray = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getTariffCategory = (tariffValue: number): TariffCategory => {
  if (tariffValue <= TARIFF_RANGES.LOW_MAX) return 'low';
  if (tariffValue <= TARIFF_RANGES.MEDIUM_MAX) return 'medium';
  return 'high';
};

const generateRandomTariff = (): number => {
  return Math.floor(Math.random() * (TARIFF_MAX - TARIFF_MIN + 1)) + TARIFF_MIN;
};

export default function TariffCalculator() {
  // State
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [tariff, setTariff] = useState<number | null>(null);
  const [gif, setGif] = useState<string | null>(null);

  // Memoized sorted countries list
  const sortedCountries = useMemo(() =>
          [...countries].sort((a, b) => a.name.localeCompare(b.name)),
      []
  );

  // Handlers
  const handleCountryChange = (value: string): void => {
    setSelectedCountry(value);
    // Clear tariff and gif when country changes
    setTariff(null);
    setGif(null);
  };

  const handleGenerateTariff = (): void => {
    if (!selectedCountry) return;

    const newTariff = generateRandomTariff();
    setTariff(newTariff);

    const category = getTariffCategory(newTariff);
    setGif(getRandomFromArray(tariffGifs[category]));
  };

  // Component rendering
  const renderHeader = () => (
      <div className="absolute top-0 left-0 right-0 h-32 bg-[#1e2a47] flex justify-center items-center px-8">
        <div className="flex items-center">
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/Seal_of_the_President_of_the_United_States.svg"
              alt="Presidential Seal"
              className="h-25 w-auto mr-4"
          />
          <h1 className="text-white text-6xl font-bold drop-shadow-md">
            American Tariff Calculator
          </h1>
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/Seal_of_the_President_of_the_United_States.svg"
              alt="Presidential Seal"
              className="h-25 w-auto ml-4"
          />
        </div>
      </div>
  );

  const renderTariffResult = () => {
    if (tariff === null || gif === null) return null;

    return (
        <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Estimated Tariff for {selectedCountry}:
          </h2>
          <Badge className="text-2xl px-8 py-4 bg-red-600 text-white rounded-full">
            {tariff}%
          </Badge>
          <div className="mt-6">
            <img src={gif} alt="Tariff reaction" className="w-96 mx-auto rounded-lg shadow-lg" />
          </div>
        </motion.div>
    );
  };

  return (
      <div className="min-h-screen bg-[#1e2a47] text-white p-4 flex flex-col items-center justify-center relative">
        {renderHeader()}

        <div className="flex-grow flex items-center justify-center mt-40">
          <Card className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-2xl shadow-lg bg-white">
            <CardContent className="p-12">
              <div className="mb-8 text-center">
                <label className="block mb-6 font-medium text-2xl">Select Country of Origin</label>
                <Select onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-full max-w-md mx-auto text-xl p-4 rounded-md">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedCountries.map(({ name, code }) => (
                        <SelectItem key={code} value={name}>
                      <span className="flex items-center gap-2 text-xl">
                        <span>{getFlagEmoji(code)}</span>
                        {name}
                      </span>
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                  className="w-full py-6 text-3xl font-semibold bg-red-600 hover:bg-red-700 transition-all mt-8"
                  onClick={handleGenerateTariff}
                  disabled={!selectedCountry}
              >
                Generate Tariff
              </Button>

              {renderTariffResult()}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}