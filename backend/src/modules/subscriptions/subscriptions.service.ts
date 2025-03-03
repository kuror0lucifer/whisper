import { BadRequestException, Injectable } from "@nestjs/common";
import { Subscriptions } from "./subscriptions";
import { User } from "../users/user";

@Injectable()
export class SubscriptionsService {
  public constructor() {}

  public async subscribe(user_id: number, subscription_id: number) {
    const user = await Subscriptions.findOne({
      where: { user_id, subscription_id },
    });

    if (user) {
      throw new BadRequestException(
        "You are already subscribed to this person",
      );
    }

    if (user_id === subscription_id) {
      throw new BadRequestException("You can not subscribe to you");
    }

    await Subscriptions.create({
      subscription_id,
      user_id,
    });

    return {
      success: true,
      data: {
        user_id,
        subscription_id,
      },
    };
  }

  public async getSubscribes(user_id: number) {
    const subscriptions = await Subscriptions.findAll({ where: { user_id } });

    const subscriptionsIds = subscriptions.map((subscritpion) =>
      Number(subscritpion.subscription_id),
    );

    return {
      success: true,
      data: {
        subscriptionsIds,
      },
    };
  }

  public async getSubscriptionInfo(subscription_id: number) {
    const user = await User.findOne({ where: { id: subscription_id } });

    if (!user) {
      throw new BadRequestException("User was not found");
    }

    const { name, description, avatar } = user;

    return {
      success: true,
      data: {
        user: {
          name,
          description,
          avatar,
        },
      },
    };
  }
}
