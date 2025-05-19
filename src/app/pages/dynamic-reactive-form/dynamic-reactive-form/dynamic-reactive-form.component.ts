import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReactiveForm1, ReactiveForm2 } from '../../../models/reactiveForm1.js';
import { stringify } from 'node:querystring';

interface formControlModel {
  controlId: number;
  label: string;
  type: string;
  default?: string;
  validators: string[];
  order: number;
}
interface formGroupModel {
  groupId: number;
  name: string;
  controls: formControlModel[];
  order: number;
}

interface formSchemaModel {
  formID: string;
  formName: string;
  description?: string;
  controls: formControlModel[];
  groups: formGroupModel[];
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
  formSchema = signal<formSchemaModel>({
    formID: crypto.randomUUID(),
    formName: '',
    description: undefined,
    controls: [],
    groups: []
  });



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
    const last = this.formSchema().groups[this.formSchema().groups.length - 1]?.groupId || 0;
    const newGroup: formGroupModel = {
      groupId: last + 1,
      name: `Group ${last + 1}`,
      controls: [{ controlId: 1, label: 'ctrl: 1', type: '', default: '', validators: [], order: 0 }],
      order: 0
    };

    this.formSchema.update((current) => ({
      ...current,
      groups: [...current.groups, newGroup]
    }));

  }

  deleteGroup(groupId: number) {
    console.log('Group ID: ', groupId)
    this.formSchema.update(current => ({
      ...current,
      groups: current.groups.filter(g => g.groupId != groupId)
    }))
    
  }

  addControlInGroup(groupIndex: number) {
    const currentGroup = this.formSchema().groups[groupIndex]
    const lastCtrl = currentGroup.controls[currentGroup.controls.length -1]?.controlId || 0;
    const control: formControlModel = {
      controlId: lastCtrl + 1,
      label: `ctrl: ${lastCtrl + 1}`,
      type: '',
      default: '',
      validators: [],
      order: 0
    }
    currentGroup.controls.push(control);
    
  }

  deleteControlInGroup(groupIndex: number, controlId: number) {
    const currentGroup = this.formSchema().groups[groupIndex];
    currentGroup.controls = currentGroup.controls.filter(f => f.controlId != controlId);

    // cannot have a group with no control
    if(currentGroup.controls.length === 0) {
      this.addControlInGroup(groupIndex)
    }

    // updating using signal
    // this.formSchema.update(current => ({
    //   ...current,
    //   groups: current.groups.map((g, idx) =>
    //   idx === groupIndex
    //     ? { ...g, controls: g.controls.filter(f => f.controlId != controlId) }
    //     : g
    //   )
    // }))
  }

  addValidationInGroup(groupIndex: number, controlIndex: number) {
    console.log(
      `Adding validations for Group ${groupIndex + 1}, Control ${controlIndex + 1
      }`
    );
    // In a real application, you would likely open a modal or navigate to the AddValidationComponent
  }

  addIndividualControl() {
    const lastCtrl = this.formSchema().controls[this.formSchema().controls.length -1]?.controlId || 0;
    const ctrl: formControlModel = {
      controlId: lastCtrl + 1,
      type: '',
      label: `Control: ${lastCtrl + 1}`,
      default: '',
      validators: [],//['required', 'minLength(1)', 'maxLength(25)'],
      order: 0
    };
    // this.controls.push(obj);
    this.formSchema.update(current => ({
      ...current,
      controls: [...current.controls, ctrl]
    }));
  }
  deleteIndividualControl(controlId: number) {
    console.log(
      `Deleting control ${controlId}`
    );

    // using signal
    this.formSchema.update(current => ({
      ...current,
      controls: current.controls.filter(f => f.controlId != controlId)
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
    if(this.formSchema().controls.length === 0 && this.formSchema().groups.length === 0) { alert("The Form Is Not Valid: Missing controls and/or groups"); return; }

    
    console.log('generating form: ', this.formSchema())
    this.form = this.buildForm(this?.formSchema());
  }
}
