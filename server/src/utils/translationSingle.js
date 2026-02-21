import { LingoDotDevEngine } from "lingo.dev/sdk";

const languageTranslationSingle = async (
  message,
  currentLanguage,
  translateTo,
) => {
  //  lingo dot dev initialized
  try {
    const lingoDotDev = new LingoDotDevEngine({
      apiKey: process.env.LINGO_DEV_API_KEY,
    });

    console.log(message, currentLanguage, translateTo);

    const translated = await lingoDotDev.localizeText(message, {
      sourceLocale: currentLanguage,
      targetLocale: translateTo,
    });
    console.log({ translated });
    return translated;
  } catch (error) {
    console.log("error", error);
  }
};

export default languageTranslationSingle;
