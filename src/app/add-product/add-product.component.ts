import { CommonModule } from '@angular/common';
import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../services/product.service';
import { IAddProduct, IProduct } from '../interfaces/product';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AddProductComponent implements OnInit, DoCheck {
  productForm: FormGroup;
  prevProductForm;
  editForm = false;
  updateDisabled = true;
  imageError: string | null = null;
  uploadedImage: File | null = null;
  ngOnInit(): void {
    console.log(this.data);
  }

  ngDoCheck(): void {
    console.log(this.prevProductForm, this.productForm.value);
    console.log(
      JSON.stringify(this.prevProductForm) ===
        JSON.stringify(this.productForm.value)
    );
  }
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { product?: IProduct }
  ) {
    this.editForm = !!data.product;
    this.productForm = this.fb.group({
      productName: [
        data.product?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        data.product?.description || '',
        [Validators.required, Validators.minLength(5)],
      ],
      price: [
        data.product?.price || '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],
    });
    this.prevProductForm = {
      ...this.productForm.value,
      price: String(this.productForm.value.price),
    };
    // Track changes and update button state
    this.productForm.valueChanges.subscribe((values) => {
      this.updateDisabled =
        JSON.stringify(values) === JSON.stringify(this.prevProductForm) &&
        this.editForm &&
        !this.uploadedImage;
    });
  }

  // Trigger hidden file input's click
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.imageError = 'File size should not exceed 2MB';
        this.uploadedImage = null;
        this.productForm.patchValue({ image: null });
      } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.imageError = 'Only JPEG or PNG images are allowed';
        this.uploadedImage = null;
        this.productForm.patchValue({ image: null });
      } else {
        this.imageError = null;
        this.uploadedImage = file;
        this.productForm.patchValue({ image: file });
      }
    }
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      try {
        //image upload
        let imageResponse: { location: string } | undefined;

        // Check if there's an uploaded image and a product
        if (this.uploadedImage) {
          imageResponse = await firstValueFrom(
            this.productService.uploadImage(this.uploadedImage)
          );
          console.log('Image uploaded successfully:', imageResponse);
        }

        // Determine the image URL to use
        const uploadImageUrl =
          imageResponse?.location || this.data.product?.images?.[0] || '';

        // Prepare the product data
        const product: IAddProduct = {
          title: productData.productName,
          description: productData.description,
          price: Number(productData.price),
          categoryId: 1,
          images: [uploadImageUrl],
        };

        // Add the product
        const addProductResponse = await firstValueFrom(
          this.data.product
            ? this.productService.updateProduct(this.data.product.id, product)
            : this.productService.addProduct(product)
        );
        console.log('Product added successfully:', addProductResponse);

        // Close the dialog and reset the form
        this.dialogRef.close(true);
        this.productForm.reset();
        this.imageError = null;
        this.uploadedImage = null;
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  }
  onReset() {
    this.productForm.reset();
    this.imageError = null;
    this.uploadedImage = null;
    this.dialogRef.close(false);
  }
}
