import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DummyJsonComponent } from './pages/dummy-json/dummy-json.component';
import { QuizFormOneComponent } from './pages/quiz-form-one/quiz-form-one.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { DynamicReactiveFormComponent } from './pages/dynamic-reactive-form/dynamic-reactive-form/dynamic-reactive-form.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'dummyjson',
        component: DummyJsonComponent,
        pathMatch: 'full'
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/sign-up-form/sign-up-form.module').then(m => m.SignUpFormModule),
        pathMatch: 'full'
    },
    {
        path: 'quizOne',
        component: QuizFormOneComponent,
        pathMatch: 'full'
    },
    {
        path: 'product-list',
        component: ProductListComponent,
        pathMatch: 'full'
    },
    {
        path: 'dynamic-form',
        component: DynamicReactiveFormComponent,
        pathMatch: 'full'
    }

];
