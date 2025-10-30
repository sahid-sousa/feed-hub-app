import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {NgClass} from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements AfterViewInit{
  @ViewChild('liveToast', { static: true }) toastEl!: ElementRef;
  message: string = '';
  toastClass = 'text-bg-info';
  private toastInstance: any;

  ngAfterViewInit(): void {
    this.toastInstance = new bootstrap.Toast(this.toastEl.nativeElement, {
      duration: 3000,
      autohide: true
    });
  }

  show(message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') : void {
    this.message = message;
    switch (type) {
      case 'success':
        this.toastClass = 'text-bg-success';
        break;
      case 'warning':
        this.toastClass = 'text-bg-warning';
        break;
      case 'danger':
        this.toastClass = 'text-bg-danger';
        break;
      default:
        this.toastClass = 'text-bg-info';
    }
    this.toastInstance.show();
  }

  hide() {
    this.toastInstance.hide();
  }

}
