import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {FeedbacksService} from '../../services/feedbacks.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastComponent} from '../../shared/toast/toast.component';
import {NgForOf, NgIf} from '@angular/common';
import {CommentService} from '../../services/comment.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-feedback-show',
  imports: [
    ToastComponent,
    FooterComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './feedback-show.component.html',
  standalone: true,
  styleUrl: './feedback-show.component.scss'
})
export class FeedbackShowComponent implements OnInit, AfterViewInit {

  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('myModal') myModal!: ElementRef<HTMLElement>;
  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;

  private modal: any;

  protected readonly Math = Math;
  dataSource: any = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  addCommentForm: FormGroup;

  feedback = {
    id: '',
    title: '',
    description: '',
    category: '',
    status: ''
  }

  constructor(
    private feedbacksService: FeedbacksService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addCommentForm = new FormGroup({
      feedbackId: new FormControl(''),
      content: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.error('ID inválido na URL!');
      return;
    }
    this.getFeedback(id);
    this.getComments(id);
  }

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.myModal.nativeElement);
  }

  getFeedback(id: string): void {
    this.feedbacksService.show(id).subscribe({
      next: (result) : void => {
        this.feedback.id = result.id;
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

  getComments(feedbackId: string | undefined, page = 0, size = 10): void {
    this.commentService.getComments(feedbackId, page, size).subscribe({
      next: (results): void => {
        this.dataSource = results.content;
        this.totalElements = results.totalElements;
        this.pageSize = results.size;
        this.pageIndex = results.number;
      },
      error: (err): void => {
        console.error('Falha ao recuperar feedbacks!', err)
      }
    })
  }

  feebacks(): void  {
    this.router.navigate(['/pages/feedbacks']).then();
  }

  edit(id: string): void {
    this.router.navigate(['/pages/feedbacks/edit', id]).then(success => {
      this.closeModal();
      if (!success) {
        this.toast.show("Redirect error", 'danger');
      }
    });
  }

  onPageChange(param: {pageIndex: number; pageSize: number}): void {
    const index = Number.isFinite(param.pageIndex) ? param.pageIndex! : 0;
    const size = Number.isFinite(param.pageSize) ? param.pageSize! : this.pageSize ?? 10;
    this.pageIndex = index;
    this.pageSize = size;
    this.getComments(this.feedback.id, index, param.pageSize);
  }

  openModal(): void {
    this.modal.show(this.myModal.nativeElement, {});
  }

  closeModal(): void {
    this.modal.hide(this.myModal.nativeElement, {});
  }

  addComment(): void {
    const feedbackId = this.addCommentForm.get('feedbackId')?.value;
    const content = this.addCommentForm.get('content')?.value;
    this.commentService.create(this.feedback.id, content).subscribe({
      next: () => {
        this.toast.show('Comment successfully created!', 'success');
        this.addCommentForm.reset()
        this.getComments(this.feedback.id);
      },
      error: (err) => {
        this.toast.show(err.error.message, 'danger');
      }
    });
  }
}
