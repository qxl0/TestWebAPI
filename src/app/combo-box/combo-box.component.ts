import {Component, Input, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import { ComboBoxPipe } from './combo-box.pipe';

export enum KEY_CODE {
UP_ARROW = 38,
DOWN_ARROW = 40,
TAB_KEY = 9
}


@Component({
  selector: 'combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css'],
  providers: [ComboBoxPipe]
})
export class ComboBoxComponent implements OnInit {
  @Input() dataList: any[];
  @Input() columnName: string;
  dummyDataList: any[];
  showDropDown: boolean;
  counter:number;
  textToSort: string;

  onFocusEventAction():void {
    this.counter = -1;
  }
  onBlurEventAction(): void{
    this.showDropDown = false;
  }

  onKeyDownAction(event: KeyboardEvent):void {
    this.showDropDown = true;
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.counter = (this.counter === 0)?this.counter:--this.counter;
      this.checkHighlight(this.counter);
      this.textToSort = this.dataList[this.counter][this.columnName];
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.counter = (this.counter === this.dataList.length-1)?this.counter:++this.counter;
      this.checkHighlight(this.counter);
      this.textToSort = this.dataList[this.counter][this.columnName];
    }
  }

  checkHighlight(currentItem):boolean{
    if(this.counter === currentItem)
      return true;
    else
      return false;
  }

  constructor(private ComboBoxPipe: ComboBoxPipe) {
    this.reset();
  }

  ngOnInit(){
    this.reset();
  }

  toogleDropDown():void {
    this.showDropDown = !this.showDropDown;
  }

  reset(): void{
    this.showDropDown = false;
    this.dummyDataList = this.dataList;
  }

  textChange(value){
   this.dummyDataList = [];
   if(value.length >0){
    this.dummyDataList = this.ComboBoxPipe.transform(this.dataList,
                         this.columnName, value);
   if(this.dummyDataList){
     this.showDropDown = true;}
   }
   else {
     this.reset();
   }
  }

  updateTextBox(valueSelected){
     this.textToSort = valueSelected;
     this.showDropDown = false;
  }
}
