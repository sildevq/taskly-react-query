import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type LanguageOption = {
  value: string;
  label: string;
};

const languages: LanguageOption[] = [
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

type LanguageSelectorProps = {
  value: string;
  onChange: (lang: string) => void;
};

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="w-full grid md:grid-cols-2 gap-4"
    >
      {languages.map((lang) => (
        <Label
          key={lang.value}
          htmlFor={lang.value}
          className={`cursor-pointer flex-1 justify-center py-5 rounded-lg border transition ${
            value === lang.value ? "border-primary bg-primary/10" : "border"
          }`}
        >
          <RadioGroupItem id={lang.value} value={lang.value} />
          {lang.label}
        </Label>
      ))}
    </RadioGroup>
  );
};

export default LanguageSelector;
