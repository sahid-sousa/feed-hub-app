import {Component, ViewChild} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FeedbacksService} from '../../services/feedbacks.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feedback-create',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    ToastComponent
  ],
  templateUrl: './feedback-create.component.html',
  styleUrl: './feedback-create.component.scss'
})
export class FeedbackCreateComponent {

  @ViewChild('toast') toast!: ToastComponent;

  createForm: FormGroup;

  constructor(
    private feedbacksService: FeedbacksService,
    private router: Router
  ) {
    this.createForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }

  create() {
    this.createForm.markAllAsTouched()
    if (this.createForm.valid) {
      const titleFeedback = this.createForm.get('title')?.value;
      const descriptionFeedback = this.createForm.get('description')?.value;
      const categoryFeedback = this.createForm.get('category')?.value;
      this.feedbacksService.create(titleFeedback, descriptionFeedback, categoryFeedback).subscribe({
        next: () => {
          this.toast.show('Feedback successfully registered!', 'success');
        },
        error: (err) => {
          this.toast.show(err.error.message, 'danger');
        }
      })
    }
  }

  protected readonly Math = Math;

  feebacks() {
    this.router.navigate(['/pages/feedbacks']).then();
  }
}
