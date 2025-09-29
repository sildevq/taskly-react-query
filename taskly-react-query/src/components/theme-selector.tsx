import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";

const themes = [
  { value: "light", labelKey: "settings.theme.light" },
  { value: "dark", labelKey: "settings.theme.dark" },
];

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <RadioGroup
      value={theme}
      onValueChange={setTheme}
      className="w-full grid md:grid-cols-2 gap-4"
    >
      {themes.map((item) => (
        <Label
          key={item.value}
          htmlFor={item.value}
          className={`cursor-pointer flex-1 justify-center py-5 rounded-lg border transition ${
            theme === item.value ? "border-primary bg-primary/10" : "border"
          }`}
        >
          <RadioGroupItem id={item.value} value={item.value} />
          {t(item.labelKey)}
        </Label>
      ))}
    </RadioGroup>
  );
};

export default ThemeSelector;
