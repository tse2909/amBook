import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { AccountBalance } from './accountBalance';

import { Feed } from './feed';
import { Todo } from './todo';

import { FeedService } from './feed/feed.service';

import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { AccountBalanceService } from './accountBalance/accountBalance.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    Feed,
    Todo,
    Dashboard,
    AccountBalance
  ],
  providers: [
    FeedService,
    PieChartService,
    TodoService,
    TrafficChartService,
    AccountBalanceService

  ]
})
export class DashboardModule {}
