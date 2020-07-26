import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Fakturobot2SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Fakturobot2SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class Fakturobot2HomeModule {}
