import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../_services/databaseservice.service';
import { Achievement } from '../../_models/achievement';
@Component({
  selector: 'ns-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  achievements: Achievement[] = [];
  achievementsLoaded = false;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.database.getAchievements();
    this.database.achievementObservable.subscribe((data: Achievement[]) => {
      data.forEach((value, index, arr) => {
        this.achievements.push({ title: value[1], is_obtained: value[2] });
      })
      this.achievementsLoaded = true;
    })

  }


  getAchievements() {

  }


}
