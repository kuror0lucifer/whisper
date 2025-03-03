import { IsNotEmpty, IsNumber } from "class-validator";

export class SubscribeDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsNumber()
  @IsNotEmpty()
  public subscriptionId: number;
}

export class SubscriptionsDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}

export class SubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  public subscriptionId: number;
}
