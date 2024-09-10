import { Flex, Stack } from '@chakra-ui/react';

const Todo = () => {
  return (
    <Flex grow="1">
      <Stack w="240px" h="100%">
        <>侧边</>
      </Stack>
      <Flex flexGrow="1">主</Flex>
    </Flex>
  );
};
export default Todo;
