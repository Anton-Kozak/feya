import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-tips-list',
  templateUrl: './tips-list.component.html',
  styleUrls: ['./tips-list.component.scss']
})
export class TipsListComponent implements OnInit {

  locations: { section: string, navigation: string, imageSrc: string }[] = [
    { section: "Кухня", navigation: 'kitchen', imageSrc: "res://kitchen" },
    { section: "Спальная комната", navigation: 'bedroom', imageSrc: "res://bedroom" },
    { section: "Главная комната", navigation: 'main', imageSrc: "https://placem.at/places?random=3&w=500&txt=0" },
    { section: "Детская", navigation: 'kid', imageSrc: "https://placem.at/places?random=4&w=500&txt=0" },
    { section: "Aberystwyth", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=5&w=500&txt=0" },
    // { section: "Macclesfield", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=6&w=500&txt=0" },
    // { section: "Larnwick", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=77&w=500&txt=0" },
    // { section: "Snowbush", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=8&w=500&txt=0" },
    // { section: "Kelna", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=55&w=500&txt=0" },
    // { section: "Drumnacanvy", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=44&w=500&txt=0" },
    // { section: "Hartlepool", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=11&w=500&txt=0" },
    // { section: "Timeston", navigation: 'bathroom', imageSrc: "https://placem.at/places?random=33&w=500&txt=0" }
  ];


  constructor(private router: Router) { }

  ngOnInit(): void {
    //console.log(this.locations)
  }

  onTap(id: string) {
    this.router.navigate(["/tips/tips-detailed", id])
  }

}
