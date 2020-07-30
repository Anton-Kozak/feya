import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../_services/data.service';
@Component({
  selector: 'ns-tips-detailed',
  templateUrl: './tips-detailed.component.html',
  styleUrls: ['./tips-detailed.component.scss']
})
export class TipsDetailedComponent implements OnInit {

  detailedTips: string[] = [];
  currentSection: string = '';
  constructor(private data: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data.tips.subscribe(tips => {
      this.detailedTips = tips;
    })
    this.route.params.subscribe(params => {
      this.currentSection = params['section'];
      console.log(this.currentSection);
      this.data.getTips(this.currentSection);
      console.log(this.detailedTips);
    });
  }

}
