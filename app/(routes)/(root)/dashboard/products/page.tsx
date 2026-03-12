'use client';

import { useEffect, useState } from 'react';
import { Button, Flex, Image, Paper, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import CreateProductModal from '@/core/components/modals/create_product_modal';
import ProductInfoModal from '@/core/components/modals/product_info_modal';
import ProductUploadSubscriptionModal from '@/core/components/modals/product_upload_subscription_modal';
import UpdateProductModal from '@/core/components/modals/update_product_modal';
import PageShell from '@/core/components/shell/page-shell';
import { useAppContext } from '@/core/context';
import useFetchPaymentMethodsQuery from '@/core/hooks/payments/useFetchPaymentMethodsQuery';
import useFetchProductUploadSubscriptionPlansQuery from '@/core/hooks/subscription/useFetchProductUploadSubscriptionPlansQuery';
import useFetchVendorProductsQuery from '@/core/hooks/vendor/useFetchVendorProductsQuery';
import { priceFormatter } from '@/core/middlewares';
import { VendorProductInfo } from '@/core/sdk/vendor';

export default function ProductsPage() {
  const [activePage] = useState(1);

  const { accountInfo, vendorProducts } = useAppContext();

  const [productInfo, setProductInfo] = useState<VendorProductInfo | null>(null);

  const { refetch } = useFetchVendorProductsQuery({
    currentPage: activePage,
  });

  const { refetch: refetchProductUploadSubscriptionPlans } =
    useFetchProductUploadSubscriptionPlansQuery();

  const { refetch: refetchPaymentMethods } = useFetchPaymentMethodsQuery();

  const [isProductInfoModalOpen, { open: openProductInfoModal, close: closeProductInfoModal }] =
    useDisclosure(false);

  const [
    isCreateProductModalOpen,
    { open: openCreateProductModal, close: closeCreateProductModal },
  ] = useDisclosure(false);

  const [
    isUpdateProductModalOpen,
    { open: openUpdateProductModal, close: closeUpdateProductModal },
  ] = useDisclosure(false);

  const [
    isProductUploadSubscriptionModalOpen,
    { open: openProductUploadSubscriptionModal, close: closeProductUploadSubscriptionModal },
  ] = useDisclosure(false);

  useEffect(() => {
    refetch();
    refetchPaymentMethods();
    refetchProductUploadSubscriptionPlans();
  }, [activePage]);

  return (
    <PageShell
      title="Products"
      caption="Manage and track all products in one place."
      right={
        <Button
          c="white"
          // color="green"
          className="bg-teal-600"
          onClick={() => {
            if (accountInfo?.isProductUploadSubscriptionActive === false) {
              // !OPEN PRODUCT UPLOAD SUBSCRIPTION MODAL
              return openProductUploadSubscriptionModal();
            } else if (accountInfo?.productUploadLimit === 0) {
              return showNotification({
                title: 'Message',
                color: 'orange',
                autoClose: 3000,
                message: 'You have reached your product upload limit.',
              });
            }
            return openCreateProductModal();
          }}
        >
          Add Product
        </Button>
      }
    >
      <ProductUploadSubscriptionModal
        isOpen={isProductUploadSubscriptionModalOpen}
        closeModal={closeProductUploadSubscriptionModal}
      />
      <CreateProductModal isOpen={isCreateProductModalOpen} closeModal={closeCreateProductModal} />
      <ProductInfoModal
        productInfo={productInfo}
        isOpen={isProductInfoModalOpen}
        closeModal={closeProductInfoModal}
      />
      <UpdateProductModal
        productInfo={productInfo}
        isOpen={isUpdateProductModalOpen}
        closeModal={closeUpdateProductModal}
      />
      <Paper p={{ base: 0, sm: 'md' }} style={{ overflowX: 'auto' }}>
        {/* stickyHeader - not working on mobile */}
        <Table verticalSpacing={20} stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Discount Price</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>In Stock</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {vendorProducts.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td w={80}>
                  <Image
                    src={product.coverPhoto}
                    alt={product.name}
                    width={80}
                    height={60}
                    radius="md"
                    fit="cover"
                  />
                </Table.Td>
                <Table.Td fw={600}>
                  <Text fz={14}>{product.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14}>{priceFormatter(product.price)}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14}>{priceFormatter(product.discountPrice)}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14}>{product.category}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz={14}>{product.inStock ? 'Yes' : 'No'}</Text>
                </Table.Td>
                <Table.Td>
                  <Flex gap={4}>
                    <Button
                      bg="black"
                      onClick={() => {
                        setProductInfo(product);
                        openProductInfoModal();
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      color="dark"
                      onClick={() => {
                        setProductInfo(product);
                        openUpdateProductModal();
                      }}
                    >
                      Update
                    </Button>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </PageShell>
  );
}
