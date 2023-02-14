import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/products';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  allProducts: Product[] = [];
  isFetching: boolean = false;
  editMode : boolean = false;
  currentProductId : string;
 
  @ViewChild('productsForm') form : NgForm;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.onfetchProducts();
  }

  onFetchProducts() {
    this.onfetchProducts();
  }

  onProductCreate(products: { pName: string; desc: string; price: number; date: string }) {
    console.log(this.form.value)
    if(!this.editMode){
    this.productService.createProduct(products);
    debugger
    this.onfetchProducts();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
  }
    else {
    this.productService.updateProduct(this.currentProductId, products)
    this.onfetchProducts();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
  }
  }

  private onfetchProducts() {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    });
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  onDeleteAllProduct() {
    this.productService.deleteAllProduct();
  }

  onEditProduct(id: string){
    this.currentProductId = id ;
    //Get the product based on id
    let currentProduct = this.allProducts.find((p)=> {return p.id === id});
    console.log(currentProduct)
    console.log(this.form)

    //Populate the form with the product details
    this.form.setValue({
      pName : currentProduct.pName,
      desc : currentProduct.desc,
      price : currentProduct.price ,
      date : currentProduct.date 

    });

    //Change the button value to update product
    this.editMode = true ;
  }
}
