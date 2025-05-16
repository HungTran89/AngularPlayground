import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SignUpFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: SignUpFormComponent }
        ])
    ]
})
export class SignUpFormModule {}
