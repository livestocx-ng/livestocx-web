import {
  useMutation,
} from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { userListApi } from '@/core/api/sdk';
import { AddListItemDTO, ListItemInfo } from '@/core/sdk/account';
import { useAppContext } from '../../context';

export default function useLikeUnlikeProductMutation() {
  const { listItems, setListItems } = useAppContext();

  return useMutation({
    mutationFn: async (values: {
      name: string;
      payload: AddListItemDTO;
    }): Promise<{ data: ListItemInfo; status: string; name: string }> => {
      nprogress.start();

      const listItem = listItems.find((item) => item.itemId === values.payload.itemId);

      if (listItems.some((item) => item.itemId === values.payload.itemId)) {
        await userListApi.listItemControllerRemoveItemFromList(Number(listItem?.id));

        setListItems(listItems.filter((item) => item.itemId !== values.payload.itemId));

        return { data: listItem!, status: 'REMOVED', name: values.name };
      }

      const { data } = await userListApi.listItemControllerAddItemToList({
        ...values.payload,
      });

      return { data, status: 'LIKED', name: values.name };
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(payload: { data: ListItemInfo; status: string; name: string }) {
      nprogress.reset();

      if (payload.status === 'REMOVED') {
        return showNotification({
          color: 'green',
          title: 'Message',
          message: `You unliked ${payload.name}`,
        });
      }

      setListItems([...listItems, payload.data!]);

      return showNotification({
        color: 'green',
        title: 'Message',
        message: `You liked ${payload.name}`,
      });
    },
  });
}
