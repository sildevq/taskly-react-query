import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const priorities = [
  { value: "none", labelKey: "tasks.form.priorities.none" },
  { value: "low", labelKey: "tasks.form.priorities.low" },
  { value: "medium", labelKey: "tasks.form.priorities.medium" },
  { value: "high", labelKey: "tasks.form.priorities.high" },
];

const PrioritySelector = () => {
  const [priority, setPriority] = useState("none");
  const { t } = useTranslation();

  return (
    <RadioGroup
      value={priority}
      onValueChange={setPriority}
      className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-2"
    >
      {priorities.map((item) => (
        <Label
          key={item.value}
          htmlFor={item.value}
          className={`cursor-pointer flex-1 justify-center py-5 rounded-lg border transition ${
            priority === item.value ? "border-primary bg-primary/10" : "border"
          }`}
        >
          <RadioGroupItem
            id={item.value}
            value={item.value}
            className="hidden"
          />
          {t(item.labelKey)}
        </Label>
      ))}
    </RadioGroup>
  );
};

export default PrioritySelector;
