import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoachRoutingModule } from './coach-routing.module';
import { CoachComponent } from './coach.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoachhomeComponent } from './coachhome/coachhome.component';
import { CoachprofileComponent } from './coachprofile/coachprofile.component';
import { CoachhomeService } from './coachhome/coachhome.service';


@NgModule({
    imports: [
        CommonModule,
        CoachRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [CoachComponent, CoachhomeComponent, CoachprofileComponent],
    providers:[CoachhomeService]
})

export class CoachModule { }
