export type ListSubscriptionProps = {
  listIdOrListName: string;
  onChange?: () => void;
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
};
