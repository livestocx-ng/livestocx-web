import { IconCopy } from '@tabler/icons-react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Flex, Image, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { formatProductSlug } from '@/core/middlewares/slug-formatter';
import { ProductInfo } from '@/core/sdk/marketplace';

const ShareProductModal = ({
  isOpen,
  closeModal,
  productInfo,
}: {
  isOpen: boolean;
  closeModal: () => void;
  productInfo: ProductInfo;
}) => {
  return (
    <Modal
      size="lg"
      centered
      opened={isOpen}
      title="Share Product"
      onClose={() => {
        closeModal();
      }}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
    >
      <Image
        fit="cover"
        height={180}
        width="100%"
        src={productInfo.coverPhoto}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
        }}
      />
      <Flex mx="auto" justify="center" gap={30} mt={20}>
        <WhatsappShareButton
          title={`Check out my ${productInfo.name} on Livestocx: `}
          url={'https://livestocx.com'.concat(
            `/marketplace/products/${formatProductSlug(productInfo!)}`
          )}
        >
          <WhatsappIcon size={30} round />
        </WhatsappShareButton>
        <FacebookShareButton
          title={`Check out my ${productInfo.name} on Livestocx: `}
          url={'https://livestocx.com'.concat(
            `/marketplace/products/${formatProductSlug(productInfo!)}`
          )}
        >
          <FacebookIcon size={30} round />
        </FacebookShareButton>
        <TwitterShareButton
          title={`Check out my ${productInfo.name} on Livestocx: `}
          url={'https://livestocx.com'.concat(
            `/marketplace/products/${formatProductSlug(productInfo!)}`
          )}
        >
          <TwitterIcon size={30} round />
        </TwitterShareButton>
        <IconCopy
          color="black"
          onClick={async () => {
            const text = 'https://livestocx.com'.concat(
              `/marketplace/products/${productInfo.productId.toLowerCase()}${productInfo.name.toLowerCase()}`
            );

            try {
              await navigator.clipboard.writeText(text!);

              showNotification({
                title: 'Message',
                message: 'Copied to clipboard.',
              });
            } catch (err) {
              console.error('Fallback: Oops, unable to copy', err);
            }
          }}
        />
      </Flex>
    </Modal>
  );
};

export default ShareProductModal;
