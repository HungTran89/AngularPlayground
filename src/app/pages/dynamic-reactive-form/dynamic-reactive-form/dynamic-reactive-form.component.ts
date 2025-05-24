import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { formControlModel, formControlType, formGroupModel, formSchemaModel, ReactiveForm1, ReactiveForm2 } from '../../../models/reactiveForm1.js';

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
  formSchema = signal<formSchemaModel>({ formID: crypto.randomUUID(), formName: '', formFields: []});
  formControlType = formControlType; // Make the enum available in the template



  fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.buildForm(this?.formSchema());
  }

  // TO-DO: move to a different component. This component will be responsible for creating the form based on the form schema
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
    const last = this.formSchema().formFields[this.formSchema().formFields.length - 1]?.order || 0;
    const newGroup: formGroupModel = {
      groupId: last + 1,
      name: `Group ${last + 1}`,
      controls: [{ controlId: 1, label: 'ctrl: 1', type: formControlType.string, default: '', validators: [], order: 0 }],
      order: last+1
    };

    this.formSchema.update((current) => ({
      ...current,
      formFields: [...current.formFields, newGroup]
    }));
  }

  deleteGroup(groupId: number) {
    this.formSchema.update(current => ({
      ...current,
      formFields: current.formFields.filter(g => this.isFormGroup2(g) ? g.groupId != groupId : true)
    }))
    
  }

  addControlInGroup(groupId: number) {
    const currentGroup = this.formSchema().formFields.find(g => this.isFormGroup2(g) && g.groupId === groupId ) as  formGroupModel;
    const lastCtrl = currentGroup.controls[currentGroup.controls.length -1]?.controlId || 0;
    const control: formControlModel = {
      controlId: lastCtrl + 1,
      label: `ctrl: ${lastCtrl + 1}`,
      type: formControlType.string,
      default: '',
      validators: [],
      order: lastCtrl + 1
    }
    currentGroup.controls.push(control);
    
  }

  deleteControlInGroup(groupId: number, controlId: number) {
    const currentGroup = this.formSchema().formFields.find(g => this.isFormGroup2(g) && g.groupId === groupId ) as formGroupModel; 
    if(currentGroup.controls.length === 1) {
      // A group must have at minimum one controller
      return; 
    }
    // updating using signal
    this.formSchema.update(current => ({
      ...current,
      formFields: current.formFields.map((g, idx) =>
      this.isFormGroup2(g) && g.groupId === groupId
        ? { ...g, controls: g.controls.filter(f => f.controlId != controlId) }
        : g
      )
    }))
  }

  addValidationInGroup(groupIndex: number, controlIndex: number) {
    console.log(
      `Adding validations for Group ${groupIndex + 1}, Control ${controlIndex + 1
      }`
    );
    // In a real application, you would likely open a modal or navigate to the AddValidationComponent
  }

  addIndividualControl() {
    const lastCtrl = this.formSchema().formFields[this.formSchema().formFields.length -1]?.order || 0;
    const ctrl: formControlModel = {
      controlId: lastCtrl + 1,
      type: formControlType.string,
      label: `Control: ${lastCtrl + 1}`,
      default: '',
      validators: [],//['required', 'minLength(1)', 'maxLength(25)'],
      order: lastCtrl+1
    };
    // this.controls.push(obj);
    this.formSchema.update(current => ({
      ...current,
      formFields: [...current.formFields, ctrl]
    }));
    
    console.log('Adding Control: ', this.formSchema().formFields)
  }

  deleteIndividualControl(controlId: number) {
    this.formSchema.update(current => ({
      ...current,
      formFields: current.formFields.filter(f => this.isFormControl(f) ? f.controlId != controlId : true)
    }));
  }

  addIndividualControlValidation(controlIndex: number) {
    console.log(
      `Adding validations for control ${controlIndex + 1
      }`
    );
    // In a real application, you would likely open a modal or navigate to the AddValidationComponent
  }

  generateForm(): void {
    if(!this.formSchema().formName) { alert("A Form Name Is Required"); return; }
    if(this.formSchema().formFields.length === 0) { alert("The Form Is Not Valid: Missing controls and/or groups"); return; }

    
    console.log('generating form: ', this.formSchema())
    this.form = this.buildForm(this.formSchema().formFields);
  }

   // Helper function with a type predicate for formControlModel
  isFormControl(field: formControlModel | formGroupModel): field is formControlModel {
    return (field as formControlModel).controlId !== undefined;
  }

  // Helper function with a type predicate for formGroupModel
  isFormGroup2(field: formControlModel | formGroupModel): field is formGroupModel {
    return (field as formGroupModel).groupId !== undefined;
  }

}
