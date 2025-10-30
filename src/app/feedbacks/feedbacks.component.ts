import {Component, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {FeedbacksService} from '../services/feedbacks.service';
import {NgForOf, NgIf} from '@angular/common';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-feedbacks',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    ToastComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent implements OnInit {

  @ViewChild('toast') toast!: ToastComponent;

  protected readonly Math = Math;
  dataSource: any = [];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  filterForm: FormGroup;

  constructor(
    private feedbacksService: FeedbacksService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.filterForm = this.formBuilder.group({
      title: [''],
      category: [''],
      description: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(page: number = this.pageIndex, size: number = this.pageSize) : void {
    const filters = this.filterForm.value;
    this.feedbacksService.getFeedbacks(page, size, filters).subscribe({
      next: (results): void => {
        this.dataSource = results.content;
        this.totalElements = results.totalElements;
        this.pageSize = results.size;
        this.pageIndex = results.number;
      },
      error: (err): void => {
        console.error('Falha ao recuperar feedbacks!', err)
      }
    });
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.getFeedbacks(0, this.pageSize);
  }

  onPageChange(param: { pageIndex: number; pageSize: number }) {
    const index = Number.isFinite(param.pageIndex) ? param.pageIndex! : 0;
    const size = Number.isFinite(param.pageSize) ? param.pageSize! : this.pageSize ?? 10;
    this.pageIndex = index;
    this.pageSize = size;
    this.getFeedbacks(index, param.pageSize);
  }

  show(id: number) {
    console.log("show", id);
    this.router.navigate(['/pages/feedbacks/show', id]).then(success => {
      if (!success) {
        this.toast.show("Redirect error", 'danger');
      }
    });
  }

  edit(id: number) {
    console.log("edit", id);
  }

  create() {
    this.router.navigate(['/pages/feedbacks/create']).then();
  }
}
