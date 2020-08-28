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
    { section: "Ванная комната", navigation: 'bathroom', imageSrc: "res://bathroom" },
    { section: "Уход за посудой", navigation: 'dishes', imageSrc: "res://dishes" },
    { section: "Хранение продуктов", navigation: 'foodstorage', imageSrc: "res://foodstorage" },
    { section: "Выведение пятен", navigation: 'stains', imageSrc: "res://stains" },
    { section: "Экологическая жизнь", navigation: 'ecolife', imageSrc: "res://ecolife" },

  ];


  constructor(private router: Router) { }

  ngOnInit(): void {
    //console.log(this.locations)
  }

  onTap(id: string) {
    this.router.navigate(["/tips/tips-detailed", id])
  }

}
