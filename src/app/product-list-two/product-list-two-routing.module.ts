import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListTwoPage } from './product-list-two.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListTwoPageRoutingModule {}
