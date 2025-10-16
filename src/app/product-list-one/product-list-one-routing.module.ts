import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListOnePage } from './product-list-one.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListOnePageRoutingModule {}
