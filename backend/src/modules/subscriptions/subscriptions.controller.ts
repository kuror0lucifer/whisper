import { Controller, Post, Body } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import {
  SubscribeDto,
  SubscriptionDto,
  SubscriptionsDto,
} from "src/dtos/subscriptions.dto";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post("/subscribe")
  public subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.subscriptionsService.subscribe(
      subscribeDto.userId,
      subscribeDto.subscriptionId,
    );
  }

  @Post("/get-subscriptions")
  public getSubscriptions(@Body() subscriptionsDto: SubscriptionsDto) {
    return this.subscriptionsService.getSubscribes(subscriptionsDto.userId);
  }

  @Post("/get-subscription-info")
  public getSubscritiponInfo(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionsService.getSubscriptionInfo(
      subscriptionDto.subscriptionId,
    );
  }
}
