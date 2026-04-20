'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { IconCurrencyDollar as DollarCircleIcon } from '@tabler/icons-react';
import {
  Box,
  Button,
  Checkbox,
  FileInput,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import useUploadFileMutation from '@/core/hooks/public/useUploadFileMutation';
import useUpdateProductMutation from '@/core/hooks/vendor/useUpdateProductMutation';
import {
  ProductMediaDto,
  ProductMediaDtoMediaTypeEnum,
  UpdateProductDto,
  UpdateProductDtoCategoryEnum,
  VendorProductInfo,
  VendorProductInfoCategoryEnum,
} from '@/core/sdk/vendor';

interface UpdateProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  productInfo: VendorProductInfo | null;
}

const UpdateProductModal = ({ isOpen, closeModal, productInfo }: UpdateProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: uploadFile } = useUploadFileMutation();
  const [newMediaFiles, setNewMediaFiles] = useState<string[]>([]);
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const updateProductMutation = useUpdateProductMutation();

  const categoryOptions = useMemo(
    () =>
      Object.values(VendorProductInfoCategoryEnum).map((value) => ({
        value,
        label: value
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()),
      })),
    []
  );

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      price: '',
      discountPrice: '',
      category: '',
      description: '',
      isNegotiable: false,
      inStock: false,
    },
  });

  useEffect(() => {
    if (productInfo) {
      form.setValues({
        name: productInfo.name ?? '',
        price: productInfo.price?.toString() ?? '',
        discountPrice: productInfo.discountPrice?.toString() ?? '',
        category: productInfo.category ?? '',
        description: productInfo.description ?? '',
        isNegotiable: productInfo.isNegotiable ?? false,
        inStock: productInfo.inStock ?? false,
      });
      setRemovedMediaIds([]);
      setNewMediaFiles([]);
      // Clean up preview URLs
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls({});
    } else {
      form.reset();
      setRemovedMediaIds([]);
      setNewMediaFiles([]);
      // Clean up preview URLs
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls({});
    }
  }, [productInfo]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const toggleRemovedMedia = (mediaId: string) => {
    setRemovedMediaIds((prev) =>
      prev.includes(mediaId) ? prev.filter((item) => item !== mediaId) : [...prev, mediaId]
    );
  };

  const removeNewFile = (fileUrl: string) => {
    // Clean up preview URL if it's a blob URL
    const previewUrl = Object.entries(previewUrls).find(([_, url]) => url === fileUrl)?.[1];
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrls((prev) => {
        const newUrls = { ...prev };
        const key = Object.keys(prev).find((k) => prev[k] === fileUrl);
        if (key) {
          delete newUrls[key];
        }
        return newUrls;
      });
    }
    // Remove file URL from array
    setNewMediaFiles((prev) => prev.filter((url) => url !== fileUrl));
  };

  const compressImage = (file: File, maxSizeKB: number = 50): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200; // Max width or height

          // Resize if too large
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress with quality adjustment
          let quality = 0.9;
          const compress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file); // Fallback to original if compression fails
                  return;
                }

                const sizeKB = blob.size / 1024;
                if (sizeKB > maxSizeKB && quality > 0.1) {
                  quality -= 0.1;
                  compress();
                } else {
                  const compressedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                }
              },
              file.type,
              quality
            );
          };

          compress();
        };
        img.onerror = () => resolve(file); // Fallback to original on error
      };
      reader.onerror = () => resolve(file); // Fallback to original on error
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!productInfo) {
        return;
      }

      // Validate that at least 1 image exists
      const existingImageCount = (productInfo.media || []).filter(
        (media) => media.mediaType === 'IMAGE' && !removedMediaIds.includes(media.id)
      ).length;

      const newImageCount = newMediaFiles.filter((url) => {
        const isVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
        const isPdf = url.match(/\.(pdf)$/i) || url.includes('pdf');
        return !isVideo && !isPdf;
      }).length;

      const totalImageCount = existingImageCount + newImageCount;

      if (totalImageCount === 0) {
        showNotification({
          title: 'Validation Error',
          message: 'Product must have at least 1 image',
          color: 'red',
          autoClose: 5000,
        });
        return;
      }

      setIsLoading(true);

      // Filter out removed media and map to ProductMediaDto
      const existingMedia: ProductMediaDto[] = (productInfo.media || [])
        .filter((media) => !removedMediaIds.includes(media.id))
        .map((media) => ({
          mediaUrl: media.mediaUrl,
          mediaType: media.mediaType as ProductMediaDtoMediaTypeEnum,
        }));

      // Map new media URLs to ProductMediaDto with type detection
      const newMedia: ProductMediaDto[] = newMediaFiles.map((url) => {
        // Determine media type from URL
        const isVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
        const isPdf = url.match(/\.(pdf)$/i) || url.includes('pdf');

        let mediaType: ProductMediaDtoMediaTypeEnum = ProductMediaDtoMediaTypeEnum.Image;
        if (isVideo) {
          mediaType = ProductMediaDtoMediaTypeEnum.Video;
        } else if (isPdf) {
          mediaType = ProductMediaDtoMediaTypeEnum.Pdf;
        }

        return {
          mediaUrl: url,
          mediaType,
        };
      });

      // Combine existing and new media
      const allMedia = [...existingMedia, ...newMedia];

      const payload: UpdateProductDto = {
        name: values.name,
        price: values.price,
        inStock: values.inStock,
        media: allMedia,
        description: values.description,
        isNegotiable: values.isNegotiable,
        discountPrice: values.discountPrice,
        category: values.category as UpdateProductDtoCategoryEnum,
        removedMediaIds: removedMediaIds.map((id) => parseInt(id, 10)),
      };

      // TODO: Hook into update product mutation
      // For now, just log the payload and close the modal
      // eslint-disable-next-line no-console
      console.log('Update product payload', payload);

      // closeModal();

      await updateProductMutation.mutate({
        values: payload,
        closeModal: () => closeModal(),
        productId: parseInt(productInfo.id, 10),
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      // eslint-disable-next-line no-console
      console.log('[ERROR-UPDATE-PRODUCT-MODAL] :: ', error);
    }
  };

  const currentMediaCount = (productInfo?.media?.length || 0) - removedMediaIds.length;
  const remainingSlots = 3 - currentMediaCount;

  // Check if there's an existing video (not removed)
  const hasExistingVideo =
    productInfo?.media?.some(
      (media) => media.mediaType === 'VIDEO' && !removedMediaIds.includes(media.id)
    ) || false;

  // Calculate total image count (excluding videos and PDFs)
  const existingImageCount = (productInfo?.media || []).filter(
    (media) => media.mediaType === 'IMAGE' && !removedMediaIds.includes(media.id)
  ).length;

  const newImageCount = newMediaFiles.filter((url) => {
    const isVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
    const isPdf = url.match(/\.(pdf)$/i) || url.includes('pdf');
    return !isVideo && !isPdf;
  }).length;

  const totalImageCount = existingImageCount + newImageCount;
  const hasAtLeastOneImage = totalImageCount > 0;

  return (
    <Modal
      size="xl"
      centered
      opened={isOpen}
      title="Update Product"
      onClose={() => {
        if (isLoading) {
          return;
        }
        closeModal();
      }}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      {!productInfo ? (
        <Text c="dimmed">Select a product to update.</Text>
      ) : (
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          {/* Media Management Section - Moved to top */}
          <Stack>
            <Group justify="space-between">
              <Text fw={600}>Product Media (Max 3)</Text>
              <Text size="xs" c="dimmed">
                {currentMediaCount + newMediaFiles.length}/3 slots used
              </Text>
            </Group>

            <Flex gap="md" style={{ overflowX: 'auto' }}>
              {productInfo.media
                .filter((media) => media.mediaType !== 'VIDEO')
                .map((media) => (
                  <Box key={media.id} pos="relative">
                    <Image
                      src={media.mediaUrl}
                      alt={media.mediaType}
                      radius="md"
                      w={{ base: 100, sm: 140 }}
                      h={{ base: 100, sm: 140 }}
                      fit="cover"
                      style={{
                        objectFit: 'cover',
                        opacity: removedMediaIds.includes(media.id) ? 0.5 : 1,
                      }}
                    />

                    <Box h={10} />
                    <Checkbox
                      label="Remove"
                      checked={removedMediaIds.includes(media.id)}
                      onChange={() => toggleRemovedMedia(media.id)}
                    />
                  </Box>
                ))}
            </Flex>

            <Flex gap="md" wrap="wrap">
              {productInfo.media
                .filter((media) => media.mediaType === 'VIDEO')
                .map((media) => (
                  <Box key={media.id} pos="relative">
                    <Image
                      w={140}
                      h={140}
                      radius="md"
                      fit="cover"
                      src={media.mediaUrl}
                      alt={media.mediaType}
                      style={{
                        objectFit: 'cover',
                        opacity: removedMediaIds.includes(media.id) ? 0.5 : 1,
                      }}
                    />

                    <Box h={10} />
                    <Checkbox
                      label="Remove"
                      checked={removedMediaIds.includes(media.id)}
                      onChange={() => toggleRemovedMedia(media.id)}
                    />
                  </Box>
                ))}

              {newMediaFiles.length > 0 && (
                <Flex gap="md" style={{ overflowX: 'auto' }}>
                  {newMediaFiles.map((fileUrl, index) => {
                    const previewUrl = Object.values(previewUrls)[index] || fileUrl;
                    const isImage =
                      previewUrl.match(/\.(jpg|jpeg)$/i) || previewUrl.includes('image');
                    const isVideo = previewUrl.match(/\.(mp4)$/i) || previewUrl.includes('video');

                    return (
                      <Box
                        key={fileUrl}
                        pos="relative"
                        style={{
                          flex: '1 1 calc(33.333% - 0.67rem)',
                          minWidth: '150px',
                          maxWidth: '100%',
                        }}
                      >
                        {isImage && previewUrl ? (
                          <Image
                            src={previewUrl}
                            alt="Uploaded media"
                            radius="md"
                            h={{ base: 100, sm: 140 }}
                            w={{ base: 100, sm: 140 }}
                            fit="cover"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <Box
                            h={{ base: 100, sm: 140 }}
                            w={{ base: 100, sm: 140 }}
                            style={{
                              border: '1px dashed #DEE2E6',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f8f9fa',
                            }}
                          >
                            <Text size="sm" c="dimmed" ta="center" px="xs">
                              {isVideo ? 'Video File' : 'File'}
                            </Text>
                          </Box>
                        )}

                        <Checkbox
                          label="Remove"
                          checked={false}
                          onChange={() => removeNewFile(fileUrl)}
                        />
                      </Box>
                    );
                  })}
                </Flex>
              )}
            </Flex>

            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Upload New Media
              </Text>
              <FileInput
                radius="md"
                size="md"
                fz={12}
                multiple
                accept="image/jpg, image/jpeg, video/mp4"
                placeholder={
                  remainingSlots > 0
                    ? `Upload up to ${remainingSlots} more files`
                    : 'Max limit reached'
                }
                disabled={remainingSlots <= 0}
                onChange={async (files) => {
                  if (!files) {
                    // Clean up all preview URLs
                    Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
                    setPreviewUrls({});
                    setNewMediaFiles([]);
                    return;
                  }

                  const fileArray = Array.isArray(files) ? files : [files];

                  // Separate images and videos
                  const imageFiles = fileArray.filter((file) => file.type.startsWith('image/'));
                  const videoFiles = fileArray.filter((file) => file.type.startsWith('video/'));

                  // Validate video file sizes (5MB limit)
                  const validVideoFiles = videoFiles.filter((file) => {
                    const sizeMB = file.size / (1024 * 1024);
                    if (sizeMB > 5) {
                      // eslint-disable-next-line no-console
                      console.warn(`Video ${file.name} exceeds 5MB limit (${sizeMB.toFixed(2)}MB)`);

                      showNotification({
                        title: 'Message',
                        autoClose: 5000,
                        message: `Video ${file.name} exceeds 5MB limit (${sizeMB.toFixed(2)}MB)`,
                        color: 'red',
                      });
                      return false;
                    }
                    return true;
                  });

                  // Limit videos: only 1 video if no existing video
                  const allowedVideos = hasExistingVideo ? [] : validVideoFiles.slice(0, 1);

                  // Calculate remaining slots after videos
                  const videoCount = allowedVideos.length;
                  const availableSlotsForImages = remainingSlots - videoCount;

                  // Limit images to available slots
                  const allowedImages = imageFiles.slice(0, availableSlotsForImages);

                  // Combine allowed files
                  const limitedFiles = [...allowedImages, ...allowedVideos];

                  // Clean up ALL existing preview URLs (replace mode)
                  Object.values(previewUrls).forEach((url) => {
                    if (url.startsWith('blob:')) {
                      URL.revokeObjectURL(url);
                    }
                  });

                  // Compress images, upload files, and get URLs
                  const uploadedUrls: string[] = [];
                  const newPreviewUrls: Record<string, string> = {};

                  for (const file of limitedFiles) {
                    let fileToUpload = file;

                    if (file.type.startsWith('image/')) {
                      // Compress image to ~50KB
                      fileToUpload = await compressImage(file, 50);
                      // Create preview URL for compressed image
                      newPreviewUrls[file.name] = URL.createObjectURL(fileToUpload);
                    } else if (file.type.startsWith('video/')) {
                      // Create preview placeholder for video (can't preview video files directly)
                      newPreviewUrls[file.name] = '';
                    }

                    // Upload file and get URL
                    try {
                      const uploadResult = await uploadFile(fileToUpload);
                      uploadedUrls.push(uploadResult.url);
                      // Update preview URL with uploaded URL
                      if (file.type.startsWith('image/')) {
                        // Revoke blob URL and use uploaded URL
                        if (newPreviewUrls[file.name]?.startsWith('blob:')) {
                          URL.revokeObjectURL(newPreviewUrls[file.name]);
                        }
                        newPreviewUrls[file.name] = uploadResult.url;
                      } else {
                        // For videos, use uploaded URL directly
                        newPreviewUrls[file.name] = uploadResult.url;
                      }
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.error('Failed to upload file:', error);
                      // Continue with other files even if one fails
                    }
                  }

                  // Replace all preview URLs and file URLs
                  setPreviewUrls(newPreviewUrls);
                  setNewMediaFiles(uploadedUrls);
                }}
                error={
                  newMediaFiles.length > remainingSlots ? 'You exceeded the limit of 3 files' : null
                }
              />
            </Stack>

            {/* <Divider /> */}

            <Group gap="md">
              <Switch
                size="sm"
                label="In Stock"
                {...form.getInputProps('inStock', { type: 'checkbox' })}
              />
              <Switch
                size="sm"
                label="Negotiable"
                {...form.getInputProps('isNegotiable', { type: 'checkbox' })}
              />
            </Group>

            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Product Name
              </Text>
              <TextInput
                size="md"
                radius="md"
                placeholder="Enter product name"
                {...form.getInputProps('name')}
              />
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  Price
                </Text>
                <NumberInput
                  min={0}
                  size="md"
                  radius="md"
                  hideControls
                  placeholder="0.00"
                  {...form.getInputProps('price')}
                  leftSection={<DollarCircleIcon size={16} />}
                />
              </Stack>
              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  Discount Price
                </Text>
                <NumberInput
                  min={0}
                  size="md"
                  radius="md"
                  hideControls
                  placeholder="0.00"
                  {...form.getInputProps('discountPrice')}
                  leftSection={<DollarCircleIcon size={16} />}
                />
              </Stack>
            </SimpleGrid>

            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Category
              </Text>
              <Select
                placeholder="Select category"
                radius="md"
                size="md"
                data={categoryOptions}
                {...form.getInputProps('category')}
              />
            </Stack>

            <Stack gap={4}>
              <Text size="sm" c="dimmed">
                Description
              </Text>
              <Textarea
                rows={8}
                size="md"
                radius="md"
                minRows={8}
                style={{ fontSize: '10px' }}
                {...form.getInputProps('description')}
                placeholder="Provide details about the product"
              />
            </Stack>

            <Group justify="flex-end" gap="md">
              {!hasAtLeastOneImage && (
                <Text size="sm" c="red" w="100%">
                  Product must have at least 1 image to submit
                </Text>
              )}
              <Button
                w="100%"
                type="submit"
                radius="md"
                loading={isLoading}
                disabled={isLoading || !hasAtLeastOneImage}
              >
                {isLoading ? <Loader /> : 'Save Changes'}
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
};

export default UpdateProductModal;
