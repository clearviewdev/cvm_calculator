import { policyNames } from '../constants/policyData';
import { Item } from '../types/Item';

export function calculateOutcome({
  PoliciesWithHRA,
  PoliciesWithoutHRA,
  totalHRA,
  totalVbcTransfers,
  totalReferralSales,
  callConversion,
  placementRate,
  dailySalesAverage,
  items,
  isInbound,
}: any) {
  const total_points = getTotalPoints(
    +callConversion,
    +placementRate,
    +dailySalesAverage,
    items,
    isInbound
  );
  const commissionPerApp = getPoint({
    value: total_points,
    name: policyNames.POINT_SCALE,
    items,
  });

  const nonHraCommission = getPoint({
    value: total_points,
    name: policyNames.POINT_SCALE,
    items,
    nonHra: true,
  });

  const HRA = getPoint({ name: policyNames.HRA, items });
  const VBC = getPoint({ name: policyNames.VBC, items });
  const ReferralBonus = getPoint({ name: policyNames.REFERRAL_BONUS, items });

  const monthlyCommission =
    Number(PoliciesWithHRA) * commissionPerApp +
    Number(PoliciesWithoutHRA) * nonHraCommission +
    Number(totalHRA) * HRA +
    Number(totalVbcTransfers) * VBC +
    Number(totalReferralSales) * ReferralBonus;

  return { monthlyCommission, total_points, commissionPerApp };
}

function getTotalPoints(
  callConversion: number,
  placementRate: number,
  dailySalesAverage: number,
  items: Item[],
  isInbound: boolean
) {
  let totalPoints = 0;

  totalPoints += getPoint({
    value: callConversion,
    name: isInbound
      ? policyNames.INBOUND_CALL_CONVERSION
      : policyNames.OUTBOUND_CALL_CONVERSION,
    items,
  });

  totalPoints += getPoint({
    value: placementRate,
    name: isInbound
      ? policyNames.INBOUND_PLACEMENT_RATE
      : policyNames.OUTBOUND_PLACEMENT_RATE,
    items,
  });
  totalPoints += getPoint({
    value: dailySalesAverage,
    name: isInbound
      ? policyNames.INBOUND_DAILY_SALES
      : policyNames.OUTBOUND_DAILY_SALES,
    items,
  });

  return totalPoints;
}

function getPoint({ value, name, items, nonHra }: any) {
  if (value === undefined || value === null) {
    const item = items.find((item: Item) => item.name === name);
    return +item?.points!;
  }
  const data = items
    .filter((item: Item) => item.name === name)
    .sort((a: Item, b: Item) => +b.threshold! - +a.threshold!);
  // Iterate through the criteria
  for (const criterion of data) {
    // Check if the value is within the current threshold
    if (value >= +criterion.threshold!) {
      if (name === policyNames.POINT_SCALE && nonHra) {
        return +criterion.nonHraPoints!;
      }
      return +criterion.points!; // Exit the loop since we found the first matching range
    }
  }
  return 0;
}
