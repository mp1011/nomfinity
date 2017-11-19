import {Component, Input} from '@angular/core';

@Component({
    selector: 'Header',
    template: ` 
   
    <page_banner>
        <img src='/assets/banner.png' id='banner' alt='Nomfinity Cooking'/>    
    </page_banner>
    <search></search>
    
    `
})

export class HeaderComponent
{
}