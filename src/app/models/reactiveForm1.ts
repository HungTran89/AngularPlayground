// Example js object used to dynamically create reactive form
// built-in validator (required, minLength, maxLength, email, min, max, pattern)
// label will be the name the user input in
// string & number type inputs can have default value
// nested objects will have "children" key

export const ReactiveForm1 = {
  First_Name: "",
  Last_Name: "",
  Address: {
    Address1: "",
    Address2: "",
    Postal_Code: ""
  }
};
// Define formControlType enum if not already defined
export enum formControlType {
  string = 'string',
  number = 'number',
  boolean = 'boolean'
}

// Define formControlModel interface
export interface formControlModel {
  controlId: number;
  type: formControlType;
  label: string;
  default?: any;
  validators: string[];
  order: number;
}

// Define formGroupModel interface
export interface formGroupModel {
  groupId: number;
  name: string;
  controls: formControlModel[];
  order: number;
}

export interface formSchemaModel {
  formID: string;
  formName: string;
  description?: string;
  formFields: Array<formControlModel | formGroupModel>;
}

export const ReactiveForm2: formSchemaModel = {
  formID: crypto.randomUUID(),
  formName: 'Random Form',
  description: 'This is a super duper random form',
  formFields: [
    {
      controlId: 1,
      type: formControlType.string,
      label: "First Name",
      default: "First Name",
      validators: ["required", "minLength(1)", "maxLength(25)"],
      order: 1
    },
    {
      controlId: 2,
      type: formControlType.string,
      label: "Last Name",
      default: "Last Name",
      validators: ["required", "minLength(1)", "maxLength(25)"],
      order: 2
    },
    {
      controlId: 3,
      type: formControlType.string,
      label: "Email",
      default: "",
      validators: ["required", "email"],
      order: 3
    },
    {
      controlId: 4,
      type: formControlType.string,
      label: "Some Field",
      default: "blank",
      validators: [],
      order: 4
    },
    {
      controlId: 7,
      type: formControlType.number,
      label: "Age",
      default: "minLength", // whatever minLength is set to  or zero
      validators: ["required", "min(1)", "max(100)"],
      order: 7
    },
    {
      controlId: 8,
      type: formControlType.boolean,
      label: "Is Active",
      default: undefined,
      validators: [],
      order: 8
    },
    {
      groupId: 5,
      name: 'Address',
      controls: [
        {
          controlId: 1,
          type: formControlType.string,
          label: "Address 1",
          default: '',
          validators: ["required", "max(25)"],
          order: 1
        },
        {
          controlId: 2,
          type: formControlType.string,
          label: "Postal Code",
          default: '',
          validators: ["required", "max(12)"],
          order: 2
        }
      ],
      order: 6
    },
    {
      groupId: 2,
      name: 'Group 2',
      controls: [
        {
          controlId: 2,
          type: formControlType.string,
          label: "Postal Code",
          default: '',
          validators: ["required", "max(25)"],
          order: 1
        }
      ],
      order: 6
    }
  ]
};