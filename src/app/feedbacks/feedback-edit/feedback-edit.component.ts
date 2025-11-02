import {Component, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastComponent} from "../../shared/toast/toast.component";
import {FeedbacksService} from '../../services/feedbacks.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feedback-edit',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    ToastComponent
  ],
  templateUrl: './feedback-edit.component.html',
  styleUrl: './feedback-edit.component.scss'
})
export class FeedbackEditComponent implements OnInit {

  @ViewChild('toast') toast!: ToastComponent;

  editForm: FormGroup;

  constructor(
    private feedbacksService: FeedbacksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getFeedback(id);
    });
  }

  getFeedback(id: number) {
    this.feedbacksService.getFeedback(id).subscribe({
      next: (result) => {
        this.editForm.setValue({
          id: result.id,
          title: result.title,
          description: result.description,
          category: result.category
        })
      },
      error: (err) => {
        this.toast.show(err.error.message, 'danger');
      }
    });
  }

  edit() {
    const id = this.editForm.get('id')?.value;
    const title = this.editForm.get('title')?.value;
    const description = this.editForm.get('description')?.value;
    const category = this.editForm.get('category')?.value;
    this.feedbacksService.edit(id, title, description, category).subscribe({
      next:() => {
        this.router.navigate(['/pages/feedbacks/show', id]).then(success => {
          if (!success) {
            this.toast.show("Redirect error", 'danger');
          } else {
            this.toast.show('Feedback successfully updated!', 'success');
          }
        })
      },
      error: (err) => {
        this.toast.show(err.error.message, 'danger');
      }
    });
  }

  feebacks() {
    this.router.navigate(['/pages/feedbacks']).then();
  }


}
