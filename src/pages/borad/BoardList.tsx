import { useEffect } from 'react';

import { getBoardList } from '@/api/board';
import { Box, Button, Card, CardBody, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';

const BoardList = () => {
  useEffect(() => {
    getBoardList()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        // 错误处理逻辑
        console.error('获取数据失败:', error);
      });
  }, []);

  return (
    <Box paddingX="16px" width="100%">
      <Heading size="lg" paddingY="16px">
        白板
      </Heading>
      <SimpleGrid columns={4} spacing={8}>
        <Card maxW="sm">
          <CardBody as={Button}>
            <Stack align="center">
              <IconPlus />
              <Text>创建白板</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">Living room Sofa</Heading>
              <Text>创建于：17小时前</Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};
export default BoardList;
