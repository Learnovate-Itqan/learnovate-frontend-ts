import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { KeyWordsForm } from "@/components/ui/KeywordsForm";
import RoundedCheckbox from "@/components/ui/RoundedCheckbox";

const levels = ["Beginner", "Intermediate", "Advanced"];

export function FilterCoursesForm() {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const handleKeywordDeletion = (keyword: string) => {
    setKeywords(keywords.filter((word) => word !== keyword));
  };
  const handleKeywordAddition = (keyword: string) => {
    setKeywords([...keywords, keyword]);
  };

  const handleLevelChange = (value: string) => {
    if (selectedLevels.includes(value)) {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    } else {
      setSelectedLevels([...selectedLevels, value]);
    }
  };
  return (
    <div className=" py-2">
      <FilterTemplate header="Level">
        <div className="flex gap-2">
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
      <FilterTemplate header="Keywords">
        <KeyWordsForm keywords={keywords} onAddition={handleKeywordAddition} onDeletion={handleKeywordDeletion} />
      </FilterTemplate>
      <FilterTemplate header="Price">
        <input type="range" min={0} max={100} />
      </FilterTemplate>
      <FilterTemplate header="Time to finish">test</FilterTemplate>
      <FilterTemplate header="Rating">test</FilterTemplate>
      <FilterTemplate header="number of chapters">test</FilterTemplate>
      <footer className="w-full flex justify-end gap-2 mt-3">
        <button className="text-royal-blue text-lg rounded-lg px-4 py-2 ">clear all</button>
        <Button className=" max-w-fit px-4" type="button" text="Show Results" />
      </footer>
    </div>
  );
}
type FilterTemplateProps = {
  header: string;
  children: React.ReactNode;
};

function FilterTemplate({ header, children }: FilterTemplateProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold">{header}</h2>
      <hr className="border-2 border-gray-300 rounded-lg" />
      <div className="mt-2">{children}</div>
    </div>
  );
}
