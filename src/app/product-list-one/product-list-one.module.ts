import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListOnePageRoutingModule } from './product-list-one-routing.module';

import { ProductListOnePage } from './product-list-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListOnePageRoutingModule
  ],
  declarations: [ProductListOnePage]
})
export class ProductListOnePageModule {}
