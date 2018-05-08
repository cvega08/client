import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
  providers: [CrudService]
})
export class HotelsComponent implements OnInit {
  data: any[];
  name: String = '';
  stars: boolean[]= [false,false,false,false,false];
  typeMoney: String = 'ARS';
  all: Boolean = true;
  stars_values: Number[]=[];
  both_values: boolean =false;
  save_value: String ='';
  customInnerWidth: Number = window.innerWidth;
  constructor(public _crud: CrudService) { }

  ngOnInit() {
     this.searchHotels('');
  }

  collapseCard(target: Element){
    if(target.parentElement.classList.contains('side') && (this.customInnerWidth>600)) return
    target.parentElement.classList.toggle('card_collapsed');
  }

  resize_card() {
    this.customInnerWidth  = window.innerWidth; 
  }

  searchHotels(term: any) {
    let search_text = this.stars_values.toString();
    if(search_text === ''){
      search_text = '5,4,3,2,1'
    }
    search_text = `?stars=${search_text}`;
    if(term.name){
      this.save_value = term.name;
      search_text = `${search_text}&name=${term.name}`
      this.both_values = true;
    }else if(this.both_values) {
      search_text = `${search_text}&name=${this.save_value}`
    }

    if(this.name === '') this.both_values = false;
    
    this._crud.search(search_text)
        .subscribe(( res: any) => {
          this.data = res;
        });
  }
 
  checkValue(value){
    const value_two= parseInt(value)
    return !!this.stars_values.find(e => e===value_two)
  }


  async valueStart(event: any){
    event.checked = false;
    const value = Number(event.value)
    if(value === 6){
      this.stars_values = [];
      this.all = true;
      event.checked = true;
    }
    else {
      this.stars_values.find(e => e === value) ? this.stars_values = this.stars_values.filter(e => e !== value) : this.stars_values.push(value);
    }
  
    if(this.stars_values.length === 5 || this.stars_values.length===0){
      this.stars_values = [];
      this.all = true;
    }else {
      this.all = false;
    }

    this.searchHotels('');
    
  }

  validInput(value){
     if(!value && this.save_value){
       this.save_value='';
       this.searchHotels('');
      }
  }

  
}