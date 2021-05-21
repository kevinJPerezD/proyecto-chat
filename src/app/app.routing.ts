import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from "./components/chat/chat.component";


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chat', component: ChatComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);