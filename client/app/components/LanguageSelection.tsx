import languages from "@/utils/languages";
import { Languages, LoaderCircle } from "lucide-react";

interface languageSelectionProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;

  setLastLanguage: React.Dispatch<React.SetStateAction<string>>;
  expandSideBar: boolean;
  isTranslating: boolean;
}

const LanguageSelection = ({
  language,
  setLanguage,
  expandSideBar,
  setLastLanguage,
  isTranslating,
}: languageSelectionProps) => {
  return (
    <div>
      {expandSideBar ? "" : <Languages size={18} className="md:hidden" />}

      <div
        className={`${expandSideBar ? "flex" : "hidden"} md:flex flex-col gap-y-2`}
      >
        <label
          htmlFor="lifespan"
          className="uppercase text-sm text-textSecondary"
        >
          Language Selection
        </label>

        <div className="relative">
          <select
            id="lifespan"
            className="
                    w-full
                    appearance-none
                    border border-terminalGreenSecondary
                    bg-slate-900
                    py-3 px-4 pr-10
                    rounded-md
                    text-terminalGreen
                    outline-none
                    text-xs md:text-sm
                    transition
                    cursor-pointer
                  "
            value={language}
            onChange={(e) => {
              setLastLanguage(language);
              setLanguage(e.target.value);
            }}
          >
            {languages.map((lan, index) => (
              <option key={lan.code} value={lan.code}>
                {lan.code}-{lan.name}
              </option>
            ))}
          </select>

          {/* Custom terminal arrow */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-terminalGreen opacity-80">
            ▾
          </span>
        </div>
      </div>

      {isTranslating && (
        <div className="mt-4 gap-2 flex gap-y-2 justify-start items-center text-terminalGreen">
          <LoaderCircle size={25} className="animate-spin" />
          <p className="text-xs text-textSecondary">Translating...</p>
        </div>
      )}
    </div>
  );
};

export default LanguageSelection;
