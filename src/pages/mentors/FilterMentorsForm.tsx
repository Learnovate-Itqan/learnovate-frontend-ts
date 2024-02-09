import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { FilterTemplate } from "@/components/ui/FilterTemplate";
import { KeyWordsForm } from "@/components/ui/KeywordsForm";
import { MultiSelection } from "@/components/ui/MultiSelection";
import { RatingInput } from "@/components/ui/RatingInput";
import RoundedCheckbox from "@/components/ui/RoundedCheckbox";
import { SearchBar } from "@/components/ui/SearchBar";
import { Checkbox } from "@/components/ui/checkbox";
import RangeSlider from "@/components/ui/rangeSlider/RangeSlider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COUNTRIES } from "@/db/Countries";

const levels = ["Beginner", "Intermediate", "Advanced"];
const PRICE_RANGE = [0, 500];
const EXPERIENCE_YEARS = [1, 12];
const Tracks = [
  "All",
  "Data Science",
  "Dev Ops",
  "Computer Science",
  "IOS",
  "Embedded Systems",
  "Android",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Software Development",
  "Machine Learning",
  "Artificial Intelligence",
  "Cyber Security",
];

type FilterCoursesFormProps = {
  onCloseModal?: () => void;
};

export function FilterMentorsFrom({ onCloseModal }: FilterCoursesFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedLevels, setSelectedLevels] = useState<string[]>(searchParams.get("levels")?.split(",") || []);
  const [selectedTracks] = useState<string[]>(searchParams.get("tracks")?.split(",") || []);
  const [keywords, setKeywords] = useState<string[]>(searchParams.get("keywords")?.split(",") || []);
  const [priceRange, setPriceRange] = useState<number[]>(
    searchParams
      .get("time")
      ?.split(",")
      .map((item) => Number(item)) || PRICE_RANGE
  );
  const [timeRange, setTimeRange] = useState<string[]>(searchParams.get("time")?.split(",") || []);
  const [rating, setRating] = useState(searchParams.get("rating") ? Number(searchParams.get("rating")) : 0);
  const [experienceRange, setExperienceRange] = useState<number[]>(
    searchParams
      .get("experience")
      ?.split(",")
      .map((item) => Number(item)) || EXPERIENCE_YEARS
  );

  const handleLevelChange = (value: string) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleKeywordDeletion = (keyword: string) => {
    setKeywords(keywords.filter((word) => word !== keyword));
  };
  const handleKeywordAddition = (keyword: string) => {
    setKeywords([...keywords, keyword]);
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
    }
  };
  const handleExperienceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setExperienceRange(value);
    }
  };

  const handleReset = () => {
    setSelectedLevels([]);
    setKeywords([]);
    setPriceRange(PRICE_RANGE);
    setTimeRange([]);
    setRating(0);
    setExperienceRange(EXPERIENCE_YEARS);
  };

  const handleApplyFilters = () => {
    if (selectedLevels.length > 0) searchParams.set("levels", selectedLevels.join(","));
    else searchParams.delete("levels");

    if (keywords.length > 0) searchParams.set("keywords", keywords.join(","));
    else searchParams.delete("keywords");

    if (priceRange[0] !== PRICE_RANGE[0] || priceRange[1] !== PRICE_RANGE[1])
      searchParams.set("price", priceRange.join(","));
    else searchParams.delete("price");

    if (timeRange.length > 0) searchParams.set("time", timeRange.join(","));
    else searchParams.delete("time");

    if (rating > 0) searchParams.set("rating", rating.toString());
    else searchParams.delete("rating");

    if (experienceRange[0] !== EXPERIENCE_YEARS[0] || experienceRange[1] !== EXPERIENCE_YEARS[1])
      searchParams.set("experience", experienceRange.join(","));
    else searchParams.delete("experience");

    setSearchParams(searchParams, { replace: true });
    onCloseModal && onCloseModal();
  };
  return (
    <div className="flex flex-col justify-between  min-w-min gap-2  ">
      <main className="lg:p-4 rounded-xl flex flex-col gap-3 lg:shadow-xl lg:border-[1px] grow">
        <FilterTemplate header="Level">
          <div className="flex gap-2 flex-wrap">
            {levels.map((level, index) => (
              <RoundedCheckbox
                key={index}
                label={level}
                checked={selectedLevels.includes(level)}
                onChange={handleLevelChange}
                value={level}
              />
            ))}
          </div>
        </FilterTemplate>

        <FilterTemplate header="Tracks">
          <MultiSelection
            options={Tracks}
            selectedOptions={selectedTracks}
            onChange={() => null}
            onDeletion={() => null}
          />
        </FilterTemplate>

        <FilterTemplate header="Skills">
          <KeyWordsForm keywords={keywords} onAddition={handleKeywordAddition} onDeletion={handleKeywordDeletion} />
        </FilterTemplate>

        <FilterTemplate header="Hourly Rate">
          <div className="max-w-[28rem]">
            <RangeSlider
              min={PRICE_RANGE[0]}
              max={PRICE_RANGE[1]}
              values={priceRange}
              onChange={handlePriceRangeChange}
              leftLabel={`$${priceRange[0].toFixed(1)}`}
              rightLabel={`$${priceRange[1].toFixed(1)}`}
            />
          </div>
        </FilterTemplate>

        <FilterTemplate header="Rating">
          <RatingInput onSetRating={(rate) => setRating(rate)} size={30} rating={rating} />
        </FilterTemplate>

        <FilterTemplate header="Experience in years">
          <div className="max-w-[28rem]">
            <RangeSlider
              min={EXPERIENCE_YEARS[0]}
              max={EXPERIENCE_YEARS[1]}
              values={experienceRange}
              onChange={handleExperienceRangeChange}
              leftLabel={`${experienceRange[0]}`}
              rightLabel={`${experienceRange[1]}`}
            />
          </div>
        </FilterTemplate>
        <FilterTemplate header="Country">
          <div className="max-w-[28rem]">
            <CountryBicker />
          </div>
        </FilterTemplate>
      </main>

      <footer className="w-full grid grid-cols-2  gap-2 mt-3 ">
        <button className="text-royal-blue text-lg rounded-lg px-4 py-2 whitespace-nowrap " onClick={handleReset}>
          clear all
        </button>
        <Button className="px-4 whitespace-nowrap" type="button" text="Show Results" onClick={handleApplyFilters} />
      </footer>
    </div>
  );
}
export function CountryBicker() {
  return (
    <div className="p-2 rounded-xl min-w-56 border-2">
      <SearchBar className="border-2 mb-2 text-gray-400" />
      <ScrollArea className="h-48 px-1">
        {COUNTRIES.map((country, index) => (
          <div key={index} className="flex gap-2 my-1 items-center">
            <Checkbox
              id={country.name}
              className=" w-5 h-5 border-gray-400 border-2 rounded-md data-[state=checked]:bg-royal-blue data-[state=checked]:border-transparent"
            />
            <label htmlFor={country.name} className="flex items-center gap-1">
              <span>
                <img src={country.image} alt={country.name} title={country.name} className="h-5" loading="lazy" />{" "}
              </span>
              {country.name}
            </label>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
