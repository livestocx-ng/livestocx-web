import { useMutation } from '@tanstack/react-query';
import { nprogress } from '@mantine/nprogress';
import { uploadApi } from '@/core/api/sdk';
import { FileUploadResult } from '@/core/sdk/account';

export default function useUploadFileMutation() {
  return useMutation({
    mutationFn: async (file: File): Promise<FileUploadResult> => {
      nprogress.start();

      const response = await uploadApi.imageUploadControllerUploadFile(file.name, file);

      return response.data;
    },
    onError: () => {
      nprogress.reset();
    },
    onSuccess(_value: FileUploadResult) {
      nprogress.reset();

      return _value;
    },
  });
}
