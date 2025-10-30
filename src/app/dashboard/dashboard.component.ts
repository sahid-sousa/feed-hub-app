import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import { HighchartsChartModule } from "highcharts-angular";
import Highcharts from 'highcharts';
import {RouterLink} from '@angular/router';

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
export class DashboardComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsLine: Highcharts.Options = {
    title: { text: 'Meu Gráfico' },
    series: [{ type: 'line', data: [1, 2, 3, 4, 5] }]
  };

  chartOptionsArea: Highcharts.Options = {
    title: { text: 'Meu Gráfico' },
    series: [{ type: 'area', data: [1, 2, 3, 4, 5] }]
  };

  chartOptionsColumn: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Vendas por produto (Barras)' },
    xAxis: {
      categories: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
      title: { text: 'Produtos' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Unidades vendidas' }
    },
    series: [
      { name: 'Janeiro', type: 'column', data: [49, 71, 106, 129] },
      { name: 'Fevereiro', type: 'column', data: [83, 78, 98, 93] }
    ]
  }

}
