import { LingoDotDevEngine } from "lingo.dev/sdk";

const languageTranslationBulk = async (
  messages,
  currentLanguage,
  translateTo,
) => {
  //  lingo dot dev initialized
  try {
    const lingoDotDev = new LingoDotDevEngine({
      apiKey: process.env.LINGO_DEV_API_KEY,
    });

    const userMessages = messages.filter((msg) => msg.text != "");

    const translated = await lingoDotDev.localizeText(userMessages, {
      sourceLocale: currentLanguage,
      targetLocale: translateTo,
    });
    return translated;
  } catch (error) {
    console.log("error", error);
  }
};

export default languageTranslationBulk;
