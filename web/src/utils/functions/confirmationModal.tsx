import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type Params = {
  title: string;
  message: string;
};

export const confirmationModal = ({ title, message }: Params) => {
  return new Promise((resolve) => {
    modals.openConfirmModal({
      title,
      children: <Text size="sm">{message}</Text>,
      onCancel: () => {
        resolve(false);
      },
      onConfirm: () => {
        resolve(true);
      },
    });
  });
};
