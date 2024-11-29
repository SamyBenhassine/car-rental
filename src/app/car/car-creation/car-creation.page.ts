import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { caretBack } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CarService, ICar } from 'src/app/core/services/car/car.service';
import { REQUIRED_FIELD_MESSAGE } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-car-creation',
  templateUrl: './car-creation.page.html',
  styleUrls: ['./car-creation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class NewCarPage implements OnInit {
  public carForm = new FormGroup({
    marque: new FormControl('', [Validators.required, Validators.minLength(2)]),
    model: new FormControl('', [Validators.required, Validators.minLength(2)]),
    plate: new FormControl('', [Validators.required, Validators.minLength(2)]),
    carFrontImage: new FormControl(''),
    carBackImage: new FormControl(''),
  });
  public requiredFieldMessage = REQUIRED_FIELD_MESSAGE;
  public picutreErrorMessage: string | null = null;

  constructor(private carService: CarService, private router: Router) {
    addIcons({ caretBack });
  }

  ngOnInit() {}

  async takePhoto(field: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    const base64Data = image.dataUrl;
    this.carForm.patchValue({ [field]: base64Data });
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.picutreErrorMessage =
          'La taille du fichier est trop grande. La taille maximale autorisée est de 5 Mo.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.carForm.patchValue({ [field]: reader.result as string });
        this.picutreErrorMessage = null;
      };
      reader.readAsDataURL(file);
    }
  }

  public onSave(): void {
    if (this.carForm.valid) {
      this.carService
        .saveCar(this.carForm.value as unknown as ICar)
        .then(() => {
          this.router.navigate(['/car']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  public goToCarPage(): void {
    this.router.navigate(['/car']);
  }
}
