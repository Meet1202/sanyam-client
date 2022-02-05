import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaDetailPage } from './media-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MediaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaDetailPageRoutingModule {}
