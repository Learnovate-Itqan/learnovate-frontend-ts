type TSkillsBox = {
  skills: {
    id: string;
    name: string;
  }[];
};

export const SkillsBox = ({ skills }: TSkillsBox) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-xl">Skills:</h3>
      <ul className="flex items-center flex-wrap gap-y-2.5 gap-x-3">
        {skills.map((skill) => (
          <li key={skill.id} className="px-3 py-1.5 border-2 border-royal-blue rounded-lg text-royal-blue select-none">
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
