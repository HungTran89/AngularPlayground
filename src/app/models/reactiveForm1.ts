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


export  const ReactiveForm2 = {
  First_Name: {
    type: "string",
    label: "First Name",
    default: "First Name",
    validators: ["required", "minLength(1)", "maxLength(25)"],
  },
  Last_Name: {
    type: "string",
    label: "Last Name",
    placeholder: "First Name",
    validators: ["required", "minLength(25)", "maxLength(25)"],
  },
  Age: {
    type: "number",
    label: "Age",
    default: "minLength", // whatever minLength is set to  or zero
    validators: ["required", "min(1)", "max(100)"],
  },
  Is_Active: {
    type: "boolean",
    label: "Is Active",
    default: "F|T|NULL",  // the user can set the default value to True, False, or NULL 
    validators: ["required", "minLength(1)", "maxLength(25)"],
  },
  Address: {
    label: "Address",
    children: {
      Address1: { type: "text", label: "Address Line 1", value: "" },
      Postal_Code: { type: "text", label: "Postal Code", value: "" },
    },
  },
};
