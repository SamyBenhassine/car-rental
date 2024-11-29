import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDpcHnVY2kPT6poQUGT294s4X90G1OI4Ug",
  authDomain: "car-rental-efe12.firebaseapp.com",
  projectId: "car-rental-efe12",
  storageBucket: "car-rental-efe12.firebasestorage.app",
  messagingSenderId: "527355923953",
  databaseURL: "https://car-rental-efe12-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:527355923953:web:9039d65963422689614850"
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
