
window.addEventListener("DOMContentLoaded", shiftTheme);

function shiftTheme() {
  const DARK_THEME_CLASS = "dark";
  const COLOUR_MODE = "COLOUR_MODE";
  const LIGHT_THEME = "LIGHT";
  const DARK_THEME = "DARK";

  type ThemeMode = (typeof LIGHT_THEME) | (typeof DARK_THEME);

  // const toggle = document.querySelector('.top-nav .shift-mode-icon');
  // const toogle = document.querySelector('button#theme-toggler-button');
  
  const rootEl = document.documentElement;

  // gets current saved colour mode or OS colour mode
  const getInitialColourMode = () : ThemeMode => {
    const currentSavedColourMode = window.localStorage.getItem(COLOUR_MODE) as ThemeMode;
    if( currentSavedColourMode ){
      return currentSavedColourMode;
    }

    if( window.matchMedia("(prefers-color-scheme: dark)").matches ) {
      return DARK_THEME;
    }

    return LIGHT_THEME;
  };

  const initialColourMode = getInitialColourMode();

  const setInitialColourMode = (mode: ThemeMode) => {
    if (mode === LIGHT_THEME) {
      rootEl.classList.remove(DARK_THEME_CLASS);
    } else {
      rootEl.classList.add(DARK_THEME_CLASS);
    }
  }

  setInitialColourMode(initialColourMode);
};