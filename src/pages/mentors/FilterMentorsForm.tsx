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
const HOURLY_RATE_RANGE = [0, 100];
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
  const [selectedTracks, setSelectedTrack] = useState<string[]>(searchParams.get("tracks")?.split(",") || []);
  const [skills, setSkills] = useState<string[]>(searchParams.get("skills")?.split(",") || []);
  const [hourlyRate, setHourlyRate] = useState<number[]>(
    searchParams
      .get("hourlyRate")
      ?.split(",")
      .map((item) => Number(item)) || HOURLY_RATE_RANGE
  );
  const [rating, setRating] = useState(searchParams.get("rating") ? Number(searchParams.get("rating")) : 0);
  const [experienceRange, setExperienceRange] = useState<number[]>(
    searchParams
      .get("experience")
      ?.split(",")
      .map((item) => Number(item)) || EXPERIENCE_YEARS
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(searchParams.get("countries")?.split(",") || []);

  const handleLevelChange = (value: string) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };

  const handleSkillDeletion = (skill: string) => {
    setSkills(skills.filter((word) => word !== skill));
  };
  const handleSkillAddition = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const handleHourlyRateChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setHourlyRate(value);
    }
  };
  const handleExperienceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setExperienceRange(value);
    }
  };
  const handleCountryChange = (value: string) => {
    if (selectedCountries.includes(value)) {
      setSelectedCountries(selectedCountries.filter((country) => country !== value));
    } else {
      setSelectedCountries([...selectedCountries, value]);
    }
  };

  const handleReset = () => {
    setSelectedLevels(() => []);
    setSkills(() => []);
    setHourlyRate(() => HOURLY_RATE_RANGE);
    setSelectedCountries(() => []);
    setRating(() => 0);
    setExperienceRange(() => EXPERIENCE_YEARS);
  };

  const handleApplyFilters = () => {
    if (selectedLevels.length > 0) searchParams.set("levels", selectedLevels.join(","));
    else searchParams.delete("levels");

    if (selectedTracks.length > 0) searchParams.set("tracks", selectedTracks.join(","));
    else searchParams.delete("tracks");

    if (skills.length > 0) searchParams.set("skills", skills.join(","));
    else searchParams.delete("skills");

    if (hourlyRate[0] !== HOURLY_RATE_RANGE[0] || hourlyRate[1] !== HOURLY_RATE_RANGE[1])
      searchParams.set("hourlyRate", hourlyRate.join(","));
    else searchParams.delete("hourlyRate");

    if (selectedCountries.length > 0) searchParams.set("countries", selectedCountries.join(","));
    else searchParams.delete("countries");

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
            onChange={(option) => setSelectedTrack((prev) => [...prev, option])}
            onDeletion={(option) => setSelectedTrack((prev) => prev.filter((track) => track !== option))}
          />
        </FilterTemplate>

        <FilterTemplate header="Skills">
          <KeyWordsForm keywords={skills} onAddition={handleSkillAddition} onDeletion={handleSkillDeletion} />
        </FilterTemplate>

        <FilterTemplate header="Hourly Rate">
          <div className="max-w-[28rem]">
            <RangeSlider
              min={HOURLY_RATE_RANGE[0]}
              max={HOURLY_RATE_RANGE[1]}
              values={hourlyRate}
              onChange={handleHourlyRateChange}
              leftLabel={`$${hourlyRate[0].toFixed(1)}`}
              rightLabel={`$${hourlyRate[1].toFixed(1)}`}
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
            <CountryBicker onChange={handleCountryChange} />
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

export function CountryBicker({ onChange }: { onChange: (value: string) => void }) {
  const [searchValue, setSearchValue] = useState("");

  const usedCountries = COUNTRIES.filter((country) => country.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="p-2 rounded-xl min-w-56 border-2">
      <SearchBar
        className="border-2 mb-2 text-gray-400"
        onChange={(value) => setSearchValue(value)}
        value={searchValue}
      />
      <ScrollArea className="h-48 px-1">
        {usedCountries.map((country, index) => (
          <div
            key={index}
            className="flex gap-2 my-1 items-center transition-colors duration-150 rounded-xl hover:bg-gray-100"
          >
            <Checkbox
              id={country.name}
              onCheckedChange={() => onChange(country.name)}
              title={country.name}
              className=" w-5 h-5 border-gray-400 border-2 bg-white rounded-md data-[state=checked]:bg-royal-blue data-[state=checked]:border-transparent"
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
