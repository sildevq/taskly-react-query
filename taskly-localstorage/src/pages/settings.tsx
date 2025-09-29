import LanguageSelector from "@/components/language-selector";
import ThemeSelector from "@/components/theme-selector";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h2 className="text-4xl font-bold">{t("settings.title")}</h2>
      <h3 className="mt-10 text-2xl font-bold">{t("settings.appearance")}</h3>
      <Card className="mt-6">
        <CardContent>
          <span>{t("settings.themeDescription")}</span>
          <div className="mt-5">
            <ThemeSelector />
          </div>
        </CardContent>
      </Card>
      <h3 className="mt-10 text-2xl font-bold">{t("settings.language")}</h3>
      <Card className="mt-6">
        <CardContent>
          <span>{t("settings.languageDescription")}</span>
          <div className="mt-5">
            <LanguageSelector
              value={i18n.language}
              onChange={(lang) => i18n.changeLanguage(lang)}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Settings;
