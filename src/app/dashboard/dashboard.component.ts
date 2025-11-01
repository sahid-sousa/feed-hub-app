import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import { HighchartsChartModule } from "highcharts-angular";
import Highcharts from 'highcharts';
import {RouterLink} from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {DashboardResponse, getMesPorNumero} from '../services/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    FooterComponent,
    HighchartsChartModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dashboardResponse: DashboardResponse | undefined;

  feedbackMonthCounts: number[] = [];
  commentMonthCounts: number[] = [];
  chartOptionsColumnCategories: string[] = [];
  chartOptionsColumnSeries: Highcharts.SeriesColumnOptions[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptionsLine: Highcharts.Options = {
    title: { text: 'Feedbacks' },
    series: [{ type: 'line', data: [] }]
  };

  chartOptionsArea: Highcharts.Options = {
    title: { text: 'Feedbacks' },
    series: [{ type: 'area', data: [] }]
  };

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.dashboardService.getStatistics().subscribe({
      next: (results): void => this.getData(results),
      error: (err): void => console.error('Erro ao recuperar estatísticas:', err)
    });
  }

  getData(results: DashboardResponse | undefined): void {
    this.dashboardResponse = results;

    this.feedbackMonthCounts = [];
    this.commentMonthCounts = [];
    this.chartOptionsColumnCategories = [];
    this.chartOptionsColumnSeries = [];

    if (this.dashboardResponse?.feedbackMonthCounts) {
      this.feedbackMonthCounts = this.dashboardResponse.feedbackMonthCounts.map(f => f.count);
    }

    console.log(this.feedbackMonthCounts);

    if (this.dashboardResponse?.commentMonthCounts) {
      this.commentMonthCounts = this.dashboardResponse.commentMonthCounts.map(c => c.count);
    }

    this.chartOptionsArea = {
      title: { text: 'Feedbacks' },
      series: [{ type: 'area', data: [...this.feedbackMonthCounts] }]
    };

    this.chartOptionsLine = {
      title: { text: 'Comments' },
      series: [{ type: 'line', data: [...this.feedbackMonthCounts] }]
    };


    this.updateFlag = true;
  }
}
