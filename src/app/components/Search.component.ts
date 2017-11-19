import {Component} from '@angular/core';


@Component(
    {
        selector: 'search',
        template: `        
        <input type='text' [(ngModel)]="Text"  field="Search" fieldtype="search" emptyformat="$..." (change)="onSearchChanged($event)" (keyup)="onSearchChanging($event)" />
        `
    }
)
export class SearchComponent 
{
    public Text:string;

}