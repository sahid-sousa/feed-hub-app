import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TemplateComponent} from './template/template.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {FeedbacksComponent} from './feedbacks/feedbacks.component';
import {RegisterComponent} from './register/register.component';
import {FeedbackCreateComponent} from './feedbacks/feedback-create/feedback-create.component';
import {FeedbackShowComponent} from './feedbacks/feedback-show/feedback-show.component';
import {CommentsComponent} from './comments/comments.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'pages',
    component: TemplateComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'feedbacks', component: FeedbacksComponent },
      { path: 'feedbacks/create', component: FeedbackCreateComponent },
      { path: 'feedbacks/show/:id', component: FeedbackShowComponent },
      { path: 'comments', component: CommentsComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
