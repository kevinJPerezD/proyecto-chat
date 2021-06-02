import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from "./components/chat/chat.component";
import { AboutComponent } from "./components/about/about.component";


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chat/:name/:code', component: ChatComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''}
    // {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);