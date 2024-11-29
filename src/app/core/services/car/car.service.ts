import { Injectable, model } from '@angular/core';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { planet } from 'ionicons/icons';

export interface ICar {
  marque: string;
  model: string;
  plate: string;
  carFrontImage?: string;
  carBackImage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  public saveCar(car: ICar): Promise<void> {
    return set(ref(getDatabase(), 'cars/' + car.plate), {
      marque: car.marque,
      model: car.model,
      plate: car.plate,
      carFrontImage: car.carFrontImage,
      carBackImage: car.carBackImage,
    });
  }

  public getAllCar(): Promise<ICar[]> {
    return new Promise((resolve, reject) => {
      const carsRef = ref(getDatabase(), 'cars/');
      onValue(carsRef, (snapshot) => {
        const data = snapshot.val();
        const cars: ICar[] = [];
        Object.entries(data).forEach((value) => {
          cars.push(value[1] as ICar);
        });
        resolve(cars);
      });
    });
  }

  public getCarByPlate(plate: string): Promise<ICar | null> {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const carRef = ref(db, 'cars/' + plate);
      get(carRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val() as ICar);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
