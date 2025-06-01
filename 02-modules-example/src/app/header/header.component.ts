import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    standalone: true, // true by default Angular 19+, modern Angular uses standalone for the most part
    templateUrl: './header.component.html',
    styleUrl:'./header.component.css'
})
export class HeaderComponent { }