import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListTwoPageRoutingModule } from './product-list-two-routing.module';

import { ProductListTwoPage } from './product-list-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListTwoPageRoutingModule
  ],
  declarations: [ProductListTwoPage]
})
export class ProductListTwoPageModule {}
