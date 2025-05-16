import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReactiveForm1, ReactiveForm2 } from '../../../models/reactiveForm1.js';

interface formSchemaModel {
  label: string;
  type: string;
  default?: string;
  validators?: string[];
}
interface formSchemaGroup {
  name: string;
  formSchemaMode: formSchemaModel;
}

@Component({
  selector: 'app-dynamic-reactive-form',
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './dynamic-reactive-form.component.html',
  styleUrl: './dynamic-reactive-form.component.css',
})
export class DynamicReactiveFormComponent implements OnInit {
  /*
   The definite assignment assertion in TypeScript uses the ! symbol after a property or variable declaration to tell the compiler that the variable will definitely be assigned a value before it is used. This is useful in situations where the TypeScript compiler cannot infer that a variable has been assigned a value, but the developer knows that it will be.
  */
  form!: FormGroup;
  formTitle: string = 'Default Form Name';
  subHeader: string = 'Add Your Customized Sub-Header Here';
  controls: formSchemaModel[] = [];
  groups: { name: string; controls: any[] }[] = [];
  formSchema = signal<formSchemaModel[]>([]);

  fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.buildForm(ReactiveForm1);
  }

  private buildForm(formSchema: any): FormGroup {
    const group: any = {};

    for (const key of Object.keys(formSchema)) {
      const value = formSchema[key];

      group[key] =
        value !== null && typeof value === 'object' && !Array.isArray(value)
          ? this.buildForm(value)
          : [value];
    }

    return this.fb.group(group);
  }

  getControls(group: any) {
    return Object.keys(group.controls);
  }

  isFormGroup(control: any): boolean {
    return control instanceof FormGroup;
  }

  addGroup() {
    this.groups.push({
      name: `Group ${this.groups.length + 1}`,
      controls: [{ nameLabel: '', controlType: '', defaultPlaceholder: '' }],
    });
  }

  addIndividuaControl() {
    const obj: formSchemaModel = {
      type: 'string',
      label: 'First Name',
      default: 'First Name',
      validators: ['required', 'minLength(1)', 'maxLength(25)'],
    };
    // this.controls.push(obj);
    this.formSchema.update((current) => [...current, obj]); // using signal
  }

  addControlInGroup(groupIndex: number) {
    this.groups[groupIndex].controls.push({
      nameLabel: '',
      controlType: '',
      defaultPlaceholder: '',
    });
  }

  deleteGroup(groupIndex: number) {
    this.groups.splice(groupIndex, 1);
  }

  deleteControlInGroup(groupIndex: number, controlIndex: number) {
    this.groups[groupIndex].controls.splice(controlIndex, 1);
  }

  addValidationInGroup(groupIndex: number, controlIndex: number) {
    console.log(
      `Adding validations for Group ${groupIndex + 1}, Control ${
        controlIndex + 1
      }`
    );
    // In a real application, you would likely open a modal or navigate to the AddValidationComponent
  }

  deleteControl(controlIndex: number) {
    console.log(
      `Deleting control ${
        controlIndex
      }`
    );
    // this.controls.splice(controlIndex, 1);
    this.formSchema.update((current) => {
      // debugger;
      const updated = [...current];
      updated.splice(controlIndex, 1);
      return updated;
    });
  }
  addValidation(controlIndex: number) {
    console.log(
      `Adding validations for control ${
        controlIndex + 1
      }`
    );
    // In a real application, you would likely open a modal or navigate to the AddValidationComponent
  }
}
