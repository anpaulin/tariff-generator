'use client';

import { useState, useMemo } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Countries } from "@/components/Countries"

type TariffCategory = 'low' | 'medium' | 'high';
type TariffRanges = Record<TariffCategory, string[]>;

// Constants
const TARIFF_RANGES = {
  LOW_MAX: 50,
  MEDIUM_MAX: 100,
};

const TARIFF_MIN = 10;
const TARIFF_MAX = 200;

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
          [...Countries].sort((a, b) => a.name.localeCompare(b.name)),
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
      <div className="absolute top-0 left-0 right-0 bg-[#1e2a47] flex justify-center items-center px-4 py-4 sm:py-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center">
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/Seal_of_the_President_of_the_United_States.svg"
              alt="Presidential Seal"
              className="h-16 w-auto mb-2 md:mb-0 md:mr-4 md:h-20 lg:h-24"
          />
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-md text-center">
            American Tariff Calculator
          </h1>
          <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/Seal_of_the_President_of_the_United_States.svg"
              alt="Presidential Seal"
              className="h-16 w-auto mt-2 md:mt-0 md:ml-4 md:h-20 lg:h-24 hidden md:block"
          />
        </div>
      </div>
  );

  const renderTariffResult = () => {
    if (tariff === null || gif === null) return null;

    return (
        <motion.div
            className="mt-6 sm:mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
            Estimated Tariff for {selectedCountry}:
          </h2>
          <Badge className="text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-red-600 text-white rounded-full">
            {tariff}%
          </Badge>
          <div className="mt-4 sm:mt-6">
            <img
                src={gif}
                alt="Tariff reaction"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-96 mx-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
    );
  };

  return (
      <div className="min-h-screen bg-[#1e2a47] text-white p-4 flex flex-col items-center justify-center relative">
        {renderHeader()}

        <div className="flex-grow flex items-center justify-center mt-32 sm:mt-36 md:mt-40">
          <Card className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-xl sm:rounded-2xl shadow-lg bg-white">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="mb-6 sm:mb-8 text-center">
                <label className="block mb-4 sm:mb-6 font-medium text-lg sm:text-xl md:text-2xl">
                  Select Country of Origin
                </label>
                <Select onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-full max-w-full sm:max-w-md mx-auto text-base sm:text-lg md:text-xl p-2 sm:p-3 md:p-4 rounded-md">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {sortedCountries.map(({ name, code }) => (
                        <SelectItem key={code} value={name}>
                      <span className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                        <span>{getFlagEmoji(code)}</span>
                        {name}
                      </span>
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                  className="w-full py-3 sm:py-4 md:py-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-red-600 hover:bg-red-700 transition-all mt-4 sm:mt-6 md:mt-8"
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