import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-comments',
    imports: [
        FooterComponent
    ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  constructor(
    private router: Router
  ) {
  }

  feebacks() {
    this.router.navigate(['/pages/feedbacks']).then();
  }
}
