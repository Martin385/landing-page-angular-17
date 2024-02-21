import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  public product?: IProduct;
  private _activeRoute = inject(ActivatedRoute);
  private _apiService = inject(ApiService);
  loading: boolean = true;

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      this._apiService
        .getProductById(params['id'])
        .subscribe((data: IProduct) => {
          this.loading = false;
          this.product = data;
        });
    });
  }
}
