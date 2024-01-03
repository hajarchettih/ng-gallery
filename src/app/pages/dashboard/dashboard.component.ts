import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  photoForm: FormGroup;
  selectedFile: any;
  constructor(private fb: FormBuilder) {
    this.photoForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(7)]],
      description: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(300)]],
      imageUrl: [''],
      likes: [0]
    });
  }
  hasError(fieldName: string, errorName: string) {
    const fieldErrors = this.photoForm.get(fieldName)?.errors;
    return fieldErrors ? fieldErrors[errorName] : false;
  }
  showErrorMessage(fieldName: string) {
    const fieldControl = this.photoForm.get(fieldName);
    if (fieldControl?.invalid && fieldControl?.touched) {
      if (this.hasError(fieldName, 'required')) {
        return 'Ce champ est requis.';
      } else if (this.hasError(fieldName, 'minlength')) {
        return 'Doit contenir au moins 7 caractères.';
      } else if (this.hasError(fieldName, 'maxlength')) {
        return 'Doit contenir moins de 300 caractères.';
      }
    }
    return '';
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    console.log(this.photoForm.value);
  }
}