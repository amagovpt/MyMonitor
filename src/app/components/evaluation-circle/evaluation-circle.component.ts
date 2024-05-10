import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-circle',
  templateUrl: './evaluation-circle.component.html',
  styleUrls: ['./evaluation-circle.component.scss']
})
export class EvaluationCircleComponent implements OnInit {

  colors: any[] = [{value: 0, color: "red"}, {value: 50, color: "yellow"}, {value: 75, color: "green"}]

  value: number = 90;
  max: number = 100;
  min: number = 0;

  characters: string = "";

  bg: string = "";
  toShow: string = "";

  constructor() { }

  ngOnInit(): void {
    const divider = this.max - this.min;
    this.value;

    this.bg = this.colors[1].color;
    for(let i = 0; i < this.colors.length; i++) {
      if(this.value > this.colors[i].value) {
        this.bg = this.colors[i].color;
      }
    }

    this.toShow = this.value + this.characters;

    const gaugeElement = document.querySelector(".gauge");
    this.setGaugeValue(gaugeElement, this.value/divider);
  }

  setGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
      return;
    }
  
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${
      value / 2
    }turn)`;
    gauge.querySelector(".gauge__fill").style.background = this.bg;
  }

}
