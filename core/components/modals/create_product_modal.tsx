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
import useCreateProductMutation from '@/core/hooks/vendor/useCreateProductMutation';
import {
  CreateProductDto,
  CreateProductDtoCategoryEnum,
  ProductMediaDto,
  ProductMediaDtoMediaTypeEnum,
  VendorProductInfoCategoryEnum,
} from '@/core/sdk/vendor';

interface CreateProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateProductModal = ({ isOpen, closeModal }: CreateProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: uploadFile } = useUploadFileMutation();
  const [newMediaFiles, setNewMediaFiles] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const createProductMutation = useCreateProductMutation();

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
      isNegotiable: true,
      inStock: true,
    },
  });

  // Reset form and clean up when modal opens/closes
  useEffect(() => {
    // Reset form when modal opens
    form.reset();
    setNewMediaFiles([]);
    // Clean up preview URLs
    setPreviewUrls((prev) => {
      prev.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      return [];
    });
  }, [isOpen]);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const removeNewFile = (fileUrl: string) => {
    // Find the index of the file to remove
    const index = newMediaFiles.indexOf(fileUrl);
    if (index !== -1 && index < previewUrls.length) {
      // Clean up preview URL if it's a blob URL
      const previewUrl = previewUrls[index];
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      // Remove from both arrays
      setNewMediaFiles((prev) => prev.filter((url) => url !== fileUrl));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
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
      // Validate that at least 1 image exists
      const newImageCount = newMediaFiles.filter((url) => {
        const isVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
        const isPdf = url.match(/\.(pdf)$/i) || url.includes('pdf');
        return !isVideo && !isPdf;
      }).length;

      if (newImageCount === 0) {
        showNotification({
          title: 'Validation Error',
          message: 'Product must have at least 1 image',
          color: 'red',
          autoClose: 5000,
        });
        return;
      }

      setIsLoading(true);

      // Map new media URLs to ProductMediaDto with type detection
      const media: ProductMediaDto[] = newMediaFiles.map((url) => {
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

      const payload: CreateProductDto = {
        name: values.name,
        price: values.price,
        inStock: values.inStock,
        media,
        description: values.description,
        isNegotiable: values.isNegotiable,
        discountPrice: values.discountPrice,
        category: values.category as CreateProductDtoCategoryEnum,
      };

      await createProductMutation.mutate({
        values: payload,
        closeModal: () => closeModal(),
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      // eslint-disable-next-line no-console
      console.log('[ERROR-CREATE-PRODUCT-MODAL] :: ', error);
    }
  };

  const currentMediaCount = newMediaFiles.length;
  const remainingSlots = 3 - currentMediaCount;

  // Check if there's a video in new files
  const hasVideo = newMediaFiles.some((url) => {
    return url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
  });

  // Calculate total image count (excluding videos and PDFs)
  const imageCount = newMediaFiles.filter((url) => {
    const isVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('video');
    const isPdf = url.match(/\.(pdf)$/i) || url.includes('pdf');
    return !isVideo && !isPdf;
  }).length;

  const hasAtLeastOneImage = imageCount > 0;

  return (
    <Modal
      size="xl"
      centered
      opened={isOpen}
      title="Create Product"
      onClose={() => {
        if (isLoading) {
          return;
        }
        closeModal();
      }}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
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
              {currentMediaCount}/3 slots used
            </Text>
          </Group>

          {newMediaFiles.length > 0 && (
            <Flex gap="md" style={{ overflowX: 'auto' }}>
              {newMediaFiles.map((fileUrl, index) => {
                const previewUrl = previewUrls[index] || fileUrl;
                const isImage = previewUrl.match(/\.(jpg|jpeg)$/i) || previewUrl.includes('image');
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

                    <Box h={10} />
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
                  previewUrls.forEach((url) => {
                    if (url.startsWith('blob:')) {
                      URL.revokeObjectURL(url);
                    }
                  });
                  setPreviewUrls([]);
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
                const allowedVideos = hasVideo ? [] : validVideoFiles.slice(0, 1);

                // Calculate remaining slots after videos
                const videoCount = allowedVideos.length;
                const availableSlotsForImages = remainingSlots - videoCount;

                // Limit images to available slots
                const allowedImages = imageFiles.slice(0, availableSlotsForImages);

                // Combine allowed files
                const limitedFiles = [...allowedImages, ...allowedVideos];

                // Clean up ALL existing preview URLs (replace mode)
                previewUrls.forEach((url) => {
                  if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                  }
                });

                // Compress images, upload files, and get URLs
                const uploadedUrls: string[] = [];
                const newPreviewUrls: string[] = [];

                for (const file of limitedFiles) {
                  let fileToUpload = file;
                  let previewUrl = '';

                  if (file.type.startsWith('image/')) {
                    // Compress image to ~50KB
                    fileToUpload = await compressImage(file, 50);
                    // Create preview URL for compressed image
                    previewUrl = URL.createObjectURL(fileToUpload);
                  } else if (file.type.startsWith('video/')) {
                    // Create preview placeholder for video (can't preview video files directly)
                    previewUrl = '';
                  }

                  // Upload file and get URL
                  try {
                    const uploadResult = await uploadFile(fileToUpload);
                    uploadedUrls.push(uploadResult.url);
                    // Update preview URL with uploaded URL
                    if (file.type.startsWith('image/')) {
                      // Revoke blob URL and use uploaded URL
                      if (previewUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(previewUrl);
                      }
                      newPreviewUrls.push(uploadResult.url);
                    } else {
                      // For videos, use uploaded URL directly
                      newPreviewUrls.push(uploadResult.url);
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
              error={newMediaFiles.length > 3 ? 'You exceeded the limit of 3 files' : null}
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
              {isLoading ? <Loader /> : 'Create Product'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateProductModal;
