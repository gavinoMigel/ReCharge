import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListTwoPage } from './product-list-two.page';

describe('ProductListTwoPage', () => {
  let component: ProductListTwoPage;
  let fixture: ComponentFixture<ProductListTwoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
