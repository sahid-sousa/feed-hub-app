import {Component, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {FeedbacksService} from '../../services/feedbacks.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastComponent} from '../../shared/toast/toast.component';

@Component({
  selector: 'app-feedback-show',
  imports: [
    ToastComponent,
    FooterComponent
  ],
  templateUrl: './feedback-show.component.html',
  styleUrl: './feedback-show.component.scss'
})
export class FeedbackShowComponent implements OnInit {

  @ViewChild('toast') toast!: ToastComponent;

  feedback = {
    title: '',
    description: '',
    category: '',
    status: ''
  }

  constructor(
    private feedbacksService: FeedbacksService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.error('ID inválido na URL!');
      return;
    }
    this.feedbacksService.show(id).subscribe({
      next: (result) : void => {
        console.table(result)
        this.feedback.title = result.title;
        this.feedback.description = result.description;
        this.feedback.category = result.category;
        this.feedback.status = result.status;
      },
      error: (err): void => {
        console.error('Falha ao recuperar feedback!', err)
      }
    })
  }

  feebacks() {
    this.router.navigate(['/pages/feedbacks']).then();
  }

}
