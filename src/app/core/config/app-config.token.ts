import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app-config.interface';

export const APP_CONFIG = new InjectionToken<IAppConfig>('APP_CONFIG');
