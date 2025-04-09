import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FanclubService } from '../../services/fanclub.service';
import { FanClub } from '../../interfaces/fanclub';
import { EventfanclubService } from '../../services/eventfanclub.service';
import { FanClubEvent } from '../../interfaces/fanClubEvent';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  private fanclubService = inject(FanclubService);
  private eventFanclubService = inject(EventfanclubService);

  ngOnInit(): void {
    this.fanclubService.getListFanClubs().subscribe((fanclubs) => {
      const groupedByYear = this.groupByFoundedYear(fanclubs);
      const years = Object.keys(groupedByYear);
      const counts = Object.values(groupedByYear);
      this.renderChart('bar', 'barchart', years, counts);
    });

    this.eventFanclubService.getFanClubEvents(0).subscribe((events) => {
      const groupedByMonth = this.groupByMonth(events);
      const months = Object.keys(groupedByMonth);
      const counts = Object.values(groupedByMonth);

      this.renderChart('doughnut', 'dochart', months, counts);
    });
  }

  groupByFoundedYear(fanclubs: FanClub[]): Record<string, number> {
    const result: Record<string, number> = {};
    for (const fanclub of fanclubs) {
      const year = fanclub.foundedYear;
      result[year] = (result[year] || 0) + 1;
    }
    return result;
  }

  groupByMonth(events: FanClubEvent[]): Record<string, number> {
    const result: Record<string, number> = {};
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    for (const event of events) {
      const monthIndex = new Date(event.date).getMonth(); // 0-11
      const monthName = monthNames[monthIndex];
      result[monthName] = (result[monthName] || 0) + 1;
    }

    return result;
  }

  renderChart(type: any, id: any, labels: string[], data: number[]) {
    const barcaColors = [
      '#003366',
      '#800000',
      '#004D98',
      '#A50044',
      '#3366CC',
      '#CC0033',
      '#6699FF',
      '#FF3366',
      '#3399CC',
      '#D72638',
      '#66CCFF',
      '#990033',
    ];
    const backgroundColor =
      type === 'doughnut'
        ? labels.map((_, i) => barcaColors[i % barcaColors.length])
        : ['#004D98', '#A50044'];

    const chartLabel =
      type === 'bar' ? 'Peñas fundadas por año' : 'Eventos por mes';

    new Chart(id, {
      type: type,
      data: {
        labels,
        datasets: [
          {
            label: chartLabel,
            data,
            backgroundColor,
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: type === 'doughnut',
            position: 'bottom',
            labels: {
              padding: 20,
            },
          },
        },
        scales:
          type === 'bar'
            ? {
                y: {
                  beginAtZero: true,
                },
              }
            : undefined,
      },
    });
  }
}
