import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService, ICar } from 'src/app/core/services/car/car.service';
import { caretBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CarDetailPage implements OnInit {
  public car: ICar | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {
    addIcons({ caretBack });
  }

  ngOnInit() {
    const plate = this.route.snapshot.paramMap.get('plate');
    if (plate) {
      this.carService.getCarByPlate(plate).then((car: ICar | null) => {
        this.car = car;
      });
    }
  }

  public goToCarPage(): void {
    this.router.navigate(['/car']);
  }
}
