import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    data: any;

    constructor() { }

    setSomeData(data: any) {
        this.data = data;
    }

    getSomeData() {
        return this.data;
    }

    onToggleSidebar() {
        console.log("a");
        // const sidebar = document.querySelector(".sidebar");
        // if(sidebar) {
        //   sidebar.classList.toggle("active");
        // }
    }

    handleToggleSidebar() {
        //   this.sideBarComponent.onToggleSidebar();
    }
}