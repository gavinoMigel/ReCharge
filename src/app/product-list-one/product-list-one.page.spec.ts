import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListOnePage } from './product-list-one.page';

describe('ProductListOnePage', () => {
  let component: ProductListOnePage;
  let fixture: ComponentFixture<ProductListOnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
