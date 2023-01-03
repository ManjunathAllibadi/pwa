import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate, UnrecoverableStateEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { UpdateDialogComponent } from './shared/update-dialog/update-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa';
  isOnLine: boolean = false;

  constructor(private swUpdate: SwUpdate, public dailog: MatDialog) { }

  ngOnInit(): void {
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    this.updateOnlineStatus();


    if (!this.swUpdate.isEnabled) {
      console.log("service worker is not enabled");
      return;
    } else {
      console.log("service worker is enabled");
      this.handleUpdate();

    }

  }

  updateOnlineStatus() {
    this.isOnLine = window.navigator.onLine;

  }

  handleUpdate() {
    interval(5000).subscribe(async () => {
      const shouldUpdate = await this.swUpdate.checkForUpdate();
      const shouldactivateUpdate = await this.swUpdate.activateUpdate();

      console.log("====== shouldUpdate =====", shouldUpdate);
      console.log("====== shouldactivateUpdate =====", shouldactivateUpdate);


      if (shouldUpdate == true && shouldactivateUpdate == true) {
        console.log("====== updates are available =====");

        const dialogRef = this.dailog.open(UpdateDialogComponent, {});
        dialogRef.afterClosed().subscribe(() => {

        });
      }
    });


    this.swUpdate.unrecoverable.subscribe((event: UnrecoverableStateEvent) => {
      console.log("======= Error reason =====", event.reason);

    });


  }

}
