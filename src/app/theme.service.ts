import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeState } from '../interfaces/ITheme';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const themePreset = {
  aura: Aura,
  lara: Lara,
  nora: Nora,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeState = new BehaviorSubject<ThemeState>(this.getInitialState());

  public state$ = this.themeState.asObservable();

  getInitialState() {
    const defaultState: ThemeState = { theme: 'aura', colorMode: 'light' };
    const currentState = localStorage.getItem('themeState');

    if (currentState === null) {
      return defaultState;
    } else {
      try {
        const parsedState = JSON.parse(currentState);
        if (
          parsedState &&
          typeof parsedState.theme === 'string' &&
          (parsedState.colorMode === 'light' || parsedState.colorMode === 'dark')
        ) {
          return parsedState;
        } else {
          return defaultState;
        }
      } catch (error) {
        return defaultState;
      }
    }
  }

  setTheme(theme: ThemeState['theme']) {
    usePreset(themePreset[theme]);
    const currentState = this.themeState.value;
    const newState = { ...currentState, theme };
    this.themeState.next(newState);
    localStorage.setItem('themeState', JSON.stringify(newState));
  }

  setColorMode(mode: 'light' | 'dark') {
    const colorMode = this.themeState.value;
    const newColorMode = { ...colorMode, colorMode: mode };
    this.themeState.next(newColorMode);
    localStorage.setItem('themeState', JSON.stringify(newColorMode));
  }

  toggleColorMode() {
    const colorMode = this.themeState.value.colorMode;
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    this.setColorMode(newMode);
  }
}
