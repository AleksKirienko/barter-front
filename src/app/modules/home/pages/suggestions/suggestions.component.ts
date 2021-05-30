import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  public message = 'Пока откликов на ваши товары не поступало';
  public message2 = 'Вы можете добавить свои товары в раздере "Добавить товар"';

  constructor() {
  }

  ngOnInit(): void {
  }

}
